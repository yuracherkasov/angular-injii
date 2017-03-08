import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { PlayerService } from './player.service';
import { PopupService } from './../services/ui-popup.service';


declare var jwplayer: any;

@Component({
  moduleId: module.id,
  selector: 'sd-player',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.css']
})

export class PlayerComponent implements AfterViewInit {

  @ViewChild('player') playerEl: ElementRef;
  playlist: any;
  sharingPlugin: any
  controlStyle: string = 'block';

  constructor(private elementRef: ElementRef,
    private playerService: PlayerService,
    private popupService: PopupService
  ) {

    this.playerService.videoDetailObservable
      .subscribe((data: any) => {
        if (data && data.result === "OK")
          this.changeVideo(data.video.playlist)
      })
  }

  ngAfterViewInit() {
    this.playerService.getVideo("current").then((resolve: any) => {
      if (resolve.result === 'OK') {
        let playlist = resolve.video.playlist;
        let player = this.playerEl.nativeElement.id;

        jwplayer(player).setup({
          'autostart': 'true',
          'controls': 'false',
          'repeat': false,
          'playlist': playlist,
          'width': '100%',
          'height': '100%',
          'preload': 'auto',
          'sharing': {
            'sites': ["facebook", "twitter", "googleplus", "interest", "email", "tumblr", "reddit", "linkedin"],
            "heading": "Share injii"
            //'link': "https://MEDIAID"
          }
        });

        jwplayer().on('ready', (event: Event) => {
          this.makePlaying();
          this.sharingPlugin = jwplayer().getPlugin('sharing');
        });

        jwplayer().on('playlistComplete', () => {
          this.popupService.showContentPopup()
          this.playerService.getVideo("current").then((resolve: any) => {
            if (resolve.result === 'OK') {
              let newPlaylist = resolve.video.playlist;
              jwplayer().load(newPlaylist);
              this.makePlaying();
            }
          });
        })

      }
    });

  }

  changeVideo(playlist: string): void {
    if (jwplayer().load && typeof jwplayer().load === "function") {
      jwplayer().load(playlist);
      this.makePlaying();
    }
  }

  callSharing(event: Event) {
    this.sharingPlugin.open();
    this.makePlaying();
    this.controlStyle = "none";
    this.sharingPlugin.on('close', () => {
      this.controlStyle = "block";
    })
  }

  setValue(e: any) {
    if (e.target.classList.contains('active')) {
      jwplayer().setMute(true);
      e.target.classList.toggle('active')
    } else {
      jwplayer().setMute(false);
      e.target.classList.toggle('active')
    }
  };

  //forced start on mobile devices:
  makePlaying() {
    jwplayer().play();
    setTimeout(() => {
      let state = jwplayer().getState();
      if (state !== "playing") {
        this.makePlaying()
      }
    }, 500)
  }

}