import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptionsService } from './../services/request-options.service';
import { PlayerService } from './../shared/jw-player/player.service';
import { PopupService } from './../shared/services/ui-popup.service';
import { ApiService } from '../services/api.service';


@Injectable()

export class ContestService {

  constructor
    (
    private http: Http,
    private requestOptionsService: RequestOptionsService,
    private playerService: PlayerService,
    private popupService: PopupService,
    private apiService: ApiService
    ) {}


  getContest(name: string): Promise<any> {
    let file = name === 'current' ? 'app/FAKE_DATA/contestC.json' : 'app/FAKE_DATA/contestU.json';
    return this.http.get(file)
    //return this.apiService.get('/api/contest/' + name)
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

  submitVote(vote: number, username: string): Promise<any> {
    return this.apiService.patch('/api/contest/' + username, { "votes": vote })
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

  submitVideoOnPlayer(e: Event, id: string) {
    e.preventDefault();
    this.playerService.changeVideo(id);
    this.popupService.hideContentPopup();
  }
}
