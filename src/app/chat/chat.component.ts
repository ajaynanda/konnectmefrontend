import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ChatService } from '../chat.service';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
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
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})


export class ChatComponent implements OnInit {
  @ViewChild('chatDialogTemplate') chatDialogTemplate!: TemplateRef<any>;
  users: User[] = [];
  searchTerm: string = '';
  // messages: {} = {};
  messagesArr:any[]=[];
  selectedUser: User | any = null;
  newMessage: string = '';
  filteredUsers: User[] = [...this.users];
  searchText: string = '';
  newSelectedUser:String=''
  user = JSON.parse(localStorage.getItem('KMuser') || '{}');
  newUsers: any;
  constructor(private chatService:ChatService,private dialog:MatDialog) { }

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
      // this.filteredUsers=result.data.chatList 
      this.users=result.data.chatList
      console.log(this.users,"usg");
      
}) 
  }
  getUser(){
    this.chatService.chatList(this.user._id).subscribe((res:any)=>{
      console.log(res,"user chats");
      this.newUsers=res.data
    })
  }
  filterUsers(event:any): void {
    if(event.target.value==''){
      this.filteredUsers = this.users 
    }
    this.filteredUsers = this.users.filter((user:any) =>
      user.repName.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.users=this.filteredUsers
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
    // this.newMessage = '';
   this.dialog.open(this.chatDialogTemplate, {
    width: '50%'
  });
  }
  sendMessage(): void {
  console.log(this.selectedUser,"user");
  
    if (this.newMessage.trim() && this.selectedUser) {
      // this.messages[this.selectedUser.id].push(this.newMessage);
      let message={
        userid:this.user._id,
        reciepientID:this.selectedUser.repID,
        msg:this.newMessage,
        messagedBy:this.user,
        messageTime:new Date(),
        isSeen:false
      }
      const formdata=new FormData()
      formdata.append('userid', this.user._id);
      formdata.append('reciepientID', this.selectedUser.repID);
      formdata.append('msg', this.newMessage);
      formdata.append('messagedBy',  JSON.stringify(this.user));
      formdata.append('messageTime', new Date().toISOString());
      formdata.append('isSeen', 'false'); 
      this.chatService.sendMessage(message);
      this.newMessage = '';
      this.chatService.sendMessages(this.selectedUser.chatID,formdata).subscribe((res:any)=>{
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
