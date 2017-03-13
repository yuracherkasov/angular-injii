import { Component, Input } from '@angular/core';
import { ScreenService } from './../../services/screen.service';
import { ISitem } from './../model';

@Component({
  moduleId: module.id,
  selector: 'sd-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})
export class ListComponent {

  @Input() Items: ISitem[];
  filteredList: ISitem[];
  itemHeight: number;

  constructor(private screenService: ScreenService) {

    this.setItemHeight(this.screenService.screen);

    this.screenService.screenObservable.subscribe((val) => {
      this.setItemHeight(val)
    })
  }

  setItemHeight(val: number): void{
    val > 991 ? this.itemHeight = 70 : this.itemHeight = 200;
  }

  ngOnChanges(): void {
    this.filteredList = (this.Items || []).slice();
  }

  onSelect(event: Event, item: ISitem) {
    event.preventDefault();
  }

}