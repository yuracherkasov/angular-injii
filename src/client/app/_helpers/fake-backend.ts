import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: Http,
  useFactory: (backend: any, options: any) => {
    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
      // wrap in timeout to simulate server api call
      setTimeout(() => {
        // authenticate
        if (connection.request.url.endsWith('/api/auth/signin') && connection.request.method === RequestMethod.Post) {
          // get parameters from post request
          let params = JSON.parse(connection.request.getBody());

          let usersNew: any[] = JSON.parse(localStorage.getItem('users')) || [];
          // console.log("usersNew: ", usersNew)
          // console.log("params: ", params)
          let filteredUsers = usersNew.filter((userObj: any) => {
            return (userObj.user.username == params.username) && (userObj.password == params.password);
          });
          //  console.log("filteredUsers: ", filteredUsers)

          if (filteredUsers.length) {
            let user = filteredUsers[0];
            let avatar = user.user.avatar || "https://ipsumimage.appspot.com/100";
            connection.mockRespond(new Response(new ResponseOptions({
              status: 200,
              body: {
                "result": "OK",
                "user": {
                  "token": "fake-jwt-token",
                  "auth_via": user.user.auth_via,
                  "id": user.id || "u11",
                  "avatar": avatar,
                  "bio": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, et?",
                  "role": user.user.role,
                  "donating": null,
                  "username": user.user.username,
                  "band": "A. Smith Group",
                  "charityname": null,
                  "firstname": "Alex",
                  "lastname": user.user.lastname,
                  "email": "string",
                  "state": "Michigan",
                  "city": "Aklahoma",
                  "birth": "1900-00-00",
                  "phone": "+10055550000",
                  "zip": "123456",
                  "portfolio": [
                    { "type": "bandcamp", "link": "//bandcamp.com/qwerty", "pattern": "https://bandcamp.com/", "image": "../../assets/svg/icons/bandcamp-logo.svg" },
                    { "type": "soundcloud", "link": "https://soundcloud.com/346", "pattern": "https://soundcloud.com/", "image": "../../assets/svg/icons/soundcloud-logo.svg" },
                    { "type": "reverbnation", "link": "https://www.reverbnation.com/ghj", "pattern": "https://www.reverbnation.com/", "image": "../../assets/svg/icons/reverbnation-logo.svg" },
                    { "type": "youtube", "link": "https://www.youtube.com/jrty/g", "pattern": "https://www.youtube.com/", "image": "../../assets/svg/icons/youtube-logo.svg" },
                    { "type": "itunes", "link": "https://itunes.apple.com/", "pattern": "https://itunes.apple.com/", "image": "../../assets/svg/icons/itunes-logo.svg" }
                  ],
                  "social": [
                    { "type": "facebook", "link": "https://www.facebook.com/profile", "pattern": "https://www.facebook.com/", "image": "../../assets/svg/icons/facebook-logo-button.svg" },
                    { "type": "twitter", "link": "https://twitter.com/profile", "pattern": "https://twitter.com/", "image": "../../assets/svg/icons/twitter-logo-button.svg" },
                    { "type": "instagram", "link": "https://www.instagram.com/45", "pattern": "https://www.instagram.com/", "image": "../../assets/svg/icons/instagram-logo.svg" },
                    { "type": "google", "link": null, "pattern": "https://plus.google.com/", "image": "../../assets/svg/icons/google-plus.svg" }
                  ],
                  "manager": {
                    "name": "Peter",
                    "phone": null,
                    "email": "peter@gmail.com"
                  },
                  "booking_agent": {
                    "name": "Peter",
                    "phone": "+123456789854",
                    "email": "peter@gmail.com"
                  },
                  "homeUrl": "https://www.unicef.org/",
                  "EIN": null,
                  "donation_email": "charity@mail.com"

                }
              }
            })));
          } else {
            // else return 400 bad request
            connection.mockError(new Error('Username or password is incorrect'));
          }
        }

        //get videos by date
        if (connection.request.url.endsWith('/api/videos/?date=2017-01-04') && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body:
            {
              total: 6,
              videos: [
                {
                  "artist": {
                    "name": "John Snow",
                    "id": 1
                  },
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "Hip Hop",
                  "title": "For the Stark",
                  "viewers": 885,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": 30,
                  "startTime": "2017-01-03 03:00:00",
                  "endTime": "2017-01-04 06:00:00"
                },
                {
                  "artist": {
                    "name": "Yennefer",
                    "id": 2
                  },
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "Pop",
                  "title": "For the Geralt",
                  "viewers": 676,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": 31,
                  "startTime": "2017-01-04 06:05:00",
                  "endTime": "2017-01-04 07:00:00"
                },
                {
                  "artist": {
                    "name": "Tyrion",
                    "id": 3
                  },
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "dance",
                  "title": "Tyrion",
                  "viewers": 655,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": 32,
                  "startTime": "2017-01-04 07:05:00",
                  "endTime": "2017-01-04 07:10:00"
                },
                {
                  "artist": {
                    "name": "Jaime Lannister",
                    "id": 4
                  },
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "Jazz",
                  "title": "Jaime Lannister",
                  "viewers": 1345,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": 33,
                  "startTime": "2017-01-04 08:10:00",
                  "endTime": "2017-01-04 08:20:00"
                },
                {
                  "artist": {
                    "name": "Sansa Stark",
                    "id": 6
                  },
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "Opera",
                  "title": "Sansa Stark",
                  "viewers": 812,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": 35,
                  "startTime": "2017-01-04 09:00:00",
                  "endTime": "2017-01-04 09:50:00"
                },
                {
                  "artist": {
                    "name": "Daenerys Stormborn",
                    "id": 10
                  },
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "Opera",
                  "title": "Daenerys Stormborn",
                  "viewers": 598,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": 39,
                  "startTime": "2017-01-04 22:00:00",
                  "endTime": "2017-01-04 23:00:00"
                },
              ]
            }
          })))
        }
        if (connection.request.url.endsWith('/api/videos/?date=2017-01-05') && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body:
            {
              total: 6,
              videos: [
                {
                  "artist": {
                    "name": "Leah Goff",
                    "id": 1
                  },
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "Hip Hop",
                  "title": "Centice",
                  "viewers": 885,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": 30,
                  "startTime": "2017-01-05 04:00:00",
                  "endTime": "2017-01-05 05:00:00"
                },
                {
                  "artist": {
                    "name": "Carpenter Hardin",
                    "id": 2
                  },
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "Pop",
                  "title": "Comdom",
                  "viewers": 676,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": 31,
                  "startTime": "2017-01-05 06:05:00",
                  "endTime": "2017-01-05 07:00:00"
                },
                {
                  "artist": {
                    "name": "Obrien Paul",
                    "id": 3
                  },
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "dance",
                  "title": "Chillium",
                  "viewers": 655,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": 32,
                  "startTime": "2017-01-05 10:05:00",
                  "endTime": "2017-01-05 12:10:00"
                },
                {
                  "artist": {
                    "name": "Donovan Reilly",
                    "id": 4
                  },
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "Jazz",
                  "title": "Senmei",
                  "viewers": 1345,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": 33,
                  "startTime": "2017-01-05 13:10:00",
                  "endTime": "2017-01-05 15:20:00"
                },
                {
                  "artist": {
                    "name": "Kasey George",
                    "id": 6
                  },
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "Opera",
                  "title": "Asimiline",
                  "viewers": 812,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": 35,
                  "startTime": "2017-01-05 16:00:00",
                  "endTime": "2017-01-05 17:50:00"
                },
                {
                  "artist": {
                    "name": "Ines Duffy",
                    "id": 10
                  },
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "Opera",
                  "title": "Vixo",
                  "viewers": 598,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": 39,
                  "startTime": "2017-01-05 18:55:00",
                  "endTime": "2017-01-06 12:59:00"
                },
              ]
            }
          })))
        }
        // get users
        if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
          // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
          if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: users })));
          } else {
            // return 401 not authorised if token is null or invalid
            connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
          }
        }
        // get user by id
        if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            // find user by id in users array
            let urlParts = connection.request.url.split('/');
            let id = parseInt(urlParts[urlParts.length - 1]);
            let matchedUsers = users.filter(user => { return user.id === id; });
            let user = matchedUsers.length ? matchedUsers[0] : null;
            // respond 200 OK with user
            connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
          } else {
            // return 401 not authorised if token is null or invalid
            connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
          }
        }
        // signup user
        if (connection.request.url.endsWith('/api/auth/signup') && connection.request.method === RequestMethod.Post) {
          let newUser = JSON.parse(connection.request.getBody());
          console.log(newUser.valueOf())
          // let duplicateUser = users.filter(userObj => { return userObj.user.username === newUser.user.username; }).length;
          // if (duplicateUser) {
          //   return connection.mockError(new Error('Username "' + newUser.user.username + '" is already taken'));
          // }

          // save new user
          newUser.id = users.length + 1;
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));

          // respond 200 OK
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                status: 200,
                // body: JSON.stringify('Hello'),
                //body: newUser.user
                body: {
                  "result": "OK",
                  "message": "In a letter sent to your e-mail, click on the link to confirm your email",
                  "user": {
                    "id": 1,
                    "avatar": newUser.user.avatar,
                    "auth_via": newUser.user.auth_via,
                    "bio": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, et?",
                    "donating": null,
                    "role": newUser.user.role,
                    "username": newUser.user.username,
                    "band": "A. Smith Group",
                    "charityname": null,
                    "address": null,
                    "firstname": newUser.user.firstname,
                    "lastname": newUser.user.lastname,
                    "email": "string",
                    "state": "Michigan",
                    "city": "Aklahoma",
                    "birth": "1900-00-00",
                    "phone": "+10055550000",
                    "zip": "123456",
                    "portfolio": [
                      { "type": "bandcamp", "link": "https://bandcamp.com/qwerty", "pattern": "https://bandcamp.com/", "image": "https://injii.com/assets/svg/icons/logo.svg" },
                      { "type": "soundcloud", "link": "https://soundcloud.com/346", "pattern": "https://soundcloud.com/", "image": "https://injii.com/assets/svg/icons/logo.svg" },
                      { "type": "reverbnation", "link": "https://www.reverbnation.com/ghj", "pattern": "https://www.reverbnation.com/", "image": "https://injii.com/assets/svg/icons/logo.svg" },
                      { "type": "youtube", "link": "https://www.youtube.com/jrty/g", "pattern": "https://www.youtube.com/", "image": "https://injii.com/assets/svg/icons/logo.svg" },
                      { "type": "itunes", "link": "https://itunes.apple.com/", "pattern": "https://itunes.apple.com/", "image": "https://injii.com/assets/svg/icons/logo.svg" },
                      { "type": "soundcorps", "link": "https://soundcorps.org/profile..", "pattern": "https://soundcorps.org/", "image": "https://injii.com/assets/svg/icons/soundcorps-logo.svg" }
                    ],
                    "social": [
                      { "type": "facebook", "link": "https://www.facebook.com/profile", "pattern": "https://www.facebook.com/", "image": "../../assets/svg/icons/facebook-logo-button.svg" },
                      { "type": "twitter", "link": "https://twitter.com/profile", "pattern": "https://twitter.com/", "image": "../../assets/svg/icons/twitter-logo-button.svg" },
                      { "type": "instagram", "link": "https://www.instagram.com/45", "pattern": "https://www.instagram.com/", "image": "../../assets/svg/icons/instagram-logo.svg" },
                      { "type": "google", "link": null, "pattern": "https://plus.google.com/", "image": "../../assets/svg/icons/google-plus.svg" }
                    ],
                    "manager": {
                      "name": "Peter",
                      "phone": "+123456789854",
                      "email": "peter@gmail.com"
                    },
                    "booking_agent": {
                      "name": "Peter",
                      "phone": "+123456789854",
                      "email": "peter@gmail.com"
                    },
                    "homeUrl": "http://donation/home/url.com",
                    "EIN": null,
                    "donation_email": null
                  }
                }
              })
            )
          );
        }
        // delete user
        if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            // find user by id in users array
            let urlParts = connection.request.url.split('/');
            let id = parseInt(urlParts[urlParts.length - 1]);
            for (let i = 0; i < users.length; i++) {
              let user = users[i];
              if (user.id === id) {
                // delete user
                users.splice(i, 1);
                localStorage.setItem('users', JSON.stringify(users));
                break;
              }
            }
            // respond 200 OK
            connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
          } else {
            // return 401 not authorised if token is null or invalid
            connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
          }
        }
        //restore password
        if (connection.request.url.endsWith('/api/auth/restore') && connection.request.method === RequestMethod.Post) {
          let emailObj = JSON.parse(connection.request.getBody());
          for (let i = 0; i < users.length; i++) {
            let user = users[i].user;
            if (user.email === emailObj.email) {
              //let password = "!newpassword!";

              connection.mockRespond(
                new Response(
                  new ResponseOptions({
                    status: 200,
                    body: JSON.stringify('New password has been sent to your email'),
                  })
                )
              )
            } else if ((i == (users.length - 1)) && (user.email != emailObj.email)) {
              connection.mockRespond(
                new Response(
                  new ResponseOptions({
                    status: 401,
                    body: JSON.stringify('You entered is incorrect email, user could not be found')
                  })
                )
              )
            }
          }
        }



        //Update password
        if (connection.request.url.endsWith('/api/auth/updatepass') && connection.request.method === RequestMethod.Post) {
          let passwords = JSON.parse(connection.request.getBody());

          let qwer = connection.request.headers.get('Authorization')

          for (let i = 0; i < users.length; i++) {
            let user_oldPas = users[i].password;
            if (user_oldPas === passwords.old_password) {
              connection.mockRespond(
                new Response(
                  new ResponseOptions({
                    status: 200,
                    body: JSON.stringify("You changed password!")
                  })
                )
              )
            } else if (i == (users.length - 1)) {
              connection.mockRespond(
                new Response(
                  new ResponseOptions({
                    status: 401,
                    body: JSON.stringify("You enter incorrect password")
                  })
                )
              )
            }
          }
        }

        //update user
        if (connection.request.url.endsWith('/api/auth/update') && connection.request.method === RequestMethod.Put) {

          let params = JSON.parse(connection.request.getBody());
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: params

          })));
        }


        //get videos by user id
        if (connection.request.url.match(/\/api\/artist\/[0-9]*\/videos/) && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              videos: [
                {
                  "artist": {
                    "name": "Leah Goff",
                    "id": 1
                  },
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "Hip Hop",
                  "title": "Centice",
                  "viewers": 885,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": 30,
                  "startTime": "2016-12-31 03:00:00",
                  "endTime": "2016-12-31 06:00:00"
                },
                {
                  "artist": {
                    "name": "Carpenter Hardin",
                    "id": 2
                  },
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "Pop",
                  "title": "Comdom",
                  "viewers": 676,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": 31,
                  "startTime": "2016-12-31 06:05:00",
                  "endTime": "2016-12-31 07:00:00"
                },
                {
                  "artist": {
                    "name": "Obrien Paul",
                    "id": 3
                  },
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "dance",
                  "title": "Chillium",
                  "viewers": 655,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": 32,
                  "startTime": "2016-12-31 07:05:00",
                  "endTime": "2016-12-31 07:10:00"
                },
              ]
            }
          })));
        }

        //get videos
        if (connection.request.url.match(/\/api\/videos\/\?offset=\d+&limit=\d+&order=.*/) && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body:
            {
              total: 145,
              offset: 60,
              videos: [
                {
                  "artist": {
                    "firstname": "Leah",
                    "lastname": "Goff",
                    "username": "Constredo",
                    "id": "1"
                  },
                  "donations": 266,
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "Hip Hop",
                  "title": "Centice",
                  "viewers": 885,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": "30",
                  "charity": {
                    "id": "c1",
                    "username": "smithrock",
                    "charityname": "charity4You",
                    "firstname": "Alex",
                    "lastname": "Smith"
                  },
                  "sponsor": {
                    "id": "s1",
                    "name": "coca-cola"
                  }
                },
                {
                  "artist": {
                    "firstname": "Carpenter",
                    "lastname": "Hardin",
                    "username": "Constredo",
                    "id": "2"
                  },
                  "donations": 1253,
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "Pop",
                  "title": "Comdom",
                  "viewers": 676,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": "31",
                  "charity": {
                    "id": "c1",
                    "username": "smithrock",
                    "charityname": "charity4You",
                    "firstname": "Andre",
                    "lastname": "Sortol"
                  },
                  "sponsor": {
                    "id": "s2",
                    "name": "pepsi-cola"
                  }
                },
                {
                  "artist": {
                    "firstname": "Obrien",
                    "lastname": "Paul",
                    "username": "Constredo",
                    "id": "3"
                  },
                  "donations": 566,
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "dance",
                  "title": "Chillium",
                  "viewers": 655,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": "32",
                  "charity": {
                    "id": "c3",
                    "username": "smithrock",
                    "charityname": "charity4You",
                    "firstname": "Gredy",
                    "lastname": "Jouren"
                  },
                  "sponsor": {
                    "id": "s3",
                    "name": "brendi-cola"
                  }
                },
                {
                  "artist": {
                    "firstname": "Donovan",
                    "lastname": "Reilly",
                    "username": "Constredo",
                    "id": 4
                  },
                  "donations": 3467,
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "Jazz",
                  "title": "Senmei",
                  "viewers": 1345,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": "33",
                  "charity": {
                    "id": "c3",
                    "username": "smithrock",
                    "charityname": "charity4You",
                    "firstname": "Loef",
                    "lastname": "Wife"
                  },
                  "sponsor": {
                    "id": "s4",
                    "name": "rom-cola"
                  }
                },
                {
                  "artist": {
                    "firstname": "Kasey",
                    "lastname": "George",
                    "username": "Constredo",
                    "id": 6
                  },
                  "donations": 547,
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "Opera",
                  "title": "Asimiline",
                  "viewers": 812,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": "35",
                  "charity": {
                    "id": "c3",
                    "username": "smithrock",
                    "charityname": "charity4You",
                    "firstname": "Kolyof",
                    "lastname": "Ponek"
                  },
                  "sponsor": {
                    "id": "s5",
                    "name": "RC-cola"
                  }
                },
                {
                  "artist": {
                    "firstname": "Ines",
                    "lastname": "Duffy",
                    "username": "Constredo",
                    "id": 10
                  },
                  "donations": 574,
                  "date": "Nov 16 2016 4:37:24 pm",
                  "genre": "Opera",
                  "title": "Vixo",
                  "viewers": 598,
                  "preview": "assets/vid_thumb.jpg",
                  "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                  "id": "39",
                  "charity": {
                    "id": "c3",
                    "username": "smithrock",
                    "charityname": "charity4You",
                    "firstname": "Luhyu",
                    "lastname": "Dress"
                  },
                  "sponsor": {
                    "id": "s6",
                    "name": "light-cola"
                  }
                },
              ]
            }
          })))
        }

        //get injii video
        if (connection.request.url.endsWith('/api/videos/current') && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body:
            {
              "result": "OK",
              "video": {
                "id": "v1",
                "playlist": [
                  {
                    "file": "https://s3.amazonaws.com/chronoadvertisement/2016/579b8ff0249ca_1469812720.mp4",
                    "mediaid": "s3.amazonaws.com/chronoadvertisement/2016/579b8ff0249ca_1469812720.mp4"
                  },
                  {
                    "file": "https://s3.amazonaws.com/chronoadvertisement/2016/57a3affc27efd_1470345212.mp4",
                    "mediaid": "s3.amazonaws.com/chronoadvertisement/2016/57a3affc27efd_1470345212.mp4"
                  },
                  {
                    "file": "https://s3.amazonaws.com/chronoadvertisement/2016/57a09f91b7c72_1470144401.mp4",
                    "mediaid": "s3.amazonaws.com/chronoadvertisement/2016/57a09f91b7c72_1470144401.mp4"
                  },
                  {
                    "file": "https://s3.amazonaws.com/chronoadvertisement/2016/57b3b1df53467_1471394271.mp4",
                    "mediaid": "s3.amazonaws.com/chronoadvertisement/2016/57b3b1df53467_1471394271.mp4"
                  },
                  {
                    "file": "https://s3.amazonaws.com/chronoadvertisement/2016/579b9a6b5f303_1469815403.mp4",
                    "mediaid": "s3.amazonaws.com/chronoadvertisement/2016/579b9a6b5f303_1469815403.mp4"
                  },
                  {
                    "file": "https://s3.amazonaws.com/chronoadvertisement/2016/579b9bc2a1f98_1469815746.mp4",
                    "mediaid": "s3.amazonaws.com/chronoadvertisement/2016/579b9bc2a1f98_1469815746.mp4"
                  }
                ],
                "date": "Nov 16 2016 4:37:24 pm",
                "genre": "Hip Hop",
                "title": "Norsup",
                "viewers": 536,
                "preview": "assets/vid_thumb.jpg",
                "donations": 469,
                "injii_donations": 973,
                "top_supporters": [
                  {
                    "id": "u2",
                    "avatar": null,
                    "firstname": null,
                    "lastname": null,
                    "stars": 256,
                    "donated": 400
                  },
                  {
                    "id": "u2",
                    "avatar": "https://ipsumimage.appspot.com/100",
                    "firstname": "Joe",
                    "lastname": "Smith",
                    "stars": 356,
                    "donated": 390
                  },
                  {
                    "id": "u2",
                    "avatar": "https://ipsumimage.appspot.com/100",
                    "firstname": "Grag",
                    "lastname": "Oregful",
                    "stars": 356,
                    "donated": 280
                  }

                ],
                "charity": {
                  "id": "c1",
                  "username": "smithrock",
                  "charityname": "MrCharity",
                  "firstname": "Alex",
                  "lastname": "Smith",
                  "state": "Michigan",
                  "city": "Aklahoma",
                  "country": "USA",
                  "avatar": "https://ipsumimage.appspot.com/100",
                  "bio": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, veritatis!",
                  "donations": 455,
                  "email": "gotechtown@gmail.com",
                  "social": [
                    { "type": "facebook", "link": "https://www.facebook.com/profile", "pattern": "https://www.facebook.com/", "image": "../../assets/svg/icons/facebook-logo-button.svg" },
                    { "type": "twitter", "link": "https://twitter.com/profile", "pattern": "https://twitter.com/", "image": "../../assets/svg/icons/twitter-logo-button.svg" },
                    { "type": "instagram", "link": "https://www.instagram.com/45", "pattern": "https://www.instagram.com/", "image": "../../assets/svg/icons/instagram-logo.svg" },
                    { "type": "google", "link": null, "pattern": "https://plus.google.com/", "image": "../../assets/svg/icons/google-plus.svg" }
                  ],
                  "top_supporters": [
                    {
                      "id": "u2",
                      "avatar": "https://ipsumimage.appspot.com/100",
                      "firstname": "Apls",
                      "lastname": "Uitjer",
                      "stars": 356,
                      "donated": 560
                    },
                    {
                      "id": "u2",
                      "avatar": "https://ipsumimage.appspot.com/100",
                      "firstname": "Goran",
                      "lastname": "Swift",
                      "stars": 356,
                      "donated": 458
                    },
                    {
                      "id": "u2",
                      "avatar": null,
                      "firstname": null,
                      "lastname": null,
                      "stars": 256,
                      "donated": 400
                    }
                  ]
                },
                "artist": {
                  "id": "a1",
                  "username": "smithrock",
                  "rating": 6,
                  "band": "A. Smith Group",
                  "firstname": "Alex",
                  "lastname": "Smith",
                  "state": "Michigan",
                  "city": "Aklahoma",
                  "birth": "1900-00-00",
                  "phone": "+10055550000",
                  "country": "USA",
                  "avatar": "https://ipsumimage.appspot.com/100",
                  "bio": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, veritatis!",
                  "genre": "pop",
                  "stars": 654,
                  "stats": {
                    "donations": 455,
                    "injii_donations": 973
                  },
                  "portfolio": [
                    { "type": "bandcamp", "link": "//bandcamp.com/qwerty", "pattern": "https://bandcamp.com/", "image": "../../assets/svg/icons/bandcamp-logo.svg" },
                    { "type": "soundcloud", "link": "https://soundcloud.com/346", "pattern": "https://soundcloud.com/", "image": "../../assets/svg/icons/soundcloud-logo.svg" },
                    { "type": "reverbnation", "link": "https://www.reverbnation.com/ghj", "pattern": "https://www.reverbnation.com/", "image": "../../assets/svg/icons/reverbnation-logo.svg" },
                    { "type": "youtube", "link": "https://www.youtube.com/jrty/g", "pattern": "https://www.youtube.com/", "image": "../../assets/svg/icons/youtube-logo.svg" },
                    { "type": "itunes", "link": "https://itunes.apple.com/", "pattern": "https://itunes.apple.com/", "image": "../../assets/svg/icons/itunes-logo.svg" }
                  ],
                  "social": [
                    { "type": "facebook", "link": "https://www.facebook.com/profile", "pattern": "https://www.facebook.com/", "image": "../../assets/svg/icons/facebook-logo-button.svg" },
                    { "type": "twitter", "link": "https://twitter.com/profile", "pattern": "https://twitter.com/", "image": "../../assets/svg/icons/twitter-logo-button.svg" },
                    { "type": "instagram", "link": "https://www.instagram.com/45", "pattern": "https://www.instagram.com/", "image": "../../assets/svg/icons/instagram-logo.svg" },
                    { "type": "google", "link": null, "pattern": "https://plus.google.com/", "image": "../../assets/svg/icons/google-plus.svg" }
                  ],
                }
              }
            }
          })))
        };

        if (connection.request.url.endsWith('/api/charities') && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body:
            {
              "result": "OK",
              "data": [
                { "title": 'Charity#1', "id": 1 },
                { "title": 'Charity#2', "id": 2 },
                { "title": 'Charity#3', "id": 3 },
                { "title": 'Charity#4', "id": 4 }
              ]
            }
          })))
        };

        if (connection.request.url.endsWith('/api/max-video-duration') && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body:
            {
              "result": "OK",
              "data": {
                "duration": 300
              }
            }
          })))
        };

        //get video by id
        if (connection.request.url.match(/\/api\/videos\/\d+$/) && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body:
            {
              "result": "OK",
              "video": {
                "id": "v34",
                "playlist": [
                  {
                    "file": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4",
                    "mediaid": "d2klya0a52nzxz.cloudfront.net/2016/08/18/hls1080k/01c00381b6727394701e731761f37f6838cbc767aa68d5d46abac4157ac6e791.mp4"
                  }
                ],
                "date": "Nov 16 2016 4:37:24 pm",
                "genre": "Bluze",
                "title": "Alilua",
                "viewers": 848,
                "preview": "assets/vid_thumb.jpg",
                "donations": 4945,
                "injii_donations": 356,
                "top_supporters": [
                  {
                    "id": "u2",
                    "avatar": null,
                    "firstname": null,
                    "lastname": null,
                    "stars": 256,
                    "donated": 400
                  },
                  {
                    "id": "u2",
                    "avatar": "https://ipsumimage.appspot.com/100",
                    "firstname": "Joe",
                    "lastname": "Smith",
                    "stars": 356,
                    "donated": 390
                  },
                  {
                    "id": "u2",
                    "avatar": "https://ipsumimage.appspot.com/100",
                    "firstname": "Grag",
                    "lastname": "Oregful",
                    "stars": 356,
                    "donated": 280
                  }

                ],
                "charity": {
                  "id": "c1",
                  "username": "labore",
                  "charityname": "MrcharityName",
                  "firstname": "Will",
                  "lastname": "Willis",
                  "state": "NY",
                  "city": "Aklahoma",
                  "country": "Germaby",
                  "avatar": "https://ipsumimage.appspot.com/100",
                  "bio": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, veritatis!",
                  "donations": 477,
                  "homeUrl": null,
                  "EIN": null,
                  "email": "gotechto@gmail.com",
                  "social": [
                    { "type": "facebook", "link": "https://www.facebook.com/profile", "pattern": "https://www.facebook.com/", "image": "../../assets/svg/icons/facebook-logo-button.svg" },
                    { "type": "twitter", "link": "https://twitter.com/profile", "pattern": "https://twitter.com/", "image": "../../assets/svg/icons/twitter-logo-button.svg" },
                    { "type": "instagram", "link": "https://www.instagram.com/45", "pattern": "https://www.instagram.com/", "image": "../../assets/svg/icons/instagram-logo.svg" },
                    { "type": "google", "link": null, "pattern": "https://plus.google.com/", "image": "../../assets/svg/icons/google-plus.svg" }
                  ],
                  "top_supporters": [
                    {
                      "id": "u2",
                      "avatar": "https://ipsumimage.appspot.com/100",
                      "firstname": "Apls",
                      "lastname": "Uitjer",
                      "stars": 356,
                      "donated": 560
                    },
                    {
                      "id": "u2",
                      "avatar": "https://ipsumimage.appspot.com/100",
                      "firstname": "Goran",
                      "lastname": "Swift",
                      "stars": 356,
                      "donated": 458
                    },
                    {
                      "id": "u2",
                      "avatar": null,
                      "firstname": null,
                      "lastname": null,
                      "stars": 256,
                      "donated": 400
                    }
                  ]
                },
                "artist": {
                  "id": "a1",
                  "username": "willBallads",
                  "rating": 6,
                  "band": "WilGroup",
                  "firstname": "Jason",
                  "lastname": "Ommond",
                  "state": "Alaska",
                  "city": "Sidney",
                  "birth": "1900-00-00",
                  "phone": "+10055550000",
                  "country": "Australia",
                  "avatar": "https://ipsumimage.appspot.com/100",
                  "bio": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, veritatis! Ipsum dolor sit amet, consectetur adipisicing elit",
                  "genre": "rock",
                  "stars": 547,
                  "stats": {
                    "donations": 6789,
                    "injii_donations": 567
                  },
                  "portfolio": [
                    { "type": "bandcamp", "link": "//bandcamp.com/qwerty", "pattern": "https://bandcamp.com/", "image": "../../assets/svg/icons/bandcamp-logo.svg" },
                    { "type": "soundcloud", "link": "https://soundcloud.com/346", "pattern": "https://soundcloud.com/", "image": "../../assets/svg/icons/soundcloud-logo.svg" },
                    { "type": "reverbnation", "link": "https://www.reverbnation.com/ghj", "pattern": "https://www.reverbnation.com/", "image": "../../assets/svg/icons/reverbnation-logo.svg" },
                    { "type": "youtube", "link": "https://www.youtube.com/jrty/g", "pattern": "https://www.youtube.com/", "image": "../../assets/svg/icons/youtube-logo.svg" },
                    { "type": "itunes", "link": "https://itunes.apple.com/", "pattern": "https://itunes.apple.com/", "image": "../../assets/svg/icons/itunes-logo.svg" }
                  ],
                  "social": [
                    { "type": "facebook", "link": "https://www.facebook.com/profile", "pattern": "https://www.facebook.com/", "image": "../../assets/svg/icons/facebook-logo-button.svg" },
                    { "type": "twitter", "link": "https://twitter.com/profile", "pattern": "https://twitter.com/", "image": "../../assets/svg/icons/twitter-logo-button.svg" },
                    { "type": "instagram", "link": "https://www.instagram.com/45", "pattern": "https://www.instagram.com/", "image": "../../assets/svg/icons/instagram-logo.svg" },
                    { "type": "google", "link": null, "pattern": "https://plus.google.com/", "image": "../../assets/svg/icons/google-plus.svg" }
                  ],
                }
              }
            }
          })))
        };

        //get artists
        if (connection.request.url.match(/\/api\/artistsFake.*/) && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body:
            {
              artists: [
                {
                  "id": 1,
                  "avatar": null,
                  "bio": "Veniam amet deserunt dolore labore culpa tempor nulla. Irure aute exercitation sit eiusmod laborum laborum deserunt dolore eu nostrud in nostrud tempor. Cupidatat culpa incididunt nostrud deserunt excepteur sit occaecat nisi laboris consequat mollit adipisicing. Anim ipsum magna pariatur aute tempor veniam culpa non sint proident. Aute ex dolor dolore nostrud. Sunt aliqua culpa velit mollit.\r\n",
                  "registered": "2014-11-04T07:20:28 -03:00",
                  "genre": "Hip Hop",
                  "band": "A. Smith Group",
                  "username": "labore",
                  "firstname": "Shirley",
                  "lastname": "Santos",
                  "birth": "1900-00-00",
                  "city": "Wheatfields",
                  "state": "Wisconsin",
                  "stars": 128,
                  donation: 325
                },
                {
                  "id": 2,
                  "avatar": "https://ipsumimage.appspot.com/100",
                  "bio": "In fugiat veniam incididunt elit adipisicing qui deserunt pariatur id aute consequat ipsum. Ad nulla mollit proident duis sint adipisicing ipsum cupidatat. Aliqua consectetur est amet reprehenderit duis ullamco eiusmod. Eu amet consequat pariatur amet laborum labore amet. Lorem sint consequat mollit eiusmod laboris dolor magna culpa anim sint.\r\n",
                  "registered": "2015-10-03T09:46:42 -03:00",
                  "genre": "dance",
                  "band": "A. Smith Group",
                  "username": "sint",
                  "firstname": "Nichole",
                  "lastname": "Merrill",
                  "birth": "1900-00-00",
                  "city": "Klagetoh",
                  "state": "Pennsylvania",
                  "stars": 582,
                  donation: 568
                },
                {
                  "id": 3,
                  "avatar": "https://ipsumimage.appspot.com/100",
                  "bio": "Irure irure incididunt anim culpa. Consequat id reprehenderit magna ex aliquip consectetur Lorem. Reprehenderit amet dolore irure eiusmod. Deserunt consectetur nulla consectetur cupidatat voluptate eu excepteur pariatur.\r\n",
                  "registered": "2014-08-19T01:55:53 -03:00",
                  "genre": "dance",
                  "band": "A. Smith Group",
                  "username": "fugiat",
                  "firstname": "Camille",
                  "lastname": "Richardson",
                  "birth": "1900-00-00",
                  "city": "Succasunna",
                  "state": "Montana",
                  "stars": 413,
                  donation: 356
                },
                {
                  "id": 4,
                  "avatar": "https://ipsumimage.appspot.com/100",
                  "bio": "Dolor ullamco enim elit elit incididunt dolor labore laboris esse. Laborum magna aute voluptate reprehenderit. Cupidatat consectetur aliqua aliquip esse consequat minim sit dolore deserunt ut.\r\n",
                  "registered": "2015-08-30T09:28:00 -03:00",
                  "genre": "Hip Hop",
                  "band": "A. Smith Group",
                  "username": "pariatur",
                  "firstname": "Kelly",
                  "lastname": "Santiago",
                  "birth": "1900-00-00",
                  "city": "Duryea",
                  "state": "Louisiana",
                  "stars": 437,
                  donation: 904
                },
                {
                  "id": 5,
                  "avatar": null,
                  "bio": "Pariatur aliquip aute exercitation aute pariatur elit qui dolor culpa. Sunt ipsum fugiat fugiat irure aliquip cupidatat. Dolor laboris pariatur excepteur tempor culpa reprehenderit commodo officia. Labore ex consequat amet sit aliqua aute officia esse. Lorem esse nulla excepteur culpa culpa irure exercitation laborum ea cupidatat. Eu adipisicing est veniam ea nostrud duis mollit deserunt. Anim aliquip laboris ut esse.\r\n",
                  "registered": "2015-09-20T10:37:26 -03:00",
                  "genre": "Opera",
                  "band": "A. Smith Group",
                  "username": "sint",
                  "firstname": "Lesley",
                  "lastname": "Montoya",
                  "birth": "1900-00-00",
                  "city": "Stockdale",
                  "state": "Indiana",
                  "stars": 684,
                  donation: 325
                },
                {
                  "id": 6,
                  "avatar": "https://ipsumimage.appspot.com/100",
                  "bio": "Dolore nisi eu ut labore proident. Et labore culpa ad pariatur. Incididunt consectetur culpa consectetur eu fugiat consequat tempor proident aliquip nisi esse fugiat.\r\n",
                  "registered": "2015-07-08T03:16:04 -03:00",
                  "genre": "Opera",
                  "band": "A. Smith Group",
                  "username": "occaecat",
                  "firstname": "Jacobs",
                  "lastname": "Holman",
                  "birth": "1900-00-00",
                  "city": "Bladensburg",
                  "state": "New Mexico",
                  "stars": 61,
                  donation: 267
                },
                {
                  "id": 7,
                  "avatar": null,
                  "bio": "Aute anim dolore aliquip aute enim consequat eu elit nulla do id nulla. Nostrud adipisicing anim aute est ullamco deserunt deserunt. Laboris magna consectetur sit in. Nostrud ipsum non incididunt Lorem. Do labore mollit ut laborum est qui mollit quis elit non sit.\r\n",
                  "registered": "2014-01-27T07:53:06 -03:00",
                  "genre": "Hip Hop",
                  "band": "A. Smith Group",
                  "username": "sint",
                  "firstname": "Wanda",
                  "lastname": "Gilbert",
                  "birth": "1900-00-00",
                  "city": "Kapowsin",
                  "state": "Missouri",
                  "stars": 550,
                  donation: 196
                },
                {
                  "id": 8,
                  "avatar": "https://ipsumimage.appspot.com/100",
                  "bio": "Tempor non irure ad ex enim proident cillum cupidatat in. Dolore proident esse non enim. Magna adipisicing cillum sunt dolor consectetur. Qui velit fugiat velit enim. Commodo qui magna tempor enim quis elit cillum Lorem.\r\n",
                  "registered": "2014-05-02T03:13:31 -03:00",
                  "genre": "Electronic",
                  "band": "A. Smith Group",
                  "username": "aliqua",
                  "firstname": "Salazar",
                  "lastname": "Mclean",
                  "birth": "1900-00-00",
                  "city": "Tolu",
                  "state": "Texas",
                  "stars": 611,
                  donation: 334
                },
                {
                  "id": 9,
                  "avatar": null,
                  "bio": "Duis Lorem occaecat incididunt cupidatat mollit incididunt amet nulla id minim tempor adipisicing. Anim nostrud fugiat non pariatur incididunt. Cupidatat sit dolore nisi et quis. Non cupidatat sit amet labore eiusmod anim quis. Consectetur magna cillum reprehenderit veniam enim excepteur nostrud ipsum eu incididunt adipisicing consequat minim pariatur.\r\n",
                  "registered": "2014-11-05T11:00:56 -03:00",
                  "genre": "Pop",
                  "band": "A. Smith Group",
                  "username": "dolore",
                  "firstname": "Jacobson",
                  "lastname": "Malone",
                  "birth": "1900-00-00",
                  "city": "Orason",
                  "state": "Marshall Islands",
                  "stars": 724,
                  donation: 573
                },
                {
                  "id": 10,
                  "avatar": null,
                  "bio": "Nostrud enim elit consectetur non irure elit dolor. Ullamco magna culpa excepteur officia enim amet. Ipsum Lorem cillum cupidatat pariatur excepteur aliquip quis culpa reprehenderit Lorem amet eiusmod consectetur proident. Quis quis qui enim et non. Velit dolore enim sunt magna excepteur aliquip eiusmod in irure sint exercitation aute veniam.\r\n",
                  "registered": "2016-08-21T06:23:32 -03:00",
                  "genre": "Hip Hop",
                  "band": "A. Smith Group",
                  "username": "quis",
                  "firstname": "Sharron",
                  "lastname": "Bond",
                  "birth": "1900-00-00",
                  "city": "Cornfields",
                  "state": "California",
                  "stars": 635,
                  donation: 325
                },
                {
                  "id": 11,
                  "avatar": "https://ipsumimage.appspot.com/100",
                  "bio": "Quis laborum cupidatat tempor esse. Do voluptate sunt Lorem id culpa magna nostrud. Id reprehenderit labore fugiat sunt fugiat id sunt exercitation nostrud anim laborum mollit. Cupidatat veniam duis incididunt dolore eiusmod elit dolor do consectetur pariatur anim commodo. Amet reprehenderit elit excepteur aute in.\r\n",
                  "registered": "2015-09-21T12:55:08 -03:00",
                  "genre": "Rock",
                  "band": "A. Smith Group",
                  "username": "laboris",
                  "firstname": "Diane",
                  "lastname": "Albert",
                  "birth": "1900-00-00",
                  "city": "Newcastle",
                  "state": "Massachusetts",
                  "stars": 655,
                  donation: 9586
                }
              ]
            }
          })))
        };

        //get comments
        if (connection.request.url.match(/\/api\/comments\/.*/) && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              "result": "OK",
              "total": 36,
              "limit": 10,
              "offset": 0,
              "comments": [
                {
                  "id": "com31",
                  "date": "Nov 16 2016 4:37:24 pm",
                  "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum rerum eos deleniti corporis inventore libero vitae, adipisci qui, tenetur dolorem.",
                  "confirmed": false,
                  "from": {
                    "role": "artist",
                    "avatar": "https://ipsumimage.appspot.com/100",
                    "username": "UserBestMyname",
                    "firstname": "Dartinge",
                    "lastname": "Pangrera",
                    "donating": null,
                  }
                },
                {
                  "id": "com1",
                  "date": "Nov 16 2016 4:37:24 pm",
                  "text": "Lorem ipsum dolor. Eum rerum eos deleniti corporis inventore libero vitae sit amet, consectetur adipisicing elit. Eum rerum eos deleniti corporis inventore libero vitae, adipisci qui, tenetur dolorem.",
                  "confirmed": false,
                  "from": {
                    "role": "user",
                    "avatar": null,
                    "username": "JustUserName",
                    "firstname": "Nikola",
                    "lastname": "Rojerson",
                    "donating": 23,
                  }
                },
                {
                  "id": "c5",
                  "date": "Nov 16 2016 4:37:24 pm",
                  "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum rerum eos deleniti corporis inventore libero vitae, adipisci qui, tenetur dolorem.",
                  "confirmed": false,
                  "from": {
                    "role": "charity",
                    "avatar": "https://ipsumimage.appspot.com/100",
                    "username": "CharitySimpleName",
                    "firstname": "Andre",
                    "lastname": "Garsias",
                    "donating": null,
                  }
                },
                {
                  "id": "com235",
                  "date": "Nov 16 2016 4:37:24 pm",
                  "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum rerum eos deleniti corporis inventore libero vitae. Eum rerum eos deleniti corporis inventore libero vitae, adipisci qui, tenetur dolorem.",
                  "confirmed": false,
                  "from": {
                    "role": "user",
                    "avatar": "https://ipsumimage.appspot.com/100",
                    "username": "BestArtistMyname",
                    "firstname": "Labore",
                    "lastname": "Lionelly",
                    "donating": null
                  }
                },
                {
                  "id": "com31",
                  "date": "Nov 16 2016 4:37:24 pm",
                  "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum rerum eos deleniti corporis inventore libero vitae, adipisci qui, tenetur dolorem.",
                  "confirmed": true,
                  "from": {
                    "role": "artist",
                    "avatar": "https://ipsumimage.appspot.com/100",
                    "username": "BestArtistMyname",
                    "firstname": "Martin",
                    "lastname": "Baster",
                    "donating": null,
                  }
                },
                {
                  "id": "com1",
                  "date": "Nov 16 2016 4:37:24 pm",
                  "text": "Lorem ipsum dolor. Eum rerum eos deleniti corporis inventore libero vitae sit amet, consectetur adipisicing elit. Eum rerum eos deleniti corporis inventore libero vitae, adipisci qui, tenetur dolorem.",
                  "confirmed": true,
                  "from": {
                    "role": "user",
                    "avatar": null,
                    "username": "JustUserName",
                    "firstname": "Nikola",
                    "lastname": "Rojerson",
                    "donating": 23,
                  }
                },
                {
                  "id": "c5",
                  "date": "Nov 16 2016 4:37:24 pm",
                  "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum rerum eos deleniti corporis inventore libero vitae, adipisci qui, tenetur dolorem.",
                  "confirmed": true,
                  "from": {
                    "role": "charity",
                    "avatar": "https://ipsumimage.appspot.com/100",
                    "username": "CharitySimpleName",
                    "firstname": "Andre",
                    "lastname": "Garsias",
                    "donating": null,
                  }
                }
              ]
            }

          })))
        };


        //put, delete comments
        if (connection.request.url.match(/\/api\/comments\/.*/) && (connection.request.method === RequestMethod.Post || connection.request.method === RequestMethod.Put || connection.request.method === RequestMethod.Delete)) {
          let charityData = JSON.parse(connection.request.getBody());
          console.log("Fakebackend request body ", charityData)
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              "result": "OK",
              "message": "Your comment has been sent"
            }
          })))
        };

        //get artist
        if (connection.request.url.match(/\/api\/artist\/.*/) && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              "result": "OK",
              "artist": {
                "id": 11,
                "avatar": "https://ipsumimage.appspot.com/100",
                "contest": true,
                "bio": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, et?",
                "role": "artist",
                "age": 27,
                "username": "user321name",
                "band": "A. Smith Group",
                "charityname": "CharityName",
                "address": "350 fifth Avenue, 34th floor. New York, NY 10118-3299 USA",
                "firstname": "Alex",
                "lastname": "Jackson",
                "email": "string@mail.com",
                "state": "Michigan",
                "city": "Aklahoma",
                "birth": "1900-00-00",
                "genre": "rock",
                "phone": "+10055550000",
                "zip": "123456",
                "portfolio": [
                  { "type": "bandcamp", "link": "//bandcamp.com/qwerty", "pattern": "https://bandcamp.com/", "image": "../../assets/svg/icons/bandcamp-logo.svg" },
                  { "type": "soundcloud", "link": "https://soundcloud.com/346", "pattern": "https://soundcloud.com/", "image": "../../assets/svg/icons/soundcloud-logo.svg" },
                  { "type": "reverbnation", "link": "https://www.reverbnation.com/ghj", "pattern": "https://www.reverbnation.com/", "image": "../../assets/svg/icons/reverbnation-logo.svg" },
                  { "type": "youtube", "link": "https://www.youtube.com/jrty/g", "pattern": "https://www.youtube.com/", "image": "../../assets/svg/icons/youtube-logo.svg" },
                  { "type": "itunes", "link": "https://itunes.apple.com/", "pattern": "https://itunes.apple.com/", "image": "../../assets/svg/icons/itunes-logo.svg" }
                ],
                "social": [
                  { "type": "facebook", "link": "https://www.facebook.com/profile", "pattern": "https://www.facebook.com/", "image": "../../assets/svg/icons/facebook-logo-button.svg" },
                  { "type": "twitter", "link": "https://twitter.com/profile", "pattern": "https://twitter.com/", "image": "../../assets/svg/icons/twitter-logo-button.svg" },
                  { "type": "instagram", "link": "https://www.instagram.com/45", "pattern": "https://www.instagram.com/", "image": "../../assets/svg/icons/instagram-logo.svg" },
                  { "type": "google", "link": null, "pattern": "https://plus.google.com/", "image": "../../assets/svg/icons/google-plus.svg" }
                ],
                "manager": {
                  "name": "Peter",
                  "phone": null,
                  "email": "peter@gmail.com"
                },
                "booking_agent": {
                  "name": "Peter",
                  "phone": "+123456789854",
                  "email": "peter@gmail.com"
                },
                "charity": {
                  "id": "c1",
                  "username": "smithrockCharity",
                  "charityname": "A. Smith Donate",
                  "firstname": "Alexandr",
                  "lastname": "Hougway",
                  "email": "charity@mail.com",
                },
                "videos": [
                  {
                    "date": "Nov 16 2016 4:37:24 pm",
                    "title": "Norsup",
                    "viewers": 536,
                    "preview": "assets/vid_thumb.jpg",
                    "src": "https://d2klya0a52nzxz.cloudfront.net/2016/08/18/.mp4",
                    "donations": 346,
                    "id": "1",
                    "charity": {
                      "id": "c23"
                    }
                  }
                ],
                "rating": 6,
                "homeUrl": "http://donation/home/url.com",
                "EIN": "12-3456789",
                "donation_email": "donate@email.com"
              }
            }
          })))
        };




        //get articles for apprise page
        if (connection.request.url.match(/\/api\/apprise\/\?offset=\d+&limit=\d+/) && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              "result": "OK",
              "total": 145,
              "offset": 60,
              "articles": [
                {
                  "id": "587f504048fa470f1bb42f21",
                  "title": "Meagan sint",
                  "autor": "Marla Conrad",
                  "thumbnail": "assets/thumb-place.jpg",
                  "date": "25.09.2016 16:54",
                  "description": "Do ut aliqua adipisicing eu tempor ullamco tempor ullamco non reprehenderit ullamco sint. Ipsum cupidatat minim magna nisi adipisicing occaecat est mollit minim dolor consectetur. Labore eiusmod ullamco adipisicing aliquip. Nisi quis veniam sint in ipsum labore. Veniam esse in sint ut reprehenderit laboris esse consectetur labore non sit cupidatat. Dolore aliqua in tempor sunt aliqua voluptate est nisi aliqua adipisicing. Reprehenderit est ex non ea ullamco ut.\r\n",
                  "url": "http://www.thegigtank.com/teams"
                },
                {
                  "id": "587f50407068d5a0a5b252a6",
                  "title": "Liliana irure",
                  "autor": "Fern Black",
                  "thumbnail": "assets/vid_thumb.jpg",
                  "date": "25.09.2016 16:54",
                  "description": "Aliqua magna exercitation ipsum irure consequat ea et laboris. Nisi ad in officia veniam est sint pariatur. Sit esse officia cillum commodo anim dolore aliquip cillum.\r\n",
                  "url": "http://wutc.org/post/start-it-episode-74-startup-injii-supports-charities-and-musicians#stream/"
                },
                {
                  "id": "587f504070d3cb903f872409",
                  "title": "Hahn velit",
                  "autor": "Allie Lewis",
                  "thumbnail": "assets/thumb-place.jpg",
                  "date": "25.09.2016 16:54",
                  "description": "Cillum irure culpa reprehenderit ea qui non ad aliquip consectetur. Dolor ex reprehenderit veniam culpa nisi. Ut aute cupidatat excepteur velit anim. Non velit magna nulla culpa nisi do proident tempor cupidatat anim non quis consectetur sunt. Veniam sit laboris magna cupidatat.\r\n",
                  "url": "http://newschannel9.com/features/making-history/gig-tank-365-is-turning-ideas-into-businesses"
                },
                {
                  "id": "587f5040608c966d52b17e07",
                  "title": "Rosella consequat",
                  "autor": "Pearson Dale",
                  "thumbnail": "assets/vid_thumb.jpg",
                  "date": "25.09.2016 16:54",
                  "description": "Nulla ipsum nulla voluptate adipisicing officia. Culpa minim aliquip dolore ad ea et incididunt occaecat est laboris deserunt tempor esse cupidatat. Incididunt sunt cillum minim excepteur. Amet sit incididunt fugiat ut aute Lorem. Velit aliquip mollit pariatur consectetur cillum minim elit officia dolore eiusmod. Officia adipisicing amet ullamco ad Lorem velit ex anim.\r\n",
                  "url": "http://www.teknovation.biz/2016/07/25/gigtank-365-participant-injii-helps-aspiring-artists-social/"
                },
                {
                  "id": "587f5040688db5e89f8ab998",
                  "title": "Valeria ullamco",
                  "autor": "Lori Hardy",
                  "thumbnail": "assets/thumb-place.jpg",
                  "date": "25.09.2016 16:54",
                  "description": "Culpa minim fugiat non sit adipisicing et esse voluptate adipisicing ex et commodo veniam laboris. Sunt labore irure tempor aliquip fugiat qui consequat reprehenderit. Voluptate excepteur proident in ex fugiat cillum aliquip commodo irure mollit aute amet tempor.\r\n",
                  "url": "http://wutc.org/post/start-it-episode-74-startup-injii-supports-charities-and-musicians#stream/"
                },
                {
                  "id": "587f50406766ee925c2190aa",
                  "title": "Hickman nisi",
                  "autor": "Milagros Mckee",
                  "thumbnail": "assets/vid_thumb.jpg",
                  "date": "25.09.2016 16:54",
                  "description": "In deserunt reprehenderit nostrud eu labore. Aliquip officia aliquip tempor consequat. Id ullamco enim eu non culpa pariatur non.\r\n",
                  "url": "http://www.thegigtank.com/teams"
                }]
            }
          })))
        };

        //Charity for donate /api/checkout/?amount=
        if (connection.request.url.match(/\/api\/checkout\/\?amount=.*/) && connection.request.method === RequestMethod.Get) {
          let charityData = JSON.parse(connection.request.getBody());
          //console.log(charityData)
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              "result": "OK",
              "checkout_id": "checkout_id",
              "checkout_uri": "checkout_uri"
            }
          })))
        };

        //10 star rating system
        if (connection.request.url.match(/\/api\/artist\/.*\/vote/) && connection.request.method === RequestMethod.Put) {
          let charityData = JSON.parse(connection.request.getBody());
          //console.log(charityData)
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              "message": "Your vote is accepted, thank you for your participation",
              "result": "OK",
              "artist": {
                "id": "a2",
                "rating": 8
              }
            }
          })))
        };

        //get contest
        if (connection.request.url.endsWith('/api/contest/current') && connection.request.method === RequestMethod.Get) {
          //let charityData = JSON.parse(connection.request.getBody());
          //console.log(charityData)
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              "result": "OK",
              "title": "Phenomenal performances with sexy choreography and powerhouse vocals…",
              "description": "Blew us away… trust us when we say it will be one of the best night’s out you’ll ever have…. so much better than the real thing.",
              "end": "03/07/2017 12pm",
              "prise": 200,
              "artists": [
                {
                  "id": "5899c4a9442da8154911aa24",
                  "firstname": "Mabel",
                  "lastname": "Pacheco",
                  "username": "urris",
                  "avatar": "assets/avatar.png",
                  "votes": 80,
                  "status": null,
                  "video": {
                    "id": "5899",
                    "title": "Aida culpa",
                    "thumbnail": "assets/vid_thumb.jpg"
                  }
                },
                {
                  "id": "5899c4a9d705bb8196d8489d",
                  "firstname": "Jenkins",
                  "lastname": "Avila",
                  "username": "ummers",
                  "avatar": "assets/avatar.png",
                  "votes": 59,
                  "status": null,
                  "video": {
                    "id": "58611",
                    "title": "Sargent deserunt",
                    "thumbnail": "assets/vid_thumb.jpg"
                  }
                },
                {
                  "id": "5899c4a9cc4efae570cd172f",
                  "firstname": "Pat",
                  "lastname": "Vargas",
                  "username": "olden",
                  "avatar": "assets/avatar.png",
                  "votes": 73,
                  "status": null,
                  "video": {
                    "id": "5899873",
                    "title": "Collins cupidatat",
                    "thumbnail": "assets/vid_thumb.jpg"
                  }
                },
                {
                  "id": "5899c4a92b8efa6b9773ab5e",
                  "firstname": "Mclaughlin",
                  "lastname": "Howell",
                  "username": "lover",
                  "avatar": "assets/avatar.png",
                  "votes": 79,
                  "status": "favorite",
                  "video": {
                    "id": "589640",
                    "title": "Nielsen qui",
                    "thumbnail": "assets/vid_thumb.jpg"
                  }
                },
                {
                  "id": "5899c4a99c1b5978fba4d0c1",
                  "firstname": "Angela",
                  "lastname": "Odonnell",
                  "username": "ichegrty",
                  "avatar": "assets/avatar.png",
                  "votes": 71,
                  "status": null,
                  "video": {
                    "id": "588496",
                    "title": "Wendi non",
                    "thumbnail": "assets/vid_thumb.jpg"
                  }
                },
                {
                  "id": "5899c4a9355b133486adc7bd",
                  "firstname": "Mae",
                  "lastname": "Dennis",
                  "username": "fartin",
                  "avatar": "assets/avatar.png",
                  "votes": 22,
                  "status": null,
                  "video": {
                    "id": "58989563",
                    "title": "Willa aute",
                    "thumbnail": "assets/vid_thumb.jpg"
                  }
                },
                {
                  "id": "5899c4a98b769ee2416ca85d",
                  "firstname": "Althea",
                  "lastname": "Hatfield",
                  "username": "bowman",
                  "avatar": "assets/avatar.png",
                  "votes": 90,
                  "status": "leader",
                  "video": {
                    "id": "5317",
                    "title": "Terra elit",
                    "thumbnail": "assets/vid_thumb.jpg"
                  }
                },
                {
                  "id": "5899c4a914193b44fd36b0d5",
                  "firstname": "Vaughan",
                  "lastname": "Slater",
                  "username": "porter",
                  "avatar": "assets/avatar.png",
                  "votes": 64,
                  "status": null,
                  "video": {
                    "id": "58996789",
                    "title": "Robert ullamco",
                    "thumbnail": "assets/vid_thumb.jpg"
                  }
                },
                {
                  "id": "5899c4a9de51939998cb181f",
                  "firstname": "Travis",
                  "lastname": "Fuller",
                  "username": "Pruitt",
                  "avatar": "assets/avatar.png",
                  "votes": 4,
                  "status": null,
                  "video": {
                    "id": "589967872",
                    "title": "Nicholson et",
                    "thumbnail": "assets/vid_thumb.jpg"
                  }
                },
                {
                  "id": "5899c4a91c0e2e1ce20ff16b",
                  "firstname": "Arlene",
                  "lastname": "Park",
                  "username": "Gilliam",
                  "avatar": "assets/avatar.png",
                  "votes": 7,
                  "status": null,
                  "video": {
                    "id": "589946783",
                    "title": "Pam irure",
                    "thumbnail": "assets/vid_thumb.jpg"
                  }
                },
                {
                  "id": "5899c4a99a1d198a7fd60fbc",
                  "firstname": "Nona",
                  "lastname": "Jacobson",
                  "username": "Cochran",
                  "avatar": "assets/avatar.png",
                  "votes": 60,
                  "status": null,
                  "video": {
                    "id": "58976488",
                    "title": "Marisa labore",
                    "thumbnail": "assets/vid_thumb.jpg"
                  }
                },
                {
                  "id": "5899c4a9f85a5b4e066861f9",
                  "firstname": "Hobbs",
                  "lastname": "Mckee",
                  "username": "May",
                  "avatar": "assets/avatar.png",
                  "votes": 46,
                  "status": null,
                  "video": {
                    "id": "5899345",
                    "title": "Dickson eu",
                    "thumbnail": "assets/vid_thumb.jpg"
                  }
                },
                {
                  "id": "5899c4a95e6049a5d0e6d48d",
                  "firstname": "Wanda",
                  "lastname": "Mccall",
                  "username": "wetell",
                  "avatar": "assets/avatar.png",
                  "votes": 41,
                  "status": null,
                  "video": {
                    "id": "5894564",
                    "title": "Allyson consequat",
                    "thumbnail": "assets/vid_thumb.jpg"
                  }
                }
              ]

            }
          })))
        };

        //get upcoming contests
        if (connection.request.url.endsWith('/api/contest/upcoming') && connection.request.method === RequestMethod.Get) {
          //let charityData = JSON.parse(connection.request.getBody());
          //console.log(charityData)
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              "result": "OK",
              "contests": [
                {
                  "title": "Shining summer stars",
                  "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique ex, ipsa aspernatur corporis sed maiores est ab expedita possimus adipisci magni beatae fugit dolorem saepe? Esse deleniti inventore, dolores aperiam!",
                  "start": "03/05/2017 12pm",
                  "end": "03/07/2017 12pm",
                  "artists": [
                    {
                      "firstname": "Mabel",
                      "lastname": "Pacheco",
                      "username": "urris",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "5899",
                        "title": "Aida culpa",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Jenkins",
                      "lastname": "Avila",
                      "username": "ummers",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "58611",
                        "title": "Sargent deserunt",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Pat",
                      "lastname": "Vargas",
                      "username": "olden",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "5899873",
                        "title": "Collins cupidatat",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Mclaughlin",
                      "lastname": "Howell",
                      "username": "lover",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "589640",
                        "title": "Nielsen qui",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Angela",
                      "lastname": "Odonnell",
                      "username": "ichegrty",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "588496",
                        "title": "Wendi non",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Mae",
                      "lastname": "Dennis",
                      "username": "fartin",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "58989563",
                        "title": "Willa aute",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Althea",
                      "lastname": "Hatfield",
                      "username": "bowman",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "5317",
                        "title": "Terra elit",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Vaughan",
                      "lastname": "Slater",
                      "username": "porter",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "58996789",
                        "title": "Robert ullamco",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Travis",
                      "lastname": "Fuller",
                      "username": "Pruitt",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "589967872",
                        "title": "Nicholson et",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Arlene",
                      "lastname": "Park",
                      "username": "Gilliam",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "589946783",
                        "title": "Pam irure",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Nona",
                      "lastname": "Jacobson",
                      "username": "Cochran",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "58976488",
                        "title": "Marisa labore",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Hobbs",
                      "lastname": "Mckee",
                      "username": "May",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "5899345",
                        "title": "Dickson eu",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Wanda",
                      "lastname": "Mccall",
                      "username": "wetell",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "5894564",
                        "title": "Allyson consequat",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    }
                  ]
                },
                {
                  "title": "Phenomenal performances",
                  "description": "Blew us away… trust us when we say it will be one of the best night’s out you’ll ever have…. so much better than the real thing.",
                  "start": "03/05/2017 12pm",
                  "end": "03/07/2017 12pm",
                  "artists": [
                    {
                      "firstname": "Mabel",
                      "lastname": "Pacheco",
                      "username": "urris",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "5899",
                        "title": "Aida culpa",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Jenkins",
                      "lastname": "Avila",
                      "username": "ummers",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "58611",
                        "title": "Sargent deserunt",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Pat",
                      "lastname": "Vargas",
                      "username": "olden",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "5899873",
                        "title": "Collins cupidatat",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Mclaughlin",
                      "lastname": "Howell",
                      "username": "lover",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "589640",
                        "title": "Nielsen qui",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Angela",
                      "lastname": "Odonnell",
                      "username": "ichegrty",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "588496",
                        "title": "Wendi non",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Mae",
                      "lastname": "Dennis",
                      "username": "fartin",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "58989563",
                        "title": "Willa aute",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Althea",
                      "lastname": "Hatfield",
                      "username": "bowman",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "5317",
                        "title": "Terra elit",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Vaughan",
                      "lastname": "Slater",
                      "username": "porter",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "58996789",
                        "title": "Robert ullamco",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Travis",
                      "lastname": "Fuller",
                      "username": "Pruitt",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "589967872",
                        "title": "Nicholson et",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Arlene",
                      "lastname": "Park",
                      "username": "Gilliam",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "589946783",
                        "title": "Pam irure",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Nona",
                      "lastname": "Jacobson",
                      "username": "Cochran",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "58976488",
                        "title": "Marisa labore",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Hobbs",
                      "lastname": "Mckee",
                      "username": "May",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "5899345",
                        "title": "Dickson eu",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    },
                    {
                      "firstname": "Wanda",
                      "lastname": "Mccall",
                      "username": "wetell",
                      "avatar": "assets/avatar.png",
                      "video": {
                        "id": "5894564",
                        "title": "Allyson consequat",
                        "thumbnail": "assets/vid_thumb.jpg"
                      }
                    }
                  ]
                }
              ]
            }
          })))
        };


        //submit votes on contest 
        if (connection.request.url.match(/\/api\/contest.*/) && connection.request.method === RequestMethod.Patch) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              "result": "OK",
              "message": "Your vote has been enlisted. Thank you for participating",
              "title": "Phenomenal performances with sexy choreography and powerhouse vocals…",
              "description": "Blew us away… trust us when we say it will be one of the best night’s out you’ll ever have…. so much better than the real thing.",
              "end": "03/05/2017 12pm",
              "prise": 200,
              "artists": [
                {
                  "id": "5899c4a92b8efa6b9773ab5e",
                  "firstname": "Mclaughlin",
                  "lastname": "Howell",
                  "username": "lover",
                  "avatar": "assets/avatar.png",
                  "votes": 79,
                  "status": null,
                  "video": {
                    "id": "589640",
                    "title": "Nielsen qui",
                    "thumbnail": "assets/vid_thumb.jpg"
                  }
                },
                {
                  "id": "5899c4a99c1b5978fba4d0c1",
                  "firstname": "Angela",
                  "lastname": "Odonnell",
                  "username": "ichegrty",
                  "avatar": "assets/avatar.png",
                  "votes": 71,
                  "status": "leader",
                  "video": {
                    "id": "588496",
                    "title": "Wendi non",
                    "thumbnail": "assets/vid_thumb.jpg"
                  }
                },
                {
                  "id": "5899c4a9355b133486adc7bd",
                  "firstname": "Mae",
                  "lastname": "Dennis",
                  "username": "fartin",
                  "avatar": "assets/avatar.png",
                  "votes": 22,
                  "status": null,
                  "video": {
                    "id": "58989563",
                    "title": "Willa aute",
                    "thumbnail": "assets/vid_thumb.jpg"
                  }
                },
                {
                  "id": "5899c4a98b769ee2416ca85d",
                  "firstname": "Althea",
                  "lastname": "Hatfield",
                  "username": "bowman",
                  "avatar": "assets/avatar.png",
                  "votes": 90,
                  "status": null,
                  "video": {
                    "id": "5317",
                    "title": "Terra elit",
                    "thumbnail": "assets/vid_thumb.jpg"
                  }
                },
                {
                  "id": "5899c4a914193b44fd36b0d5",
                  "firstname": "Vaughan",
                  "lastname": "Slater",
                  "username": "porter",
                  "avatar": "assets/avatar.png",
                  "votes": 64,
                  "status": null,
                  "video": {
                    "id": "58996789",
                    "title": "Robert ullamco",
                    "thumbnail": "assets/vid_thumb.jpg"
                  }
                }
              ]

            }
          })))
        };

        if (connection.request.url.endsWith('/api/chat/collaborative') && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body:
            {
              'result': 'OK',
              'data': [
                {
                  'id': '247',
                  'user': 'Albert',
                  'image': 'assets/thumb-place.jpg',
                  'role': 'user',
                  'message': 'Hello, people!'
                }, {
                  'id': '248',
                  'user': 'Bill',
                  'image': 'assets/thumb-place.jpg',
                  'role': 'don',
                  'message': 'Hi, Albert'
                }, {
                  'id': '249',
                  'user': 'Vagrnat',
                  'image': 'assets/thumb-place.jpg',
                  'role': 'charity',
                  'message': 'Nice video'
                }, {
                  'id': '250',
                  'user': 'JCBone',
                  'image': 'assets/thumb-place.jpg',
                  'role': 'artist',
                  'message': 'Whooooooooooyy!!!))'
                }, {
                  'id': '251',
                  'user': 'ADMIN',
                  'image': 'assets/thumb-place.jpg',
                  'role': 'admin',
                  'message': 'Admin is here'
                }
              ]
            }
          })))
        };

        if (connection.request.url.match(/\/api\/chat\/collaborative\/\d+/) && connection.request.method === RequestMethod.Get) {
          let
            i = Math.floor(Math.random() * 5),
            data = [
              {
                'id': '247',
                'user': 'Albert',
                'image': 'assets/thumb-place.jpg',
                'role': 'user',
                'message': 'Hello, people!'
              }, {
                'id': '248',
                'user': 'Bill',
                'image': 'assets/thumb-place.jpg',
                'role': 'don',
                'message': 'Hi, Albert'
              }, {
                'id': '249',
                'user': 'Vagrnat',
                'image': 'assets/thumb-place.jpg',
                'role': 'charity',
                'message': 'Nice video',
              }, {
                'id': '250',
                'user': 'JCBone',
                'image': 'assets/thumb-place.jpg',
                'role': 'artist',
                'message': 'Whooooooooooyy!!!))'
              }, {
                'id': '251',
                'user': 'ADMIN',
                'image': 'assets/thumb-place.jpg',
                'role': 'admin',
                'message': 'Admin is here'
              }
            ];
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body:
            {
              'result': 'OK',
              'data': [
                data[i]
              ]
            }
          })))
        };

        // if (connection.request.url.endsWith('/api/chat/collaborative') && connection.request.method === RequestMethod.Post) {
        //   let
        //     receivedMessage = JSON.parse(connection.request.getBody()),
        //     response = [],
        //     i = Math.floor(Math.random() * 5),
        //     data = [
        //       {
        //         'id': '247',
        //         'user': 'Albert',
        //         'image': 'assets/thumb-place.jpg',
        //         'role': 'user',
        //         'message': 'Hello, people!'
        //       }, {
        //         'id': '248',
        //         'user': 'Bill',
        //         'image': 'assets/thumb-place.jpg',
        //         'role': 'don',
        //         'message': 'Hi, Albert'
        //       }, {
        //         'id': '249',
        //         'user': 'Vagrnat',
        //         'image': 'assets/thumb-place.jpg',
        //         'role': 'charity',
        //         'message': 'Nice video',
        //       }, {
        //         'id': '250',
        //         'user': 'JCBone',
        //         'image': 'assets/thumb-place.jpg',
        //         'role': 'artist',
        //         'message': 'Whooooooooooyy!!!))'
        //       }, {
        //         'id': '251',
        //         'user': 'ADMIN',
        //         'image': 'assets/thumb-place.jpg',
        //         'role': 'admin',
        //         'message': 'Admin is here'
        //       }
        //     ];
        //   response.push(receivedMessage);
        //   response.push(data[i]);
        //   connection.mockRespond(new Response(new ResponseOptions({
        //     status: 200,
        //     body: {
        //       "result": "OK",
        //       "data": response
        //     }
        //   })))
        // };

        if (connection.request.url.endsWith('/api/chat/commentary') && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body:
            {
              'result': 'OK',
              'data': [
                {
                  'id': '249',
                  'user': 'Vagrnat',
                  'image': 'assets/thumb-place.jpg',
                  'role': 'charity',
                  'message': 'Nice video'
                }, {
                  'id': '250',
                  'user': 'JCBone',
                  'image': 'assets/thumb-place.jpg',
                  'role': 'artist',
                  'message': 'Whooooooooooyy!!!))'
                }, {
                  'id': '251',
                  'user': 'ADMIN',
                  'image': 'assets/thumb-place.jpg',
                  'role': 'admin',
                  'message': 'Admin is here'
                }
              ]
            }
          })))
        };

        if (connection.request.url.match(/\/api\/chat\/commentary\/\d+/) && connection.request.method === RequestMethod.Get) {
          let
            i = Math.floor(Math.random() * 3),
            data = [
              {
                'id': '249',
                'user': 'Vagrnat',
                'image': 'assets/thumb-place.jpg',
                'role': 'charity',
                'message': 'Nice video',
              }, {
                'id': '250',
                'user': 'JCBone',
                'image': 'assets/thumb-place.jpg',
                'role': 'artist',
                'message': 'Whooooooooooyy!!!))'
              }, {
                'id': '251',
                'user': 'ADMIN',
                'image': 'assets/thumb-place.jpg',
                'role': 'admin',
                'message': 'Admin is here'
              }
            ];
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body:
            {
              'result': 'OK',
              'data': [
                data[i]
              ]
            }
          })))
        };

        // if (connection.request.url.endsWith('/api/chat/commentary') && connection.request.method === RequestMethod.Post) {
        //   let
        //     receivedMessage = JSON.parse(connection.request.getBody()),
        //     response = [],
        //     i = Math.floor(Math.random() * 3),
        //     data = [
        //       {
        //         'id': '249',
        //         'user': 'Vagrnat',
        //         'image': 'assets/thumb-place.jpg',
        //         'role': 'charity',
        //         'message': 'Nice video',
        //       }, {
        //         'id': '250',
        //         'user': 'JCBone',
        //         'image': 'assets/thumb-place.jpg',
        //         'role': 'artist',
        //         'message': 'Whooooooooooyy!!!))'
        //       }, {
        //         'id': '251',
        //         'user': 'ADMIN',
        //         'image': 'assets/thumb-place.jpg',
        //         'role': 'admin',
        //         'message': 'Admin is here'
        //       }
        //     ];
        //   response.push(receivedMessage);
        //   response.push(data[i]);
        //   connection.mockRespond(new Response(new ResponseOptions({
        //     status: 200,
        //     body: {
        //       "result": "OK",
        //       "data": response
        //     }
        //   })))
        // };

        //search button
        if (connection.request.url.match(/\/api\/search\/\?filter=.*/) && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              "result": "OK",
              "items":
              [
                 {
                  "id": "5838111",
                  "role": null,
                  "firstname": null,
                  "lastname": null,
                  "username": null,
                  "bio": null,
                  "city": null,
                  "state": null,
                  "genre": "rock",
                  "title": "Shining sun",
                  "registered": "Jun 23 2015"
                },
                {
                  "id": "5825476",
                  "role": "artist",
                  "firstname": "Phillips",
                  "lastname": "Lara",
                  "username": "Durham",
                  "bio": "Velit velit id incididunt incididunt eiusmod est cupidatat reprehenderit ex. Voluptate veniam excepteur consequat ad fugiat labore exercitation voluptate eu amet excepteur consectetur dolor. Elit sit adipisicing sint qui est. Nostrud labore labore labore labore irure laboris Lorem id veniam sunt laborum eiusmod. Eu aute sunt sit culpa. Cillum tempor sint eiusmod exercitation veniam laboris non ullamco.\r\n",
                  "city": "Clarence",
                  "state": "Ohio",
                  "genre": "pop",
                  "title": null,
                  "registered": "Sep 15 2016"
                },
                {
                  "id": "5873",
                  "role": null,
                  "firstname": null,
                  "lastname": null,
                  "username": null,
                  "bio": null,
                  "city": null,
                  "state": null,
                  "genre": "rock",
                  "title": "Deloris labore",
                  "registered": "Feb 27 2016"
                },
                {
                  "id": "58547",
                  "role": "artist",
                  "firstname": "Bertie",
                  "lastname": "Rodriguez",
                  "username": "Solis",
                  "bio": "Sint sunt aliquip occaecat labore irure aliqua magna ullamco ut esse. Eu voluptate laborum sit duis sint sint nulla dolore excepteur. Reprehenderit labore in veniam voluptate laboris enim. Magna ut in eu excepteur id id ex. Pariatur reprehenderit anim quis dolor. Occaecat sit amet culpa eu excepteur cupidatat exercitation aliquip amet. Ut est voluptate occaecat dolore eiusmod elit laborum deserunt anim reprehenderit in.\r\n",
                  "city": "Eagletown",
                  "state": "Vermont",
                  "genre": "pop",
                  "title": null,
                  "registered": "Aug 11 2016"
                },
                {
                  "id": "58749321",
                  "role": null,
                  "firstname": null,
                  "lastname": null,
                  "username": null,
                  "bio": null,
                  "city": null,
                  "state": null,
                  "genre": "pop",
                  "title": "Murray cupidatat",
                  "registered": "Sep 15 2016"
                },
                {
                  "id": "587934",
                  "role": null,
                  "firstname": null,
                  "lastname": null,
                  "username": null,
                  "bio": null,
                  "city": null,
                  "state": null,
                  "avatar": null,
                  "preview": "assets/vid_thumb.jpg",
                  "title": "Knapp do",
                  "registered": "Dec 4 2016"
                },
                {
                  "id": "58547",
                  "role": "charity",
                  "firstname": "Briggs",
                  "lastname": "Reed",
                  "username": "Yates",
                  "bio": "Dolore excepteur culpa sunt excepteur esse cupidatat adipisicing est qui aute eu. Voluptate do voluptate veniam enim ipsum consequat eu eu veniam in qui. Elit in nisi labore ad quis labore proident ea veniam. Commodo reprehenderit non velit commodo velit elit eiusmod aute fugiat esse fugiat ullamco enim incididunt. Adipisicing quis aute reprehenderit qui aliquip aliqua aliqua culpa et magna.\r\n",
                  "city": "Chapin",
                  "state": "Illinois",
                  "genre": null,
                  "title": null,
                  "registered": "Jun 2 2016"
                },
                {
                  "id": "58547",
                  "role": "charity",
                  "firstname": "Milagros",
                  "lastname": "Webster",
                  "username": "Hawkins",
                  "bio": "Sunt sunt anim anim cillum do adipisicing cillum consequat. Laboris irure adipisicing occaecat occaecat nostrud nisi pariatur veniam sint cupidatat Lorem. Sunt magna adipisicing sunt aliqua deserunt irure non mollit. Irure reprehenderit aliqua magna dolor nulla adipisicing voluptate nisi irure velit qui in quis veniam.\r\n",
                  "city": "Longoria",
                  "state": "Federated States Of Micronesia",
                  "genre": null,
                  "title": null,
                  "registered": "Dec 5 2016"
                },
                {
                  "id": "58547",
                  "role": null,
                  "firstname": null,
                  "lastname": null,
                  "username": null,
                  "bio": null,
                  "city": null,
                  "state": null,
                  "genre": "pop",
                  "title": "Victoria culpa",
                  "registered": "Sep 14 2016"
                },
                {
                  "id": "58547",
                  "role": "charity",
                  "firstname": "Jacobs",
                  "lastname": "Herrera",
                  "username": "Skinner",
                  "bio": "Reprehenderit occaecat consectetur sunt voluptate deserunt non id incididunt sint consequat. Laboris elit qui aliquip ullamco. Fugiat minim tempor fugiat minim adipisicing ullamco voluptate sit nulla. Deserunt ut consectetur culpa qui elit sint. Reprehenderit dolor minim quis magna aute eiusmod nulla aliqua fugiat quis anim enim occaecat aliqua.\r\n",
                  "city": "Greer",
                  "state": "Tennessee",
                  "genre": null,
                  "title": null,
                  "registered": "Sep 1 2016"
                },
                {
                  "id": "58547",
                  "role": null,
                  "firstname": null,
                  "lastname": null,
                  "username": null,
                  "bio": null,
                  "city": null,
                  "state": null,
                  "title": "NLO in New-York",
                  "genre": "pop",
                  "registered": "Feb 14 2016"
                },
                {
                  "id": "58547",
                  "role": "charity",
                  "firstname": "Chris",
                  "lastname": "Dennis",
                  "username": "Tyson",
                  "bio": "Aliquip aliqua nisi anim id qui eiusmod officia excepteur officia proident. Veniam eu magna esse commodo exercitation ut officia consequat fugiat in eiusmod consectetur nostrud ex. Aliqua ullamco mollit proident qui qui. Eiusmod enim occaecat ad Lorem fugiat magna irure mollit exercitation cillum. Aliquip quis est occaecat irure amet Lorem ea officia ad.\r\n",
                  "city": "Fairfield",
                  "state": "West Virginia",
                  "genre": null,
                  "title": null,
                  "registered": "Jul 15 2016"
                },
                {
                  "id": "585498",
                  "role": "artist",
                  "firstname": "Walker",
                  "lastname": "Molina",
                  "username": "Riddle",
                  "bio": "Et aliquip culpa non magna. Qui aliquip labore aliqua sit enim do aute dolor. Sint dolor anim non culpa culpa. Proident eu quis non excepteur quis qui laboris nostrud nostrud occaecat. In qui aliqua cillum ea anim reprehenderit dolore occaecat.\r\n",
                  "city": "Monument",
                  "state": "Connecticut",
                  "genre": "pop",
                  "title": null,
                  "registered": "Jun 21 2016"
                },
                {
                  "id": "587332",
                  "role": "charity",
                  "firstname": "Bush",
                  "lastname": "Buckner",
                  "username": "Kline",
                  "bio": "Ipsum excepteur irure commodo tempor velit Lorem. Pariatur laboris velit commodo dolore et eu quis elit labore. Reprehenderit velit nostrud adipisicing exercitation consectetur incididunt nostrud. Anim quis aute sint ullamco in non aute nostrud labore non. Consequat do occaecat ipsum nisi commodo nulla labore dolor sit ipsum ipsum cupidatat qui.\r\n",
                  "city": "Lowgap",
                  "state": "Arizona",
                  "genre": null,
                  "title": null,
                  "registered": "Apr 4 2016"
                },
                {
                  "id": "584939",
                  "role": "artist",
                  "firstname": "Dickerson",
                  "lastname": "Collins",
                  "username": "Vasquez",
                  "bio": "Laborum excepteur qui ipsum culpa elit est consequat commodo minim. Non voluptate excepteur Lorem deserunt nostrud dolor consequat cupidatat sint do ipsum anim. Lorem ullamco commodo commodo laboris aliqua pariatur ut irure laboris incididunt pariatur. Qui velit sunt et cupidatat nostrud ullamco anim ut deserunt culpa amet non do. Ex cillum cupidatat nostrud esse duis non ullamco quis laborum officia ipsum sunt id sit.\r\n",
                  "city": "Harold",
                  "state": "Indiana",
                  "genre": "pop",
                  "title": null,
                  "registered": "Jul 11 2016"
                },
                {
                  "id": "58868",
                  "role": null,
                  "firstname": null,
                  "lastname": null,
                  "username": null,
                  "bio": null,
                  "city": null,
                  "state": null,
                  "genre": "pop",
                  "title": "Christina dolor",
                  "registered": "Nov 14 2016"
                },
                {
                  "id": "58546714",
                  "role": "artist",
                  "firstname": "Richard",
                  "lastname": "Christian",
                  "username": "Newman",
                  "bio": "Est sint ad irure ipsum labore qui sint ad consectetur veniam occaecat magna eiusmod. Sint culpa velit pariatur commodo commodo nulla est ipsum culpa duis. Fugiat incididunt pariatur dolor adipisicing eiusmod eu culpa aute reprehenderit quis pariatur et ad proident. Aliqua esse commodo aliqua ullamco aliquip incididunt veniam voluptate. Dolore commodo ad laboris sit in esse do esse anim.\r\n",
                  "city": "Soudan",
                  "state": "New Jersey",
                  "genre": "pop",
                  "title": null,
                  "registered": "Mar 9 2016"
                },
                {
                  "id": "585479589",
                  "role": null,
                  "firstname": null,
                  "lastname": null,
                  "username": null,
                  "bio": null,
                  "city": null,
                  "state": null,
                  "avatar": null,
                  "genre": "rock",
                  "title": "Bender sit",
                  "registered": "Nov 18 2016"
                },
                {
                  "id": "58457346522",
                  "role": "charity",
                  "firstname": "Bean",
                  "lastname": "Norman",
                  "username": "Pearson",
                  "bio": "Ut dolore ipsum velit consequat excepteur. Commodo officia eu exercitation anim veniam velit consectetur dolor et eu. Laboris ullamco consequat enim culpa exercitation et culpa aute. Ex tempor ipsum cupidatat laboris culpa. Eiusmod laborum mollit magna non excepteur deserunt. Amet do adipisicing id in qui amet nostrud et dolor aliquip labore sit eiusmod non. Consequat deserunt tempor do occaecat et minim quis occaecat fugiat ea reprehenderit qui veniam pariatur.\r\n",
                  "city": "Ticonderoga",
                  "state": "Washington",
                  "genre": null,
                  "title": null,
                  "registered": "Jul 16 2016"
                },
                {
                  "id": "5852",
                  "role": null,
                  "firstname": null,
                  "lastname": null,
                  "username": null,
                  "bio": null,
                  "city": null,
                  "state": null,
                  "genre": "pop",
                  "title": "May eu",
                  "registered": "Mar 24 2016"
                },
                {
                  "id": "5855",
                  "role": null,
                  "firstname": null,
                  "lastname": null,
                  "username": null,
                  "bio": null,
                  "city": null,
                  "state": null,
                  "genre": "pop",
                  "title": "Salazar sit",
                  "registered": "Nov 9 2016"
                },
                {
                  "id": "5856",
                  "role": "charity",
                  "firstname": "Courtney",
                  "lastname": "William",
                  "username": "Mcintosh",
                  "bio": "Magna Lorem laborum in laboris laborum occaecat commodo enim labore enim nulla qui anim voluptate. Sunt sint eiusmod dolor cillum ad. Reprehenderit ex aliquip exercitation commodo aute. Culpa reprehenderit velit consequat sunt et nulla reprehenderit commodo ullamco est cillum. Ipsum in minim deserunt velit nostrud minim proident veniam sit. Deserunt enim anim laborum aliqua incididunt ad commodo dolore do ea. Reprehenderit veniam reprehenderit irure officia elit.\r\n",
                  "city": "Valmy",
                  "state": "District Of Columbia",
                  "genre": null,
                  "title": null,
                  "registered": "Dec 30 2016"
                },
                {
                  "id": "5845789441",
                  "role": "artist",
                  "firstname": "Young",
                  "lastname": "Benton",
                  "username": "Price",
                  "bio": "Mollit proident aliquip et ex esse incididunt laboris labore quis consectetur mollit mollit eiusmod velit. Duis in nulla cillum adipisicing. Non veniam voluptate dolor id officia.\r\n",
                  "city": "Martell",
                  "state": "Louisiana",
                  "genre": "pop",
                  "title": null,
                  "registered": "Feb 9 2016"
                },
                {
                  "id": "585292238111",
                  "role": null,
                  "firstname": null,
                  "lastname": null,
                  "username": null,
                  "bio": null,
                  "city": null,
                  "state": null,
                  "genre": "pop",
                  "title": "Tamika fugiat",
                  "registered": "Jun 23 2016"
                },
                {
                  "id": "5857869454",
                  "role": "artist",
                  "firstname": "Pugh",
                  "lastname": "Hammond",
                  "username": "Kirk",
                  "bio": "Amet proident qui dolor exercitation Lorem proident consequat Lorem officia nulla ex deserunt ad nulla. Pariatur cupidatat voluptate amet aliquip ut velit. Consectetur amet dolor incididunt incididunt ullamco.\r\n",
                  "city": "Catharine",
                  "state": "South Carolina",
                  "genre": "pop",
                  "title": null,
                  "registered": "Dec 23 2016"
                },
                {
                  "id": "587",
                  "role": "artist",
                  "firstname": "Irma",
                  "lastname": "Thornton",
                  "username": "Hernandez",
                  "bio": "Eu reprehenderit in incididunt cupidatat id amet laborum laborum Lorem incididunt id. Nostrud voluptate veniam aliqua excepteur deserunt proident pariatur tempor. Occaecat enim voluptate aliquip exercitation nisi amet quis cillum veniam. Laboris mollit reprehenderit veniam aliquip non nulla laborum minim minim.\r\n",
                  "city": "Coral",
                  "state": "Maryland",
                  "genre": "pop",
                  "title": null,
                  "registered": "Dec 14 2016"
                },
                {
                  "id": "58504",
                  "role": null,
                  "firstname": null,
                  "lastname": null,
                  "username": null,
                  "bio": null,
                  "city": null,
                  "state": null,
                  "genre": "pop",
                  "title": "Willa et",
                  "registered": "Sep 2 2016"
                },
                {
                  "id": "585446",
                  "role": "charity",
                  "firstname": "Francine",
                  "lastname": "Evans",
                  "username": "Church",
                  "bio": "Nulla quis aliquip sit dolore occaecat enim fugiat velit nostrud aliqua culpa velit eu voluptate. Excepteur minim deserunt est occaecat excepteur nulla exercitation nulla ea esse. Amet velit elit et sit elit culpa dolor consequat cupidatat elit laboris in consectetur. Aliquip proident minim esse do veniam sunt pariatur. Eu dolore mollit pariatur consectetur deserunt labore proident aliquip id deserunt est pariatur laborum amet.\r\n",
                  "city": "Bordelonville",
                  "state": "Northern Mariana Islands",
                  "genre": null,
                  "title": null,
                  "registered": "Jan 23 2016"
                },
                {
                  "id": "58235",
                  "role": null,
                  "firstname":null,
                  "lastname": null,
                  "username": null,
                  "bio": null,
                  "city": null,
                  "state": null,
                  "genre": "pop",
                  "title": "Ware ea",
                  "registered": "Dec 13 2016"
                },
                {
                  "id": "58435",
                  "role": "artist",
                  "firstname": "Cote",
                  "lastname": "Bishop",
                  "username": "Meyer",
                  "bio": "Proident occaecat aute consequat commodo do nulla cupidatat nostrud quis occaecat labore ex. Occaecat ullamco laboris labore commodo do consequat labore mollit. Dolor duis ex fugiat sint magna veniam eiusmod.\r\n",
                  "city": "Kempton",
                  "state": "Colorado",
                  "genre": "pop",
                  "title": null,
                  "registered": "Jan 9 2016"
                },
                {
                  "id": "58416470",
                  "role": "charity",
                  "firstname": "Gilda",
                  "lastname": "House",
                  "username": "Schneider",
                  "bio": "Fugiat sint veniam fugiat sunt consectetur mollit deserunt aliqua ad. Velit non cillum est quis sint quis. Culpa ut esse est eu culpa sit velit mollit sit esse ad anim veniam. Fugiat nisi duis consequat incididunt cupidatat consequat est dolore elit ex Lorem.\r\n",
                  "city": "Oretta",
                  "state": "Massachusetts",
                  "genre": null,
                  "title": null,
                  "registered": "Jun 8 2016"
                }

              ]

            }
          })))
        };

      }, 500);

    });
    return new Http(backend, options);
  },
  deps: [MockBackend, BaseRequestOptions]
};
