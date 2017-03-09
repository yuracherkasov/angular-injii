import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PopupService } from './../shared/services/ui-popup.service';
import { SearchService } from './search.service';

@Component({
  moduleId: module.id,
  selector: 'sd-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css']
})
export class SearchComponent implements OnInit {

  private hidepopup: boolean = false;
  
  items: Observable<any[]>;
  private searchTerm = new Subject<string>();
  private term: string = "";

  constructor
    (
      private popupService: PopupService,
      private searchService: SearchService 
    ) {

    popupService.contentObservable.subscribe(data => {
      if (data) {
        this.showPopUp()
      } else {
        this.hidePopUp()
      }
    })

  }

  showPopUp() {
    this.hidepopup = false;
  }
  hidePopUp() {
    this.hidepopup = true;
  }

  ngOnInit(): void {
    this.searchAsObservable();
    if (this.searchService.filter !== ''){
      setTimeout(() => {this.searchTerm.next(this.searchService.filter)}, 0)
    }
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
        : Observable.of<any[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<any[]>([]);
      });
  }

}
