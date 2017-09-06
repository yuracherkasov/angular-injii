import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IVideo } from '../models/video';
import { ApiService } from '../../services/api.service';
import { RequestOptionsService } from '../../services/request-options.service';

@Injectable()

export class SelectVideoService {

  selectedVideo: IVideo;

  constructor
    (
    private http: Http,
    private apiService: ApiService,
    private requestOptionsService: RequestOptionsService
    ) { }

  setVideo(video: IVideo): void {
    this.selectedVideo = video;
  }


  submitDate(data: any): Promise<any> {
    let request = JSON.stringify(data);
    // return this.apiService.post('/videoshow', request)
    //   .toPromise()
    //   .then((response) => response.json())
    //   .catch(this.requestOptionsService.handleError)
    return new Promise ( (res, rej) => {
      setTimeout( () => {
        res({result: 'OK', message: "your video will be broadcast " + data.data + ' ' + data.time + ' ' + data.timezone})
      }, 700)
    } )
  }

   getShedule(param: string): Promise<any> {
    console.log(param);
    // return this.apiService.get(param)
    //   .toPromise()
    //   .then(response => response.json(), reject => reject.json())
    //   .catch((e) => this.requestOptionsService.handleError(e, 'Get available time on Add Content page'));

    return this.http.get('app/FAKE_DATA/shedule.json')
      .toPromise()
      .then(response => {
        return new Promise((res, rej) => {
          setTimeout(() => res(response.json()), 500);
        })
      })
      .catch(this.requestOptionsService.handleError);
  }


}