import { Component, OnInit, Input } from '@angular/core';
import { UploadVideoService } from './upload-video.service';
import { ConstantsService } from '../../services/constants.service';


import { FileUploader } from 'ng2-file-upload';

@Component({
  moduleId: module.id,
  selector: 'upload-video',
  templateUrl: 'upload-video.component.html',
  styleUrls: ['upload-video.component.css'],
  providers: [ UploadVideoService ]
})


export class UploadVideoComponent implements OnInit{

  uploader: FileUploader = new FileUploader({
    url: '/api/add_content',
    authToken: this.constantsService.User.token
  });

  @Input() artist: any;
  uploadData: any = {};
  selectedCharity: any = {};
  socials: Array<any>;
  portfolio: Array<any>;
  bio: string;
  charitiesList: boolean;
  messageLoading: boolean = false;
  popUpmessage: string = '';
  videoDuration: string = '';

  constructor
    (
      private constantsService: ConstantsService,
      private uploadVideoService: UploadVideoService
    ) {
  }

  ngOnInit(): void {
    this.socials = JSON.parse(JSON.stringify(this.artist.socials));
    this.portfolio = JSON.parse(JSON.stringify(this.artist.portfolio));
    this.bio = this.artist.bio;

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData) => {
      form.append('title', this.uploadData.title);
      form.append('tags', this.uploadData.tags);
      form.append('charity', this.selectedCharity.id);
      form.append('duration', this.videoDuration);
      form.append('artist', JSON.stringify(
        { 
          bio: this.artist.bio,
          socials: this.artist.socials,
          portfolio: this.artist.portfolio
        }
      ));   
    };
  }

  onSubmit(e: any) {
    console.log(e)
    console.log(this.uploader)
    this.uploader.uploadAll();
  }

  includeAtLeastOne(arr: Array<any>): boolean {
    let includeLink = (el: any) => !el.link;
    return arr.some(includeLink);
  }

  showCharitiesList(): void{
    this.charitiesList = !this.charitiesList;
    this.popUpmessage = '';
  }
  
  onSelectedCharity(charity: any): void{
    this.selectedCharity = charity;
    this.charitiesList = false;
  }

  sendMessage(message: string) {
    this.messageLoading = true;
    this.uploadVideoService.sendMessage(message)
    .then(response => {
      if(response.result = 'OK' && response.message) {
        this.popUpmessage = response.message;
        this.messageLoading = false;
      }
    })
  }

  onSelectVideo(file: any) {
    console.log(file)
  }

}
