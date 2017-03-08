import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlayerService {

  private subjDetailSource = new Subject<string>();

  constructor(private http: Http) { }

  videoDetailObservable = this.subjDetailSource.asObservable();
  videoDetailChange(data: any) {
    this.subjDetailSource.next(data);
  }

  changeVideo(id: string) {
    this.getVideo(id).then(response => {
      this.videoDetailChange(response)
    })
  }

  getVideo(str: string): Promise<Object> {
    return this.http.get('/api/videos/'+str)
      .toPromise()
      .then(response => {   
        let videoData = response.json()
        this.videoDetailChange(videoData)
        return videoData
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

};
