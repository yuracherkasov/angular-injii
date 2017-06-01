import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptionsService } from "./../services/request-options.service";
import { PlayerService } from "./../shared/jw-player/player.service";
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
    return this.apiService.get('/api/contest/' + name, this.requestOptionsService.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

  submitVote(vote: number, username: string): Promise<any> {
    return this.apiService.patch('/api/contest/' + username, { "votes": vote }, this.requestOptionsService.jwt())
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
