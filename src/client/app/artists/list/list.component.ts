import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ScreenService } from './../../services/screen.service';
import { PlayerService } from './../../shared/jw-player/player.service';
import { PopupService } from './../../shared/services/ui-popup.service';
import { Artist } from './../search.model';

@Component({
  moduleId: module.id,
  selector: 'sd-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})
export class ListComponent implements OnChanges {

  @Input() Items: Artist[];
  filteredList: Artist[];
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
    val > 991 ? this.itemHeight = 75 : this.itemHeight = 310;
  }

  ngOnChanges(): void {
    this.filteredList = (this.Items || []).slice();
  }

  onSelect(e: Event, artist: any) {
    e.preventDefault();
    this.router.navigate(['/artists', artist.username]);
  }

}
