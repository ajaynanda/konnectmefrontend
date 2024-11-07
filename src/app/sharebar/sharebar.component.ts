import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../postService/post.service';

@Component({
  selector: 'app-sharebar',
  templateUrl: './sharebar.component.html',
  styleUrls: ['./sharebar.component.css']
})
export class SharebarComponent implements OnInit {
  imagePreviewSrc: string = ''
  isImageSelected: boolean = false;
  filename: any;
  videoPreview: any;
  isVideoSelected: boolean=false;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  
  submit(data: NgForm) {
    const id = JSON.parse(localStorage.getItem('KMuser') || '{}')._id
    const formdata = new FormData
    formdata.append('img', this.filename)
    formdata.append('desc', data.value.desc)
    console.log(formdata);
    this.postService.createpost(id, formdata).subscribe((res) => {
      console.log(res);
      data.reset()
      this.isImageSelected = false
      this.imagePreviewSrc = ''
      this.videoPreview=''
      this.isVideoSelected=false

    })
  }
  onFileChange(event: any) {
    let selectedFile = (event.target as HTMLInputElement).files?.item(0)

    if (selectedFile) {
      if (["image/jpeg", "image/png", "image/svg+xml","video/mp4","video/mkv"].includes(selectedFile.type)) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(selectedFile);
        this.filename = event.target.files[0]
        console.log(this.filename);
        
        fileReader.addEventListener('load', (event) => {
          if(this.filename.type.indexOf('video') > -1){
            this.isVideoSelected=true
            this.videoPreview= event.target?.result?.toString() as string;    
          }
          if(this.filename.type.indexOf('image') > -1){
            this.imagePreviewSrc = event.target?.result?.toString() as string;
            this.isImageSelected = true
          }
         
        })
      }
    } else {
      this.isImageSelected = false
    }
  }
}
