import { Component, Input, OnChanges } from '@angular/core';

import { ScheduleBarService } from './schedule-bar.service';
import { DateHelperService } from '../../services/date-helper.service';

import { Video } from '../models/video';

@Component({
  moduleId: module.id,
  selector: 'schedule-bar',
  templateUrl: 'schedule-bar.component.html',
  styleUrls: ['schedule-bar.component.css'],
})

export class ScheduleBarComponent implements OnChanges {
  @Input() selectedDate: any;

  videos: Video[];
  fullDayMinutes: number = 24 * 60;

  constructor(
    private scheduleBarService: ScheduleBarService,
    private dateHelperService: DateHelperService) { }

  ngOnChanges(): void {
    this.fillDate();
  }

  getWidth(item: any): number {
    let
      videoEndTime = new Date(item.endTime),
      videoStartTime = new Date(item.startTime),

      endTime: any =  this.isDayMatch(videoEndTime) ? videoEndTime : this.endOfSelectedDate(),
      startTime: any = this.isDayMatch(videoStartTime) ? videoStartTime : this.floorDate(videoStartTime),

      videoDuration: any = (endTime - startTime) / 60000;

    return this.calculateProportion(videoDuration);
  }

  getPosition(item: any): number {
    let
      videoStartTime = new Date(item.startTime),
      startTime: any = this.isDayMatch(videoStartTime) ? videoStartTime : this.floorDate(videoStartTime),
      startDayTime: any = this.ceilDate(startTime),
      minutesFromMidnight: number = (startTime - startDayTime) / 60000;

    return this.calculateProportion(minutesFromMidnight);
  }

  getVideosByDate(date: string): void {
    this.videos = null;
    this.scheduleBarService.getVideosByDate(date)
      .then(videos => this.videos = videos);
  }

  private fillDate() {
    let
      month = this.dateHelperService.formatDateItem(this.selectedDate.month),
      day = this.dateHelperService.formatDateItem(this.selectedDate.day),
      selectedDateString = `${this.selectedDate.year}-${month}-${day}`;

    //Console
    console.log(selectedDateString);
    this.getVideosByDate(selectedDateString);
  }

  private calculateProportion(value: number): number {
    return value * 100 / this.fullDayMinutes;
  }

  private isDayMatch(date: Date): boolean {
    return date.getDate() == this.selectedDate.day;
  }

  /**
   * Recreate date to start of the next day
   *
   * @param date
   * @returns {Date}
   */
  private floorDate(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1,
      0, 0, 0
    );
  }

  /**
   * Reset date to start of the day
   *
   * @param date
   * @returns {Date}
   */
  private ceilDate(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0, 0, 0
    );
  }

  /**
   * Create date, which contains end of the selected date
   *
   * @returns {Date}
   */
  private endOfSelectedDate(): Date {
    return new Date(
      this.selectedDate.year,
      this.selectedDate.month - 1,
      this.selectedDate.day,
      23, 59, 59
    );
  }
}
