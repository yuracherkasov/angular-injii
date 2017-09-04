import { Input, Component, EventEmitter, Output } from '@angular/core';
import { SelectTimeService } from './select-time.service';
import { IVideo } from '../../models/video';

@Component({
  moduleId: module.id,
  selector: 'select-time',
  templateUrl: 'select-time.component.html',
  styleUrls: ['select-time.component.css'],
  providers: [SelectTimeService]
})

export class SelectTimeComponent {

  @Input() video: IVideo;
  @Output() onSubmitted = new EventEmitter<any>();
  timeZone: number = 0;
  timeZoneString: string = 'UTC+0000';
  hours: number = 12;
  meridiem: string = 'AM';
  dt: Date = new Date();
  loading: boolean;

  constructor(public selectTimeService: SelectTimeService) { }

  setTimezone(n: number) {
    if (n > 0) {
      this.timeZone === 12 ? this.timeZone = 0 : this.timeZone += 1;
    } else {
      this.timeZone === -12 ? this.timeZone = 0 : this.timeZone -= 1;
    }
    this.timeZone < 0 ?
      this.timeZoneString = 'UTC-' + ('0' + (-this.timeZone) + '00').slice(-4) :
      this.timeZoneString = 'UTC+' + ('0' + this.timeZone + '00').slice(-4);
  }

  setHours(n: number): void {
    if (n > 0) {
      this.hours === 12 ? this.hours = 1 : this.hours += 1;
    } else {
      this.hours === 1 ? this.hours = 12 : this.hours -= 1;
    }
  }

  submitDate() {
    this.loading = true;
    let date = this.dt.getFullYear() + '-' + (this.dt.getDate() < 10 ? '0' + this.dt.getDate() : this.dt.getDate()) + '-' + (this.dt.getMonth() < 9 ? '0' + (this.dt.getMonth() + 1) : this.dt.getMonth() + 1);
    let timezone = this.timeZone < 0 ? this.timeZone : '+' + this.timeZone;
    let time = (this.hours < 10 ? '0' + this.hours : this.hours) + this.meridiem;
    let requestParam = `/avaliabletime?video=${this.video.id}&date=${date}&time=${time}&timezone=${timezone}`;
    this.selectTimeService.getShedule(requestParam)
      .then(response => {
        this.onSubmitted.emit(response)
        this.loading = false;
      })
  }

}
