import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptionsService } from "./../services/request-options.service";


@Injectable()

export class CommentsService {
  constructor(private http: Http,
    private requestOptionsService: RequestOptionsService) { }

  getAll(username: string, term: string): Promise<any> {
    //console.log('/api/comments/'+ username + term);
    return this.http.get('/api/comments/'+ username + term, this.requestOptionsService.jwt()) 
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

  update(comment: any): Promise<any> {
    return this.http.put('/api/comments/' + comment.id, comment, this.requestOptionsService.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

  delete(id: string): Promise<any> {
    return this.http.delete('/api/comments/' + id, this.requestOptionsService.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

  add(username: string, text: any): Promise<any> {
    return this.http.post('/api/comments/' + username, {"text": text}, this.requestOptionsService.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.requestOptionsService.handleError);
  }

}

/** 
   * 
   * @apiVersion 1.0.0
   * @api {get} /api/comments/:username/?offset={number}&limit={number}   Get comments
   * @apiName Get comments
   * @apiGroup  Profiles comments
   * 
   * 
   * @apiDescription  Comments can be private and public.
   * Private comments may contain fields "confirmed" as false and "confirmed" as the true, while the public comments can not contain "confirmed" as false, only in the true value.
   * 
   *
   * 
   *
   * @apiHeader {String} authorization            Header determines which comments is requested (public or private).
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "authorization": "Bearer fake-jwt-token-92532-m346"
   *  }
   * 
   * 
   *
   * 
   * @apiSuccessExample {json} Public comments
   * HTTP/1.1 200 OK
   * {
   * "result": "OK",
   * "total": 35,
   * "offset": 0,
   * "limit": 20,
   * "comments": [
   *    {
   *     "id": "com31",
   *     "date": "Nov 16 2016 4:37:24 pm",
   *     "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum rerum eos deleniti corporis inventore libero vitae, adipisci qui, tenetur dolorem.",
   *     "confirmed": true,
   *     "from": {
   *        "role": "artist",
   *        "avatar": "https://ipsumimage.appspot.com/100",
   *        "username": "UserBestMyname",
   *        "firstname": "Martin",
   *        "lastname": "Pauls",
   *        "donating": null  
   *        }
   *     },
   *     {
   *      "id": "com1",
   *      "date": "Nov 16 2016 4:37:24 pm",
   *      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum rerum eos deleniti corporis inventore libero vitae, adipisci qui, tenetur dolorem.",
   *      "confirmed": true,
   *      "from":{
   *        "role": "user",
   *        "avatar": null,
   *        "username": "JustUserName",
   *        "firstname": "Nikola",
   *        "lastname": "Rojerson",
   *        "donating": 45  
   *       }
   *     },
   *     {
   *      "id": "c",
   *      "date": "Nov 16 2016 4:37:24 pm",
   *      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum rerum eos deleniti corporis inventore libero vitae, adipisci qui, tenetur dolorem.",
   *      "confirmed": true,
   *      "from":{
   *        "role": "charity",
   *        "avatar": "https://ipsumimage.appspot.com/100",
   *        "username": "CharitySimpleName",
   *        "firstname": "Andre",
   *        "lastname": "Garsias",
   *        "donating": null
   *       }
   *     }
   *   ]
   * }
   * 
   * 
   * 
   * 
   * @apiSuccessExample {json} Private comments
   * HTTP/1.1 200 OK
   * {
   * "result": "OK",
   * "total": 4,
   * "offset": 0,
   * "limit": 20,
   * "comments": [
   *    {
   *     "id": "com31",
   *     "date": "Nov 16 2016 4:37:24 pm",
   *     "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum rerum eos deleniti corporis inventore libero vitae, adipisci qui, tenetur dolorem.",
   *     "confirmed": false,
   *     "from": {
   *        "role": "artist",
   *        "avatar": "https://ipsumimage.appspot.com/100",
   *        "username": "UserBestMyname",
   *        "firstname": "Martin",
   *        "lastname": "Pauls",
   *        "donating": null
   *        }
   *     },
   *     {
   *      "id": "com1",
   *      "date": "Nov 16 2016 4:37:24 pm",
   *      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum rerum eos deleniti corporis inventore libero vitae, adipisci qui, tenetur dolorem.",
   *      "confirmed": true,
   *      "from":{
   *        "role": "user",
   *        "avatar": null,
   *        "username": "JustUserName",
   *        "firstname": "Nikola",
   *        "lastname": "Rojerson",
   *        "donating": 46
   *       }
   *     },
   *     {
   *      "id": "c5",
   *      "date": "Nov 16 2016 4:37:24 pm",
   *      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum rerum eos deleniti corporis inventore libero vitae, adipisci qui, tenetur dolorem.",
   *      "confirmed": false,
   *      "from":{
   *        "role": "charity",
   *        "avatar": "https://ipsumimage.appspot.com/100",
   *        "username": "CharitySimpleName",
   *        "firstname": "Andre",
   *        "lastname": "Garsias",
   *        "donating": null
   *       }
   *     },
   *     {
   *      "id": "com235",
   *      "date": "Nov 16 2016 4:37:24 pm",
   *      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum rerum eos deleniti corporis inventore libero vitae, adipisci qui, tenetur dolorem.",
   *      "confirmed": false,
   *      "from":{
   *        "role": "artist",
   *        "avatar": "https://ipsumimage.appspot.com/100",
   *        "username": "BestArtistMyname",
   *        "firstname": "Labore",
   *        "lastname": "Lionelly",
   *        "donating": null
   *       }
   *     }  
   *    ]
   * }
   * 
   */




  /** 
   * 
   * @apiVersion 1.0.0
   * @api {put} /api/comments/:id   Update comment
   * @apiName Update comment
   * @apiGroup Profiles comments
   * 
   *
   * @apiHeader {String} authorization            Header determines which comments is requested (public or private).
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "authorization": "Bearer fake-jwt-token-92532-m346"
   *  }
   * 
   * @apiParam {Object}         Comment        Approved comment
   * @apiParamExample {json} Request-Example:
   * {
   *  "id": "com31",
   *  "date": "Nov 16 2016 4:37:24 pm",
   *  "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum rerum eos deleniti corporis inventore libero vitae, adipisci qui, tenetur dolorem.",
   *  "confirmed": true,
   *  "from": {
   *    "role": "artist",
   *    "avatar": "https://ipsumimage.appspot.com/100",
   *    "username": "UserBestMyname",
   *    "firstname": "Martin",
   *    "lastname": "Pauls",
   *    "donating": null  
   *    }
   * },
   *
   * 
   * @apiSuccessExample {json}  Object
   * HTTP/1.1 200 OK
   * {
   * "result": "OK"
   * }
   * 
   */


  /** 
   * 
   * @apiVersion 1.0.0
   * @api {delete} /api/comments/:id   Delete comment
   * @apiName Delete comment
   * @apiGroup  Profiles comments
   * 
   *
   * @apiHeader {String} authorization            Header determines which comments is requested (public or private).
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "authorization": "Bearer fake-jwt-token-92532-m346"
   *  }
   * 
   * @apiParam {string}         id        Comment id
   *
   * 
   * @apiSuccessExample {json}  Object
   * HTTP/1.1 200 OK
   * {
   * "result": "OK"
   * }
   * 
   */

  /** 
   * 
   * @apiVersion 1.0.0
   * @api {post} /api/comments/:username   Add comment
   * @apiName Add comment
   * @apiGroup  Profiles comments
   * 
   *
   * @apiHeader {String} authorization            Header determines which comments is requested (public or private).
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "authorization": "Bearer fake-jwt-token-92532-m346"
   *  }
   * 
   * @apiParam {string}         username        For whom
   * @apiParam {Object}         body            New comment object
   * @apiParam {string}         body.text       New comment text
   * @apiParamExample {json} Request-Example:
   *  {"text": "Hello world message"}
   * 
   * @apiSuccessExample {json}  Object
   * HTTP/1.1 200 OK
   * {
   * "result": "OK",
   * "message": "Your comment has been sent"
   * }
   * 
   */