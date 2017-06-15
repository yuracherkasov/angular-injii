import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();

  info(message: string){
    this.subject.next({ type: 'info', text: message });
  }

  danger(message: string){
    this.subject.next({ type: 'danger', text: message });
  }

  success(message: string){
    this.subject.next({ type: 'success', text: message });
  }

  timeOutClear(time: number){
    setTimeout(() => this.subject.next(), time * 1000);
  }

  clear(){
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}