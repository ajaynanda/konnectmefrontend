import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from 'src/app/postService/post.service';
import { UserService } from 'src/app/user/user.service';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { LeftbarComponent } from 'src/app/leftbar/leftbar.component';
import { PostbarComponent } from 'src/app/postbar/postbar.component';
import { RightbarsComponent } from '../rightbar/rightbar.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';

type ProfileTab = 'posts' | 'about' | 'media' | 'connections' | 'liked';
type MediaSection = 'photos' | 'saved';
type ConnectionSection = 'followers' | 'following' | 'friends';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LeftbarComponent, PostbarComponent, RightbarsComponent, TitleCasePipe, DatePipe, RouterLink]
})
export class ProfileComponent implements OnInit {
  profile: boolean = true
  collapsed = true
  userid: any;
  userPost: any[] = [];
  visiblePosts: any[] = [];
  likedPosts: any[] = [];
  savedPosts: any[] = [];
  savedPostIds: string[] = [];
  userData: any
  sidebar: boolean=true;
  activeTab: ProfileTab = 'posts';
  mediaSection: MediaSection = 'photos';
  connectionSection: ConnectionSection = 'followers';
  currentUserId = '';
  isOwnProfile = false;
  profileTabError = '';
  constructor(private userService: UserService, private postService: PostService, private route: ActivatedRoute, private cf: ChangeDetectorRef, private dialog: MatDialog) { }

  openEditProfile(): void {
    this.dialog.open(UpdateComponent, {
      width: 'min(560px, 94vw)',
      maxWidth: '94vw',
      maxHeight: '90vh',
      panelClass: 'profile-edit-panel',
      backdropClass: 'profile-edit-backdrop',
      data: { data: this.userData }
    });
  }

  ngOnInit(): void {
    // this.userService.getSideBar().subscribe((res)=>{
    //   console.log(res,"sidebars");
    //   this.sidebar=res
    // })
    const currentUser = JSON.parse(localStorage.getItem('KMuser') || '{}');
    this.currentUserId = String(currentUser.userid || currentUser._id || '');
    this.route.params.subscribe((res) => {
      this.userid = res['id']
      this.isOwnProfile = String(this.userid) === this.currentUserId;
      this.activeTab = 'posts';
      this.mediaSection = 'photos';
      this.visiblePosts = [];
      this.profileTabError = '';
      this.getPost();
      this.getUserData();
    })

    this.userService.userChanged.subscribe((data)=>{
      if(data!=null)
       this.userData=data
      this.cf.detectChanges()
    })
    if (this.currentUserId) {
      this.loadSavedPosts();
    }
  }

getPost(){
  this.postService.postbyuserid(this.userid).subscribe((res: any) => {
    this.userPost = (res.data || []).filter(
      (post: any) => String(post.userid) === String(this.userid)
    );
    if (this.activeTab === 'posts') {
      this.visiblePosts = this.userPost;
    }
    this.cf.detectChanges()
  }, (error) => {
    console.error(error);
    this.profileTabError = 'Unable to load posts.';
    this.cf.markForCheck();
  });
}
getUserData(){
  this.userService.userByID(this.userid).subscribe((res:any) => {
  this.userData = res.data
  this.cf.detectChanges()
  }, (error) => {
    console.error(error);
    this.profileTabError = 'Unable to load profile information.';
    this.cf.markForCheck();
  });
}

selectTab(tab: ProfileTab): void {
  this.activeTab = tab;
  this.profileTabError = '';
  if (tab === 'posts') {
    this.visiblePosts = this.userPost;
  } else if (tab === 'liked') {
    this.visiblePosts = [];
    this.loadLikedPosts();
  } else if (tab === 'media') {
    this.selectMediaSection(this.mediaSection);
  }
}

selectMediaSection(section: MediaSection): void {
  this.mediaSection = section;
  if (section === 'saved') {
    this.visiblePosts = [];
    this.loadSavedPosts();
    return;
  }
  this.visiblePosts = [];
}

selectConnectionSection(section: ConnectionSection): void {
  this.connectionSection = section;
}

loadLikedPosts(): void {
  this.postService.likedPosts(this.userid).subscribe({
    next: (res: any) => {
      this.likedPosts = res.data || [];
      if (this.activeTab === 'liked') {
        this.visiblePosts = this.likedPosts;
      }
      this.profileTabError = '';
      this.cf.markForCheck();
    },
    error: (error) => {
      console.error(error);
      this.profileTabError = 'Unable to load liked posts.';
      this.cf.markForCheck();
    }
  });
}

loadSavedPosts(): void {
  if (!this.currentUserId) {
    this.savedPosts = [];
    this.savedPostIds = [];
    return;
  }

  this.postService.savedPosts(this.currentUserId).subscribe({
    next: (res: any) => {
      this.savedPosts = res.data || [];
      this.savedPostIds = this.savedPosts.map((post: any) => String(post._id));
      if (this.activeTab === 'media' && this.mediaSection === 'saved') {
        this.visiblePosts = this.savedPosts;
        this.profileTabError = '';
      }
      this.cf.markForCheck();
    },
    error: (error) => {
      console.error(error);
      if (this.activeTab === 'media' && this.mediaSection === 'saved') {
        this.profileTabError = 'Unable to load saved posts.';
      }
      this.cf.markForCheck();
    }
  });
}

refreshCurrentTab(): void {
  if (this.activeTab === 'posts') {
    this.getPost();
  } else if (this.activeTab === 'liked') {
    this.loadLikedPosts();
  } else if (this.activeTab === 'media' && this.mediaSection === 'saved') {
    this.loadSavedPosts();
  } else if (this.activeTab === 'media') {
    this.getPost();
  }
}

updateSavedPostIds(ids: string[]): void {
  this.savedPostIds = ids;
  if (this.mediaSection === 'saved') {
    const availablePosts = [...this.savedPosts, ...this.visiblePosts, ...this.userPost, ...this.likedPosts];
    this.savedPosts = ids
      .map((id) => availablePosts.find((post: any) => String(post._id) === id))
      .filter((post): post is any => Boolean(post));
    if (this.activeTab === 'media') {
      this.visiblePosts = this.savedPosts;
    }
  }
  this.cf.markForCheck();
}

get profileMedia(): any[] {
  return this.userPost.filter((post: any) => Boolean(post.Image || post.url));
}

get connectionPeople(): any[] {
  const field = {
    followers: 'Followers',
    following: 'Followings',
    friends: 'Friends'
  }[this.connectionSection];
  return this.userData?.[field] || [];
}

personName(person: any): string {
  return person.Name || `${person.Firstname || ''} ${person.Lastname || ''}`.trim();
}

isVideoPost(post: any): boolean {
  return /\.(mp4|mkv|mov|webm)(?:$|[?#])/i.test(String(post.Image || post.url || ''));
}

mediaSource(post: any): string {
  return post.url || `../../assets/${post.Image}`;
}
}
