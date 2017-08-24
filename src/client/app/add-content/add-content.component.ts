import { Component, OnInit, ViewChild } from '@angular/core';

import { AddContentService } from './add-content.service';
import { DateHelperService } from './date-helper.service';
import { PopupService } from './../shared/services/ui-popup.service';

import { Video } from './models/video';
import { IMyDate } from './models/my-date';
import { FileUploader } from 'ng2-file-upload';
import { ConstantsService } from '../services/constants.service';
import { VideoPreviewComponent } from './preview/video-preview.component';

@Component({
  moduleId: module.id,
  selector: 'add-content',
  templateUrl: 'add-content.component.html',
  styleUrls: ['add-content.component.css']
})

export class AddContentComponent implements OnInit {

  //name = 'Add Content';
  charities: { title: string, id: number };
  hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  videos: Video[];
  currentDay: Date = new Date;

  myDatePickerOptions = {
    minYear: this.currentDay.getFullYear(),
    showDateFormatPlaceholder: true,
    indicateInvalidDate: true
  };

  selectedDate: any = {
    year: this.currentDay.getFullYear(),
    month: this.currentDay.getMonth() + 1,
    day: this.currentDay.getDate()
  };

  uploader: FileUploader = new FileUploader({
    url: '/api/add_content',
    authToken: this.constantsService.User.token
  });
  hidepopup: boolean = false;
  contentTitle: string;
  metaTags: string;
  charity: string;
  twitterHandle: string;
  facebookHandle: string;
  artistDescription: string;
  selectedHours: string;
  selectedMinutes: string;
  period: string;

  @ViewChild(VideoPreviewComponent)
  previewComponent: VideoPreviewComponent;
  /**
   * Maximum duration of video in seconds
   */
  maxVideoDuration: number;
  isSelectedTimeBooked: boolean = false;
  isDurationValid: boolean = true;

  constructor
    (
    public popupService: PopupService,
    private addContentService: AddContentService,
    private dateHelperService: DateHelperService,
    private constantsService: ConstantsService
    ) {

    this.getUserVideos();
    this.getCharities();
    this.getMaxVideoDuration();
    popupService.contentObservable.subscribe(data => {
      if (data) {
        this.showPopUp();
      } else {
        this.hidePopUp();
      };
    });
  }

  ngOnInit() {
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData) => {
      form.append('content-title', this.contentTitle || '');
      form.append('meta-tags', this.metaTags || '');
      form.append('charity', this.charity || '');
      form.append('twitter-handle', this.twitterHandle || '');
      form.append('facebook-handle', this.facebookHandle || '');
      form.append('artist-description', this.artistDescription || '');
      form.append('datetime', this.convertPeriodDate());
    };
  }


  defineDuration(event: number): void {
    console.log('duration video = ' + event);
    this.isDurationValid = event < this.maxVideoDuration;
  }

  /**
   * Get current artist videos
   */
  getUserVideos(): void {
      let userId = this.constantsService.User.id;
      //11111
      // this.addContentService
      //   .getVideosByArtist(userId)
      //   .then(videos => this.videos = videos);

  }

  getMaxVideoDuration(): void {
    //222222
    //this.addContentService
      // .getMaxVideoDuration()
      // .then(res => this.maxVideoDuration = res);
  }

  onDateChanged(event: any): void {
    if (!event.jsdate) {
      return;
    }

    this.setCurrentDate(event.jsdate);
  }

  /**
   * Get all charities
   */
  private getCharities(): void {
    //333
    // this.addContentService.getCharities()
    //   .then(res => { console.log(res); this.charities = res; });
  }

  private setCurrentDate(date: Date): void {
    this.selectedDate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }

  private showPopUp() {
    this.hidepopup = false;
  }

  private hidePopUp() {
    this.hidepopup = true;
  }

  onSubmit(e: Event, videos: Video[]): void {
    e.preventDefault();

    if (!this.uploader.getNotUploadedItems().length || !this.isDurationValid) {
      return;
    }

    let selectedTime: Date = new Date(this.convertPeriodDate());

    if (videos && videos.some(isUploadDenied)) {
      this.isSelectedTimeBooked = true;
      return;
    }

    this.uploader.uploadAll();

    function isUploadDenied(video: Video): boolean {
      let
        startTime: Date = new Date(video.startTime),
        endTime: Date = new Date(video.endTime),
        isBooked: boolean = (selectedTime > startTime && selectedTime < endTime);

      return isBooked;
    }

    //clear browser memory
    console.log(this.previewComponent.UrlsArray);
    let urls = this.previewComponent.UrlsArray;
    for (let i = 0; i < urls.length; i++) {
      URL.revokeObjectURL(urls[i]);
    }
    this.previewComponent.cssDisplay = false;
    this.previewComponent.UrlsArray = [];

    this.contentTitle = '';
    this.metaTags = '';
    this.charity = '';
    this.twitterHandle = '';
    this.facebookHandle = '';
    this.artistDescription = '';

  }


  private onSelectTimeChange(): void {
    this.isSelectedTimeBooked = false;
  }

  /**
   * Convert date from 12-hours to 24-hours system
   * and add leading zero to month and/or day if needed
   *
   * @returns {string}
   */
  private convertPeriodDate(): string {
    let
      month = this.dateHelperService.formatDateItem(this.selectedDate.month),
      day = this.dateHelperService.formatDateItem(this.selectedDate.day),
      hours = this.convertPeriodHours(this.period, this.selectedHours);

    return `${this.selectedDate.year}-${month}-${day} ${hours}:${this.selectedMinutes}:00`;
  }

  /**
   * Convert hours from 12 to 24-hours system
   *
   * @param period
   * @param hours
   * @returns {string}
   */
  private convertPeriodHours(period: string, hours: string): string {
    if (period === 'am') {
      hours = (hours === '12') ? '00' : hours;
    }

    if (period === 'pm') {
      hours = (hours !== '12') ? (+hours + 12).toString() : hours;
    }

    return hours;
  }
}
