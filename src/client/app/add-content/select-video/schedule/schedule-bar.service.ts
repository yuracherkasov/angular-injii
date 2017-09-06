import { Injectable } from '@angular/core';

@Injectable()
export class ScheduleBarService {

  selectedTime: string;
  selectedDate: string;
  selectedTimezone: string;

  constructor () { }

  setTime(time: string): void {
    this.selectedTime = time;
  }
  setDate(date: string) {
    this.selectedDate = date;
  }
  setTimezone(timezone: string) {
    this.selectedTimezone = timezone;
  }
  canActivate(): boolean {
    if( this.selectedDate && this.selectedDate ) return true;
    return false;
  }

}
