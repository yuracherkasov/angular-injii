import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { RequestOptionsService } from '../../../services/request-options.service';

@Injectable()
export class ScheduleBarService {

  selectedTime: string;
  selectedDate: string;
  selectedTimezone: string;

  constructor
    (
      private apiService: ApiService,
      private requestOptionsService: RequestOptionsService
    ) { }

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

  submitDate(data: any): Promise<any> {
    let request = JSON.stringify(data);
    console.log(data, request);
    return this.apiService.post('/videoshow', request)
    .toPromise()
    .then((response) => response.json())
    .catch(this.requestOptionsService.handleError)
  }

}
