import { Injectable } from '@angular/core';

@Injectable()
export class DateHelperService {

  /**
   * Add leading zero to day and/or month if necessary
   *
   * @param dateItem
   * @returns {string}
   */
  formatDateItem(dateItem: number): string {
    return ('0' + dateItem).slice(-2);
  }
}
