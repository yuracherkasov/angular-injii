import { Component, OnChanges, ViewChild, ElementRef, Input } from '@angular/core';

import { ContestService } from './../contest.service';
import { ScreenService } from "./../../services/screen.service";
import { CarouselService } from "./../carousel.service"

@Component({
  moduleId: module.id,
  selector: 'upcoming-item',
  templateUrl: 'upcoming-item.component.html',
  styleUrls: ['upcoming-contest.component.css'],
  providers: [CarouselService]
})

export class UpcomingItemComponent implements OnChanges{
  
  @Input() contest: any;
  @Input() index: number;
  @ViewChild('carousel') carousel: ElementRef;

  private artists: any = [];
  private carouselItemWidth: number = 250;
  private showIndex: number = 0;

  constructor
    (
    private carouselService: CarouselService,
    private screenService: ScreenService,
    private contestService: ContestService
    ) {}

  ngOnChanges(){
    if(this.contest){
      this.artists = this.contest.artists;
      this.carouselService.getPagination(this.artists.length, this.carouselItemWidth, this.carousel.nativeElement.clientWidth)
    }
  }

  showContest(i: number){  
     (this.showIndex === i) ? this.showIndex = 999 : this.showIndex = i;
     console.log(this.screenService.screen)
  }

}
