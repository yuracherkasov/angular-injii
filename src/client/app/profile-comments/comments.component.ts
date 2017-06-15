import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { CommentsService } from './comments.service';
import { ConstantsService } from './../services/constants.service';
import { AlertService } from './../shared/alert/alert.service';

@Component({
  moduleId: module.id,
  selector: 'sd-comments',
  templateUrl: 'comments.component.html',
  styleUrls: ['comments.component.css'],
  providers: [CommentsService]
})
export class ProfileCommentsComponent implements OnInit {


  loading: any = false;
  newComment: string = '';
  showMoreButton: boolean;
  private comments: any;
  private username: string;
  private limit: number = 10;
  private offset: number;
  private term: string = ''

  constructor
  (
    public constantsService: ConstantsService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private commentsService: CommentsService) {
  }


  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        this.comments = [];
        this.offset = 0;
        this.showMoreButton = false;
        this.term = '?offset=' + this.offset + '&limit=' + this.limit;
        this.username = params['username'];
        return this.commentsService.getAll(this.username, this.term);
      })
      .subscribe((response: any) => {
        console.log("Get Comments response: ", response);
        if(response.result === 'OK'){
          this.comments = response.comments;
          if (response.total && (response.total > this.offset + this.limit)) {
            this.showMoreButton = true;
          }
        }    
      });
  }

  getMore() {
    this.loading = 9999;
    this.offset += this.limit;
    this.term = '?offset=' + this.offset + '&limit=' + this.limit;
    this.getComments();
  }

  getComments(){
    this.commentsService.getAll(this.username, this.term)
      .then((response: any) => {
        if(response.result === 'OK'){
           this.comments.push(...response.comments);
          this.loading = false;    
          if (response.total && (response.total <= this.offset + this.limit)) {
            this.showMoreButton = false;
          }
        };   
        if (response.error && typeof response.error === 'string'){
            this.alertService.danger(response.error);
        }       
      }, (reject) => {
        console.log(reject);
        this.loading = false;
      });
  }

  approve(comment: any, n: number): void {
    this.loading = n;
    //let copyComment = Object.assign({}, comment);
    //copyComment.confirmed = 'inactive';
    this.commentsService.update(comment)
      .then(response => {
        console.log(response);
        this.loading = false;
        if (response.result && response.result === 'OK') {
          comment.confirmed = 'active';
        }
      }, (reject) => {
        console.log(reject);
        this.loading = false;
      });
  }

  del(comment: any, n: number): void {
    this.loading = n;
    this.commentsService.del(comment.id)
      .then(response => {
        console.log(response);
        this.loading = false;
        if (response.result === 'OK') {
          this.comments.splice(n, 1);
        }
      }, (reject) => {
        console.log(reject);
        this.loading = false;
      });
  }

  submit(): void {
    if (this.constantsService.User) {
      this.loading = 999;
      this.commentsService.add(this.username, this.newComment)
        .then(response => {
          console.log("response.comment: ", response)
          if (response.result === 'OK' && response.message) {
            this.newComment = '';
            this.alertService.success(response.message);
          } else if (response.error && typeof response.error === 'string'){
            this.alertService.danger(response.error);
          }; 
          this.loading = false;     
        }, (reject) => {
          console.log(reject);
          this.loading = false;
        });
    }

  }

  gotoProfile(event: Event, comment: any): void {
    event.preventDefault();
    if (comment.from.role === 'artist') {
      this.router.navigate(['/artists', comment.from.username]);
    } else if (comment.from.role === 'charity') {
      this.router.navigate(['/charity', comment.from.username]);
    }
  }
}
