import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class VideoPreviewService {

  private subjDetailSource = new Subject<any>();
  changeVideoObservable = this.subjDetailSource.asObservable();

  private src: string = '';

  constructor() { }

  selectVideo(src: string) {
    if(src != this.src) {
      this.subjDetailSource.next(src);
      this.src = src;
    }
  }
  uploadVideo(file: any) {
    this.subjDetailSource.next(file);
  }
  
};
