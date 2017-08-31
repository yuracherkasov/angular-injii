import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { ApiService } from '../../services/api.service';

@Injectable()
export class VideoPreviewService {

  private subjDetailSource = new Subject<any>();
  changeVideoObservable = this.subjDetailSource.asObservable();

  private src: string = '';

  constructor(private apiService: ApiService) { }

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
