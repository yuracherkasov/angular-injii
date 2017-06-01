import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { ApiService } from '../../services/api.service';

@Injectable()
export class DonationService {

  constructor(private http: Http, private apiService: ApiService) { }

  checkout(data: any): Promise<any> {
    return this.apiService.get('/api/checkout/?amount='+data.amount + '&charity_username=' + data.charity_username + '&video_id=' + data.video_id + '&username=' + data.username)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

   private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
