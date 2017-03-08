import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { CommentsService } from './comments.service';
import { ConstantsService } from './../services/constants.service';

@Component({
  moduleId: module.id,
  selector: 'sd-comments',
  templateUrl: 'comments.component.html',
  styleUrls: ['comments.component.css'],
  providers: [CommentsService]
})
export class ProfileCommentsComponent implements OnInit {

  private comments: any;
  private loading: any = false;
  private newComment: string = "";
  private username: string;
  private limit: number = 10;
  private offset: number;
  private showMoreButton: boolean;
  private responseMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private constantsService: ConstantsService,
    private commentsService: CommentsService) {
  }


  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        this.comments = [];
        this.offset = 0;
        this.responseMessage = "";
        this.showMoreButton = false;
        let term = '/?offset=' + this.offset + '&limit=' + this.limit;
        this.username = params['username'];
        return this.commentsService.getAll(this.username, term)
      })
      .subscribe((response: any) => {
        if (response.comments) {
          this.comments = response.comments;
        }
        if (response.total && (response.total > this.offset + this.limit)) {
          this.showMoreButton = true;
        }
      });
  }

  getMore() {
    this.loading = 9999;
    this.offset += this.limit;
    let term = '/?offset=' + this.offset + '&limit=' + this.limit;
    this.commentsService.getAll(this.username, term)
      .then((response: any) => {
        this.comments.push(...response.comments);
        this.loading = false;
        if (response.total && (response.total <= this.offset + this.limit)) {
          this.showMoreButton = false;
        }
      }, (reject) => {
        console.log(reject)
        this.loading = false
      })
  }

  approve(comment: any, n: number): void {
    this.loading = n;
    let copyComment = Object.assign({}, comment);
    copyComment.confirmed = true;
    this.commentsService.update(copyComment)
      .then(response => {
        this.loading = false;
        if (response.result && response.result === "OK") {
          comment.confirmed = true;
        }
      }, (reject) => {
        console.log(reject)
        this.loading = false
      })
  }

  delete(comment: any, n: number): void {
    this.loading = n;
    this.commentsService.delete(comment.id)
      .then(response => {
        this.loading = false;
        if (response.result === "OK") {
          this.comments.splice(n, 1);
        }
      }, (reject) => {
        console.log(reject)
        this.loading = false
      })
  }

  submit(): void {
    if (this.constantsService.User) {
      this.loading = true;
      this.commentsService.add(this.username, this.newComment)
        .then(response => {
          if (response.result === "OK" && response.message) {
            this.responseMessage = response.message;
            this.newComment = "";
            this.loading = false;
          }
        }, (reject) => {
          console.log(reject)
          this.loading = false
        })
    }

  }

  gotoProfile(event: Event, comment: any): void {
    event.preventDefault();
    if (comment.from.role === "artist") {
      this.router.navigate(['/artists', comment.from.username]);
    } else if (comment.from.role === "charity") {
      this.router.navigate(['/charity', comment.from.username]);
    }
  }
}