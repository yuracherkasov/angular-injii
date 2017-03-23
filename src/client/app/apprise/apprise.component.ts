import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PopupService } from './../shared/services/ui-popup.service';
import { ConstantsService } from '../services/constants.service';
import { AppriseService } from './apprise.service';
import { IArticle, IApprise } from './apprise.model';


@Component({
  moduleId: module.id,
  selector: 'sd-apprise',
  templateUrl: 'apprise.component.html',
  styleUrls: ['apprise.component.css'],
  providers: [AppriseService]
})

export class AppriseComponent implements OnInit {

  @ViewChild('myFrame') myFrame: ElementRef;
  public hidepopup: boolean = false;
  public loading: boolean = false;
  public messageLoading: boolean = false;
  public tooglePopupValue: boolean = false;
  public resolveMessage: string = '';
  public fullScreenIframe: boolean = false;
  public articleMessage: string;
  private articleUrl: string = '';
  private offset: number = 0;
  private limit: number = 12;
  private term: string = '';
  private articles: IArticle[] = [];
  private makeQuery: boolean = false;
  private showIframe: boolean = false;

  constructor
  (
    public popupService: PopupService,
    public constantsService: ConstantsService,
    private appriseService: AppriseService
  ) {

    popupService.contentObservable.subscribe(data => {
      if (data) {
        this.showPopUp();
      } else {
        this.hidePopUp();
      }
    });
  }

  showPopUp() {
    this.hidepopup = false;
  }
  hidePopUp() {
    this.hidepopup = true;
  }

  ngOnInit(): void {
    this.getArticles(false);
  }

  getArticles(val: boolean) {
    this.loading = true;
    if (val) {
      this.offset += this.limit;
    }
    this.term = '/?offset=' + this.offset + '&limit=' + this.limit;

    this.appriseService.get(this.term)
      .then((response: IApprise) => {
        if (response.total <= this.offset + this.limit) {
          this.loading = false;
        }
        if (response.articles) {
          this.articles.push(...response.articles);
          this.loading = false;
          this.makeQuery = true;
        }
      }, (reject) => {
        console.log('reject: ', reject);
      });
  }

  onScroll(event: any) {
    if ((event.target.scrollTop + event.target.clientHeight) >= event.target.scrollHeight && this.makeQuery) {
      this.getArticles(true);
      this.makeQuery = false;
    }
  }

  onloadArticle(e: Event, url: string): void {
    e.preventDefault();
    this.showIframe = true;
    this.myFrame.nativeElement.src = url;
  }

  closeFrame(): void {
    this.showIframe = false;
    this.myFrame.nativeElement.src = '';
    this.hidepopup = false;
  }

  toggleWidthFrame(): void {
    this.fullScreenIframe = !this.fullScreenIframe;
    this.fullScreenIframe ? this.hidepopup = true : this.hidepopup = false;
  }

  tooglePopup(): void {
    this.tooglePopupValue = !this.tooglePopupValue;
  }

  submit(): void {
    this.messageLoading = true;
    console.log(this.articleMessage);
    this.appriseService.sendArticle(this.articleMessage)
      .then(response => {
        if(response.message){
          this.resolveMessage = response.message;
        }
        this.messageLoading = false;
      });
  }

}
