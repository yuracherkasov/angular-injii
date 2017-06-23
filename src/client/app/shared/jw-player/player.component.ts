import { Component, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
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
  sharingPlugin: any;
  controlStyle: string = 'block';
  showPlayingButton: string = '';

  constructor(private elementRef: ElementRef,
    private playerService: PlayerService,
    private popupService: PopupService,
    private zone: NgZone
  ) {

    this.playerService.videoDetailObservable
      .subscribe((data: any) => {
        if (data && data.result === 'OK')
          this.changeVideo(data.video.playlist);
      });
  }

  ngAfterViewInit() {
    //this.playerService.getVideo('current').then((resolve: any) => {
    this.playerService.getVideo('4').then((resolve: any) => {
        console.log('Video Object ', resolve);
      if (resolve.result === 'OK') {
        let playlist = resolve.video.playlist;
        let player = this.playerEl.nativeElement.id;

        jwplayer(player).setup({
          'autostart': true,
          'controls': false,
          'repeat': false,
          'playlist': playlist,
          'width': '100%',
          'height': '100%',
          'preload': 'auto',
          'sharing': {
            'sites': ['facebook', 'twitter', 'googleplus', 'interest', 'email', 'tumblr', 'reddit', 'linkedin'],
            'heading': 'Share injii'
            //'link': "https://MEDIAID"
          }
        });

        jwplayer().on('ready', (event: Event) => {
           this.zone.run(() => {
            this.showPlayingButton = 'playing';
          });
          this.sharingPlugin = jwplayer().getPlugin('sharing');
          jwplayer(player).play(true);
        });

        jwplayer(player).on('play', () => {
          this.makeLoading();
        });

        jwplayer().on('buffer', () => {
          this.makeLoading();
        });

        jwplayer().on('playlistComplete', () => {
          this.popupService.showContentPopup();
          this.playerService.getVideo('current').then((resolve: any) => {
            if (resolve.result === 'OK') {
              let newPlaylist = resolve.video.playlist;
              jwplayer().load(newPlaylist);
              jwplayer(player).play(true);
            }
          });
        });

      }
    });
  }

  makeLoading() {
    let state = jwplayer().getState();
    if(state === 'playing') {
      this.zone.run(() => {
        this.showPlayingButton = '';
      });
    } else {
      this.zone.run(() => {
        this.showPlayingButton = 'loading';
      });
    };
  };

  changeVideo(playlist: string): void {
    if (jwplayer().load && typeof jwplayer().load === 'function') {
      jwplayer().load(playlist);
      jwplayer().play(true);
    };
  };

  callSharing() {
    if(this.sharingPlugin !== undefined) {
      this.sharingPlugin.open();
      jwplayer().play(true);
      this.controlStyle = 'none';
      this.sharingPlugin.on('close', () => {
        this.controlStyle = 'block';
      });
    }
  };

  setValue(e: any) {
    if (e.target.classList.contains('active')) {
      jwplayer().setMute(true);
      e.target.classList.toggle('active');
    } else {
      jwplayer().setMute(false);
      e.target.classList.toggle('active');
    };
  };

  startPlay() {
    this.showPlayingButton = 'loading';
    jwplayer().play(true);
  }

}
