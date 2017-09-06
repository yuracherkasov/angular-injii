import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sharing-video',
  templateUrl: 'sharing-video.component.html',
  styleUrls: ['sharing-video.component.css']
})


export class SharingVideoComponent implements OnInit {

  

  @Input() videos: any;

  constructor
    (
    ) {
  }



  ngOnInit(): void {
    console.log(this.videos)
  }


}
