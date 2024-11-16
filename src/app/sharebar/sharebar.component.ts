import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../postService/post.service';
import { environment } from 'src/environments/environment';
import AWSS3UploadAshClient from 'aws-s3-upload-ash'
import { UploadResponse } from 'aws-s3-upload-ash/dist/types';

@Component({
  selector: 'app-sharebar',
  templateUrl: './sharebar.component.html',
  styleUrls: ['./sharebar.component.css']
})
export class SharebarComponent implements OnInit {
  imagePreviewSrc: string = ''
  isImageSelected: boolean = false;
  filename:any;
  videoPreview: any;
  isVideoSelected: boolean=false;
  config={
    bucketName: 'konnectsme',
    region: 'us-east-1',
    accessKeyId:environment.AWS_ACCESS_KEY,
    secretAccessKey:environment.AWS_KEY,
    s3Url: 'https://konnectsme.s3.us-east-1.amazonaws.com/'
  }
  config2={
    bucketName: 's3uploadimageang',
    region: 'us-east-1',
    accessKeyId:environment.AWS_ACCESS_KEY2,
    secretAccessKey:environment.AWS_KEY2,
    s3Url: 'https://s3uploadimageang.s3.amazonaws.com/'
  }
  S3Client:AWSS3UploadAshClient=new AWSS3UploadAshClient(this.config2)
  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  
 async submit(data: NgForm) {
    const id = JSON.parse(localStorage.getItem('KMuser') || '{}')._id
    const formdata = new FormData
    const uploadedFileUrl = await this.upload();
    if (uploadedFileUrl) {
      formdata.append('img', this.filename); 
      formdata.append('desc', data.value.desc);
      formdata.append('url',uploadedFileUrl.location)
      this.postService.createpost(id, formdata).subscribe((res) => {
        console.log(res);
        data.reset();
        this.isImageSelected = false;
        this.imagePreviewSrc = '';
        this.videoPreview = '';
        this.isVideoSelected = false;
      });
    } else {
      console.log("Upload failed, cannot proceed with post creation");
    }
  }
  upload():Promise<any | null>{
    return new Promise((resolve,reject)=>{
      if(!this.filename){
        return resolve(null)
      }
  this.S3Client.uploadFile(this.filename,this.filename.type,undefined,this.filename.name,'public-read').then((data:UploadResponse)=>{
      console.log(data);
       resolve(data)
    }).catch(err=>{     
      console.log(err,"error");
      reject(null)
    })
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
