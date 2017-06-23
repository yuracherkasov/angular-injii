import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContestService } from './../contest.service';

@Component({
  moduleId: module.id,
  selector: 'upcoming-contest',
  templateUrl: 'upcoming-contest.component.html',
  styleUrls: ['upcoming-contest.component.css'],
})

export class UpcomingContestComponent implements OnInit {

  private contests: any = [];

  constructor(private contestService: ContestService) { }

  ngOnInit() {
    this.contestService.getContest('upcoming')
      .then(response => {
        if (response.result === 'OK' && Array.isArray(response.contests)) {
          this.contests = response.contests;
        }
      });
  }
}
