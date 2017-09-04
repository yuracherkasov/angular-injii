import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class AgreementService {

  private agreementSource = new Subject<boolean>();
  acceptedAgreementObservable = this.agreementSource.asObservable();


  confirmAccepted(bool: boolean): void {
    this.agreementSource.next(bool);
  }


}


  