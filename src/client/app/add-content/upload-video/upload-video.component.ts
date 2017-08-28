import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'upload-video',
  templateUrl: 'upload-video.component.html',
  styleUrls: ['upload-video.component.css']
})


export class UploadVideoComponent implements OnInit{

  @Input() artist: any;
  uploadTitle: string = '';
  selectedCharity: any = {};
  socials: Array<any>;
  portfolio: Array<any>;
  bio: string;
  charitiesList: boolean;
  constructor () {
  }

  ngOnInit(): void {
    this.socials = JSON.parse(JSON.stringify(this.artist.socials));
    this.portfolio = JSON.parse(JSON.stringify(this.artist.portfolio));
    this.bio = this.artist.bio;

    console.log(this.socials);
  }
  
  includeAtLeastOne(arr: Array<any>): boolean {
    let includeLink = (el: any) => !el.link;
    return arr.some(includeLink);
  }

  showCharitiesList(): void{
    this.charitiesList = !this.charitiesList;
  }
  
  onSelectedCharity(id: string){
    this.selectedCharity = id;
    this.charitiesList = false;
    console.log(this.selectedCharity);
  }

}
