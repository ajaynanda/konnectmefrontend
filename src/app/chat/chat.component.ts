import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ChatService } from '../chat.service';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgLabelTemplateDirective, NgNotFoundTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { RouterLink } from '@angular/router';
interface User {
  Name: string;
  _id: string; // The ID of the chat user
  lasttext: string;
  isSeen: boolean;
  chatID: string; // The ID of the chat
  repID?: string; // The ID of the other user in the chat (optional)
  repName?: string; // Name of the other user in the chat (optional)
  repProfilePic?: string; // Profile picture of the other user in the chat (optional)
}

interface ChatCandidate {
  _id: string;
  Name: string;
  Profilepic?: string;
  hasConversation?: boolean;
}
@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
    imports: [FormsModule, NgSelectComponent, NgOptionTemplateDirective, NgLabelTemplateDirective, NgNotFoundTemplateDirective, DatePipe, RouterLink]
})


export class ChatComponent implements OnInit {
  @ViewChild('chatDialogTemplate') chatDialogTemplate!: TemplateRef<any>;
  users: User[] = [];
  searchTerm: string = '';
  // messages: {} = {};
  messagesArr:any[]=[];
  selectedUser: User | null = null;
  newMessage: string = '';
  filteredUsers: User[] = [];
  searchText: string = '';
  newSelectedUser: string | null = null;
  readonly user = JSON.parse(localStorage.getItem('KMuser') || '{}');
  newUsers: ChatCandidate[] = [];
  private availableChatCandidates: ChatCandidate[] = [];
  private existingChatCandidates: ChatCandidate[] = [];
  loadingNewUsers = false;
  newUsersError = '';
  constructor(private readonly chatService:ChatService,private readonly dialog:MatDialog) { }

  ngOnInit(): void {
    this.chatService.getNewMessage().subscribe((message:any) => {
      if(message){
        this.messagesArr.push(message);
      }
      console.log(this.messagesArr,"ar");
      
    });
    this.getUser()
    this.getUserbyid()
  }
  getUserbyid(){
    this.chatService.userByID(this.user._id).subscribe((result:any)=>{
      const conversations = result?.data?.chatList || [];
      this.users = conversations;
      this.filteredUsers = [...this.users]
      this.existingChatCandidates = conversations
        .filter((conversation: any) => conversation?.repID && conversation.repID !== this.user._id)
        .map((conversation: any) => ({
          _id: conversation.repID,
          Name: conversation.repName || conversation.Name,
          Profilepic: conversation.repProfilePic,
          hasConversation: true
        }));
      this.refreshNewChatCandidates();
    })
  }
  getUser(){
    this.loadingNewUsers = true;
    this.newUsersError = '';
    this.chatService.chatList(this.user._id).subscribe((res:any)=>{
      const users = Array.isArray(res?.data) ? res.data : [];
      this.availableChatCandidates = users
        .filter((candidate: any) => candidate?._id && candidate._id !== this.user._id)
        .map((candidate: any) => ({
          _id: candidate._id,
          Name: candidate.Name || `${candidate.Firstname || ''} ${candidate.Lastname || ''}`.trim(),
          Profilepic: candidate.Profilepic
        }));
      this.refreshNewChatCandidates();
      this.loadingNewUsers = false;
    }, (error) => {
      this.loadingNewUsers = false;
      this.newUsersError = 'Could not load people. Please try again.';
      console.error('Unable to load chat recipients', error);
    })
  }

  get availableNewUserCount(): number {
    return this.newUsers.filter((candidate) => !candidate.hasConversation).length;
  }

  private refreshNewChatCandidates(): void {
    const newCandidateIds = new Set(this.availableChatCandidates.map((candidate) => candidate._id));
    this.newUsers = [
      ...this.availableChatCandidates,
      ...this.existingChatCandidates.filter((candidate) => !newCandidateIds.has(candidate._id))
    ];
  }
  filterUsers(event:any): void {
    const query = (event.target.value || '').trim().toLowerCase()
    this.filteredUsers = this.users.filter((user:any) =>
      (user.repName || '').toLowerCase().includes(query)
    )
  }
  selectUser(user: User): void {
    this.selectedUser = user;
    console.log(this.selectedUser,"ug");
    
    // if (!this.messages[user.id]) {
    //   this.messages[user.id] = [];
    // }
    this.messagesArr=[]
    this.chatService.chatHistory(this.selectedUser.chatID).subscribe((res:any)=>{
      console.log(res,"reskjhg");
    
      if(res.data.chatData.length>0){
        this.messagesArr=res.data.chatData
        console.log(this.messagesArr,"aa");
        
      }
    })
  }
  startNewChat(): void {
    this.selectedUser = null;
    this.newSelectedUser = null;
    this.dialog.open(this.chatDialogTemplate, {
      width: 'min(520px, 94vw)',
      maxWidth: '94vw',
      panelClass: 'chat-new-dialog',
      backdropClass: 'chat-dialog-backdrop'
    });
  }

  closeNewChatDialog(): void {
    this.dialog.closeAll();
  }
  sendMessage(): void {
  console.log(this.selectedUser,"user");

    const recipientId = this.selectedUser?.repID;
    const messageText = this.newMessage.trim();
    if (messageText && this.selectedUser && recipientId) {
      // this.messages[this.selectedUser.id].push(this.newMessage);
      let message={
        userid:this.user._id,
        reciepientID:recipientId,
        msg:messageText,
        messagedBy:this.user,
        messageTime:new Date(),
        isSeen:false
      }
      const formdata=new FormData()
      formdata.append('userid', this.user._id);
      formdata.append('reciepientID', recipientId);
      formdata.append('msg', messageText);
      formdata.append('messagedBy',  JSON.stringify(this.user));
      formdata.append('messageTime', new Date().toISOString());
      formdata.append('isSeen', 'false'); 
      this.chatService.sendMessage(message);
      this.newMessage = '';
      this.chatService.sendMessages(this.selectedUser.chatID, formdata, this.user._id, recipientId).subscribe((res:any)=>{
        console.log(res,"res");
        
      })
    }
  }
  filternewuser() {
    // Filter the user list based on the search term
    this.filteredUsers = this.user.filter((user:any) =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  confirmSelection() {
    // Handle selection and close the dialog
    console.log(this.newSelectedUser);
    
    if (this.newSelectedUser) {
      console.log('Selected User:', this.newSelectedUser);
      this.chatService.addnewChat(this.user.userid,this.newSelectedUser).subscribe((res)=>{
        console.log(res);
        this.getUser()
        this.getUserbyid()
      })
      this.dialog.closeAll(); // Close the dialog
    }
  }
}
