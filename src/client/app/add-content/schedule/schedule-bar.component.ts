import { Component, Input, OnChanges } from '@angular/core';

import { ScheduleBarService } from './schedule-bar.service';
import { DateHelperService } from '../date-helper.service';

@Component({
  moduleId: module.id,
  selector: 'schedule-bar',
  templateUrl: 'schedule-bar.component.html',
  styleUrls: ['schedule-bar.component.css'],
})

export class ScheduleBarComponent implements OnChanges {
  @Input() selectedDate: any;

  videos: Array<any> = [];
  private fullDayMinutes: number = 24 * 60;

  constructor(
    private scheduleBarService: ScheduleBarService,
    private dateHelperService: DateHelperService) { }

  ngOnChanges(): void {
    this.videos = [];
    let selectedDateString =
      `${this.selectedDate.year}-${this.dateHelperService.formatDateItem(this.selectedDate.month)}-${this.dateHelperService.formatDateItem(this.selectedDate.day)}`;
    console.log(selectedDateString);
    this.getVideosByDate(selectedDateString);
  }

  getVideosByDate(date: string): void {
    this.scheduleBarService.getVideosByDate(date)
      .then(videos => {
        this.videos = videos;
        for (let video of this.videos) {
          video.widthOnShedule = this.getWidth(video);
          video.positionOnShedule = this.getPosition(video);
        };
      });
  }

  private getWidth(item: any): number {
    return (new Date(item.endTime).valueOf() - new Date(item.startTime).valueOf()) / 60000 / this.fullDayMinutes * 100;
  }

  private getPosition(item: any): number {
    let date = new Date(item.startTime);
    return (date.valueOf() - date.setHours(0, 0, 0)) / 60000 / this.fullDayMinutes * 100;
  }

}
