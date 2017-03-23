import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { PopupControlService } from './../services/popup-control.service';
import { PopupService } from './../shared/services/ui-popup.service';
import { ActivityService } from './activity.service';
import { UiDonationService } from './../shared/donation/ui-donation.service';
import { IVideo } from './activity.model';
import { ISponsor } from './activity.model';


interface MyEventTarget extends EventTarget {
  scrollTop: number;
}

interface MyEvent extends Event {
  target: MyEventTarget;
}

@Component({
  moduleId: module.id,
  selector: 'sd-activity',
  templateUrl: 'activity.component.html',
  styleUrls: ['activity.component.css'],
  providers: [ActivityService]
})

export class ActivityComponent implements OnInit {

  @ViewChild('container') container: ElementRef;
  @ViewChild('inner') inner: ElementRef;

  private term: string = '';
  public order: string = '';
  public loading: boolean = false;
  private offset: number = 0;
  private limit: number = 12;
  private total: number;
  private activititems: IVideo[] = [];
  private hidepopup: boolean = false;
  private heightContainer: number;
  private heightInner: number;
  private uploadFlag: boolean = false; 
  private videoObj: any = {};

  constructor
    (
    public popupService: PopupService,
    public uiDonationService: UiDonationService,
    private activityService: ActivityService,
    private popupControlService: PopupControlService,
    ) {

    popupService.contentObservable.subscribe(data => {
      if (data) {
        this.showPopUp();
      } else {
        this.hidePopUp();
      }
    })
  };

  showPopUp() {
    this.hidepopup = false;
  }
  hidePopUp() {
    this.hidepopup = true;
  }

  ngOnInit() {
    this.categoryChange('new');
  }

  categoryChange(order: string) {
    if (order) {
      this.loading = true;
      this.activititems = [];
      this.order = order;
      this.offset = 0;
    } else {
      this.offset += this.limit;
    }
    this.term = '/?offset=' + this.offset + '&limit=' + this.limit + '&order=' + this.order;

    this.activityService.get(this.term)
      .then((response: any) => {
        if (response.total <= this.offset + this.limit) {
          this.loading = false;
        }
        if (response.videos) {
          this.activititems.push(...response.videos);
          this.uploadFlag = true;
        }
      }, (reject) => {
        console.log('reject: ', reject);
      });
  }

  lastItemDone() {
    this.heightContainer = this.container.nativeElement.clientHeight;
    this.heightInner = this.inner.nativeElement.clientHeight;
  }

  onScroll(event: MyEvent): void {
    if ((event.target.scrollTop + this.heightContainer) >= this.heightInner && this.uploadFlag) {
      this.uploadFlag = false;
      this.categoryChange('');
    }
  }

  showDonate(item: any): void {
    this.videoObj.id = item.id;
    this.videoObj.title = item.title;
    this.uiDonationService.donationShow(item.charity, this.videoObj, item.artist);
  }

  showSponsor(sponsor: ISponsor) {
    this.popupControlService.toggleSponsor(sponsor);
  }

  showSharing(video: IVideo) {
    this.popupControlService.toggleSharing(video);
  }

}

