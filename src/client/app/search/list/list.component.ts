import { Component, Input, OnInit } from '@angular/core';
import { ScreenService } from './../../services/screen.service';
import { ISitem } from './../model';

@Component({
  moduleId: module.id,
  selector: 'sd-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private screenService: ScreenService) { }

  @Input() Items: ISitem[];
  filteredList: ISitem[];
  itemHeight: number;

  ngOnInit(): void {
    this.screenService.screen > 991 ? this.itemHeight = 70 : this.itemHeight = 200;
  }

  ngOnChanges(): void {
    this.filteredList = (this.Items || []).slice();
  }

  onSelect(event: Event, item: ISitem) {
    event.preventDefault();
  }

}