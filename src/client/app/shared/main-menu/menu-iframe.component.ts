import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  trigger,
  transition,
  style,
  animate,
  state
} from '@angular/core';

import { MenuIframeService } from './menu-iframe.service';

@Component({
  moduleId: module.id,
  selector: 'menu-iframe',
  template: `
  <div id="menuframe" [@MenuAnimationTrigger]="'active'">
  <a href="javascript:;" class="close" (click)="closeFrame()"></a>
  <iframe #menuframe></iframe>
  </div>`,
  animations: [
    trigger('MenuAnimationTrigger', [
      state('void', style({
        opacity: 0
      })),
      state('active', style({
        opacity: 1
      })),
      transition('void => active', animate('.3s ease-out'))
    ]
    ),
  ],
  styleUrls: ['main-menu.component.css']
})

export class MenuIframeComponent implements OnChanges {

  @Input() src: string;
  @ViewChild('menuframe') menuframe: ElementRef;

  constructor
    (
    private menuService: MenuIframeService
    ) { }

  ngOnChanges(): void {
    this.menuframe.nativeElement.src = this.src;
  }

  closeFrame(): void {
    this.menuService.showIframeCompnt = false;
  }
}
