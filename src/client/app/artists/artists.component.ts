import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { PopupService } from './../shared/services/ui-popup.service';
import { Artist } from './search.model';
import { ASearchService } from './search.service';


@Component({
  moduleId: module.id,
  selector: 'sd-artists',
  templateUrl: 'artists.component.html',
  styleUrls: ['artists.component.css']
})

export class ArtistsComponent implements OnInit, AfterViewInit {

  artists: Observable<Artist[]>;
  hidepopup: boolean = false;
  private searchTerm = new Subject<string>();

  private term: string = '';

  constructor
    (
    public searchService: ASearchService,
    public popupService: PopupService
    ) {

    searchService.searchEmitter.subscribe(order => {
      this.categoryChange(order);
    });

    popupService.contentObservable.subscribe(data => {
      if (data) {
        this.showPopUp();
      } else {
        this.hidePopUp();
      }
    });
  }

  showPopUp() {
    this.hidepopup = false;
  }
  hidePopUp() {
    this.hidepopup = true;
  }

  filterChange(filter: string) {
    this.search(filter);
  }

  categoryChange(order: string) {
    this.searchService.order = order;
    this.search(this.searchService.filter);
  }

  search(filter: string): void {
    this.term = '?&order=' + this.searchService.order + '&filter=' + filter;
    this.searchService.filter = filter;
    this.searchTerm.next(this.term);
  }

  ngAfterViewInit(): void {
    this.term = '?&order=' + this.searchService.order + '&filter=' + this.searchService.filter;
    this.searchTerm.next(this.term);

  }

  ngOnInit(): void {
    this.searchAsObservable();
  }

  searchAsObservable(): void {
    this.artists = this.searchTerm
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.searchService.search(this.term)
        : Observable.of<Artist[]>([]));
  }

}
