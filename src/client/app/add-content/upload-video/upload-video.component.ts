import { Component, OnInit, Input, NgZone } from '@angular/core';
import { UploadVideoService } from './upload-video.service';
import { ApiService } from '../../services/api.service';
import { ConstantsService } from '../../services/constants.service';
import { VideoPreviewService } from '../preview/video-preview.service';
import { VideoDurationService } from '../video-duration.service';

import { FileUploader, FileItem } from 'ng2-file-upload';

@Component({
  moduleId: module.id,
  selector: 'upload-video',
  templateUrl: 'upload-video.component.html',
  styleUrls: ['upload-video.component.css'],
  providers: [UploadVideoService]
})


export class UploadVideoComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url: this.apiService.url + '/api/add_content',
    //url: 'http://localhost:3000',
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
  selectedFileName: string = '';
  uploadSuccessMessage: string = '';
  uploadErrorMessage: string = '';
  uploadProgress: number = 0;
  maxDuration: number = 240;
  isDurationValid: boolean = true;

  constructor
    (
    private videoPreviewService: VideoPreviewService,
    private constantsService: ConstantsService,
    private uploadVideoService: UploadVideoService,
    private videoDurationService: VideoDurationService,
    private apiService: ApiService,
    private zone: NgZone
    ) {
      this.videoDurationService.changeDurationObservable
      .subscribe((amount: number) => {
        this.checkDuration(amount)
      })
  }

  checkDuration(amount: number): void {
    this.isDurationValid = amount <= this.maxDuration;
    this.videoDuration = amount+'';
    //console.log("Video duration = " + this.videoDuration);
  }


  ngOnInit(): void {
    this.videoDurationService.getMaxDuration()
      .then(response => {
        if(response.result === 'OK'){
          this.maxDuration = response.duration;
        } 
      })

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

    this.uploader.onErrorItem = (item, response, status, headers): any => {
      // console.log("Data not sent; item: ", item, "response: ", response, status, headers)
      this.uploadProgress = 0;
      this.uploadSuccessMessage = '';
      this.uploadErrorMessage = 'Could not send data';
    }
    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      this.zone.run( () => {
        this.uploadProgress = progress;
      })
    }
    this.uploader.onSuccessItem = (item: FileItem, response: any, status: number) => {
      // console.log("response: ", response, "status: ", status);
      let res = JSON.parse(response)
      if (res.resul = 'OK') {
        this.uploadErrorMessage = '';
        this.uploadSuccessMessage = res.message;
      }
      this.uploadProgress = 0;
    }
  }

  onSubmit(e: any) {
    if(this.selectedCharity.id) {
      this.uploader.uploadAll();
    }
  }

  includeAtLeastOne(arr: Array<any>): boolean {
    let includeLink = (el: any) => !el.link;
    return arr.some(includeLink);
  }

  showCharitiesList(): void {
    this.charitiesList = !this.charitiesList;
    this.popUpmessage = '';
  }

  onSelectedCharity(charity: any): void {
    this.selectedCharity = charity;
    this.charitiesList = false;
  }

  sendMessage(message: string) {
    this.messageLoading = true;
    this.uploadVideoService.sendMessage(message)
      .then(response => {
        if (response.result = 'OK' && response.message) {
          this.popUpmessage = response.message;
          this.messageLoading = false;
        }
      })
  }

  onSelectVideo(event: any) {
    if (event.target && event.target.files[0]) {
      let file = event.target.files[0];
      this.selectedFileName = file.name;
      this.videoPreviewService.uploadVideo(file);
      this.uploadSuccessMessage = '';
      this.uploadErrorMessage = '';
    };
  }

}
