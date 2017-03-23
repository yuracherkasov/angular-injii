import 'rxjs/add/operator/switchMap';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

import { PopupService } from './../shared/services/ui-popup.service';
import { CSearchService } from './search.service';
import { Charity } from './charity.model';


@Component({
  moduleId: module.id,
  selector: 'sd-charities',
  templateUrl: 'charities.component.html',
  styleUrls: ['charities.component.css']
})

export class CharitiesComponent implements OnInit, AfterViewInit {

  hidepopup: boolean = false;
  charities: Observable<Charity[]>;
  private searchTerm = new Subject<string>();

  term: string = '';

  constructor
    (
    public searchService: CSearchService,
    public popupService: PopupService,
    private router: Router
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
    this.term = '/?&order=' + this.searchService.order + '&filter=' + filter;
    this.searchService.filter = filter;
    this.searchTerm.next(this.term);
  }

  ngAfterViewInit(): void {
    this.term = '/?&order=' + this.searchService.order + '&filter=' + this.searchService.filter;
    this.searchTerm.next(this.term);
  }

  ngOnInit(): void {
    this.searchAsObservable();
  }

  searchAsObservable(): void {
    this.charities = this.searchTerm
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.searchService.search(this.term)
        : Observable.of<Charity[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Charity[]>([]);
      });
  }

  onSelect(e: Event, charity: any) {
    e.preventDefault();
    this.router.navigate(['/charity', charity.username]);
  }

}
