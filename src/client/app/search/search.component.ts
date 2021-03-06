import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PopupService } from './../shared/services/ui-popup.service';
import { SearchService } from './search.service';
import { ISitem } from './model';

@Component({
  moduleId: module.id,
  selector: 'sd-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css']
})
export class SearchComponent implements OnInit {

  hidepopup: boolean = false;
  items: Observable<ISitem[]>;
  private searchTerm = new Subject<string>();
  private term: string = '';

  constructor
    (
      public popupService: PopupService,
      public searchService: SearchService
    ) {

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

  ngOnInit(): void {
    this.searchAsObservable();
    if (this.searchService.filter !== '') {
      setTimeout(() => {this.searchTerm.next(this.searchService.filter);}, 0);
    };
  }

  search(term: string): void {
    this.searchService.filter = term;
    this.searchTerm.next(term);
  }

  searchAsObservable(): void {
    this.items = this.searchTerm
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.searchService.search(term)
        : Observable.of<ISitem[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<ISitem[]>([]);
      });
  }

}
