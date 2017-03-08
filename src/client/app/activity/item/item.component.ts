import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { PlayerService } from './../../shared/jw-player/player.service';
import { PopupControlService } from './../../services/popup-control.service';
import { Router } from '@angular/router';
import { IVideo } from '../activity.model';
import { ISponsor } from '../activity.model';


@Component({
  moduleId: module.id,
  selector: 'activity-item',
  templateUrl: 'item.component.html',
  styleUrls: ['item.component.css'],
})

export class ActivityItemComponent implements OnInit {

  @Input() isLast: boolean;
  @Input() item: IVideo;

  @Output() onLastDone: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() makeDonate: EventEmitter<any> = new EventEmitter<any>();
  @Output() showSponsor: EventEmitter<any> = new EventEmitter<ISponsor>();
  @Output() showSharing: EventEmitter<any> = new EventEmitter<IVideo>();

  constructor(private router: Router, private playerService: PlayerService, private popupControlService: PopupControlService) {}

  ngOnInit() {
    if (this.isLast)
      this.onLastDone.emit(true);
  }

  submitVideoOnMainPlayer(id: string): void {
    this.playerService.changeVideo(id);
  }

  gotoDonate(item: any): void{
    this.makeDonate.emit(item)    
  }

  gotoSponsor(sponsor: ISponsor): void{
    this.showSponsor.emit(sponsor)
  }

  gotoSharing(video: IVideo): void{
    this.showSharing.emit(video)
  }

   gotoProfile(param: any, state: string, e: Event): void {
    e.preventDefault();
    this.router.navigate([state, param]);
    this.popupControlService.isWhichTabOpen = '';
  }

}