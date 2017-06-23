import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ScreenService } from './../../services/screen.service';
import { PlayerService } from './../../shared/jw-player/player.service';
import { PopupService } from './../../shared/services/ui-popup.service';
import { ISitem } from './../model';

@Component({
  moduleId: module.id,
  selector: 'sd-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})
export class ListComponent implements OnChanges {

  @Input() Items: ISitem[];
  filteredList: ISitem[];
  itemHeight: number;
  scrollItems: any;

  constructor
    (
    private screenService: ScreenService,
    private popupService: PopupService,
    private playerService: PlayerService,
    private router: Router
    ) {

    this.setItemHeight(this.screenService.screen);

    this.screenService.screenObservable.subscribe((val) => {
      this.setItemHeight(val);
    });
  }

  setItemHeight(val: number): void {
    val > 991 ? this.itemHeight = 70 : this.itemHeight = 200;
  }

  ngOnChanges(): void {
    this.filteredList = (this.Items || []).slice();
  }

  onSelect(event: Event, item: ISitem) {
    event.preventDefault();
    if (item.role === 'artist') {
      this.router.navigate(['/artists', item.username]);
    } else if (item.role === 'charity') {
      this.router.navigate(['/charity', item.username]);
    } else if (!item.role) {
      this.playerService.changeVideo(item.id);
      this.popupService.hideContentPopup();
    }
  }

}
