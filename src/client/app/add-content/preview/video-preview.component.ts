import { Component, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { SelectVideoService } from '../select-video.service'
import { VideoDurationService } from '../video-duration.service'

declare var jwplayer: any;

@Component({
  moduleId: module.id,
  selector: 'video-preview',
  template: `
  <div class="preview-wrapper">
  <div class="preview-block">
  <h2 [style.display]="cssDisplay ? 'none' : 'block'">Preview space</h2>
  <div [style.display]="cssDisplay ? 'block' : 'none'">
  <div #preview id="preview"></div>
  </div>
  </div>
  </div>`,
  styleUrls: ['video-preview.component.css']
})

export class VideoPreviewComponent {

  @ViewChild('preview') preview: ElementRef;
  // @Output() durationSetup: EventEmitter<number> = new EventEmitter<number>();
  UrlsArray: Array<string> = [];
  cssDisplay: boolean = false;
  private file: any;
  private durationTime: number = null;


  constructor
    (
      private selectVideoService: SelectVideoService,
      private videoDurationService: VideoDurationService
    ) {
    this.selectVideoService.changeVideoObservable
      .subscribe((file: string) => {
        if (typeof file === 'string') {
          this.runPlayer(file);
        } else {
          this.file = file;
          this.uploadedVideoPlay();
        }
      });
  }

  uploadedVideoPlay() {
    let fileReader: FileReader = new FileReader();

    fileReader.onload = (e: any): void => {

      let mime = this.file.type;
      let blob = new Blob([e.target.result], { type: mime });
      let url = URL.createObjectURL(blob);

      this.UrlsArray.push(url);

      this.runPlayer(url, mime)
    };

    fileReader.readAsArrayBuffer(this.file);

  }

  runPlayer(url: string, mime?: string): void {
    this.cssDisplay = true;
    let video = this.preview.nativeElement.id;
    if (mime) {
      jwplayer(video).setup({
        'controls': 'true',
        'repeat': false,
        'width': '100%',
        'height': '100%',
        'type': mime,
        'file': url,
      });
    } else {
      jwplayer(video).setup({
        'controls': 'true',
        'repeat': false,
        'width': '100%',
        'height': '100%',
        'file': url,
      });
    }

    jwplayer(video).play(true);

    jwplayer(video).on('play', () => {
      let duration = jwplayer(video).getDuration();
      if (this.durationTime !== duration) {
        //this.durationSetup.emit(duration);
        this.videoDurationService.setMaxDuration(duration);
        setTimeout(() => {
          jwplayer(video).pause();
        }, 1000);
        this.durationTime = duration;
      }
    });
  }

}
