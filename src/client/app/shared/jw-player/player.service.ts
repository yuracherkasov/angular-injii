import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { ApiService } from '../../services/api.service';

@Injectable()
export class PlayerService {

  private subjDetailSource = new Subject<string>();
  videoDetailObservable = this.subjDetailSource.asObservable();

  constructor(private http: Http, private apiService: ApiService) { }

  videoDetailChange(data: any) {
    this.subjDetailSource.next(data);
  }

  changeVideo(id: string) {
    this.getVideo(id).then(response => {
      this.videoDetailChange(response);
    });
  }

  getVideo(str: string): Promise<Object> {
    //return this.apiService.get('/api/video/'+str)
    let file: any;
    if(str === 'current') {
       file = 'app/FAKE_DATA/video.json';
    } else {
      file = 'app/FAKE_DATA/videoID.json';
    }
    return this.http.get(file)
      .toPromise()
      .then(response => {
        let videoData = response.json();
        this.videoDetailChange(videoData);
        return videoData;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

};
