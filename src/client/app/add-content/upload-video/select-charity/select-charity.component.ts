import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SelectCharityService } from './select-charity.service';

@Component({
  moduleId: module.id,
  selector: 'select-charity',
  templateUrl: 'select-charity.component.html',
  styleUrls: ['select-charity.component.css'],
  providers: [SelectCharityService]
})

export class SelectCharityComponent implements OnInit {

  @Output() onSelected = new EventEmitter<any>();
  charities: Array<any> = [];
  loading: boolean = true;
  charity: string = 'rtest';

  constructor(private selectTimeService: SelectCharityService) { }

  ngOnInit(): void {
    this.selectTimeService.getCharities()
      .then(response => {
        if (response.result === 'OK') {
          this.charities = response.charities;
          this.loading = false;
        }
      })
  }

  selectCharity(charity: any): void{
    this.onSelected.emit(charity)
  }
}
