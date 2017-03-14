import { Component, OnInit, NgZone } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Video } from './search.model';
import { SearchService } from './search.service';
import { PopupService } from './../../shared/services/ui-popup.service'
import { PlayerService } from './../../shared/jw-player/player.service';

@Component({
  moduleId: module.id,
  selector: 'content-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  providers: [SearchService]
})

export class SearchComponent implements OnInit {
  videos: Observable<Video[]>;
  private searchTerms = new Subject<string>();
  
  term: string;
  order: string;
  offset: number;
  limit: number = 10;

  currentPage: number;
  pages: Array<number>;
  totalPages: number;


  constructor(private searchService: SearchService, 
              zone: NgZone,
              public playerService: PlayerService,
              public popupService: PopupService) {

    this.order = "";
    this.term = "";
    this.offset = 0;

    this.pages = [];

    this.searchService.paginationObservable.subscribe((data: any) => {
      this.pages = data.pages;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;
    })
  }

  paginationChange(page: number, filter: string){
    this.offset = this.limit * (page - 1);
    this.search(filter)
  }
  
  categoryChange(event: any, order: string, filter: string) {
    event.preventDefault();
    this.offset = 0;
    this.order = order;
    this.search(filter)
  }

  filterChange(filter: string){
     this.offset = 0;
     this.search(filter);
  }

  search(filter: string): void {
    this.term = '/?offset=' + this.offset + '&limit=' + this.limit + '&order=' + this.order + '&filter=' + filter;
    this.searchTerms.next(this.term);
  }

  ngOnInit(): void {
    this.videos = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.searchService.search(this.term)
        : Observable.of<Video[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Video[]>([]);
      }); 
      
  }

  submitVideoOnMainPlayer(e: Event, id: string): void{
    e.preventDefault();
    this.playerService.changeVideo(id);
    this.popupService.hideContentPopup();
  }
}