import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'upload-video',
  templateUrl: 'upload-video.component.html',
  styleUrls: ['upload-video.component.css']
})


export class UploadVideoComponent implements OnInit{

  @Input() artist: any;
  uploadData: any = {};
  socials: Array<any>;
  constructor () {
  }

  ngOnInit(): void {
    this.socials = JSON.parse(JSON.stringify(this.artist.socials));
    console.log(this.socials);
  }
  
    
  


}
