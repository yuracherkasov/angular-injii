import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';

import 
{ 
  ContentComponent, 
  SearchComponent, 
  UpcomingContentComponent, 
  LatestContentComponent, 
  FeaturedContentComponent, 
  ContentService 
} from './index';


@NgModule({
    imports: [CommonModule, ContentRoutingModule],
    declarations: 
    [  
      SearchComponent, 
      ContentComponent, 
      UpcomingContentComponent, 
      LatestContentComponent, 
      FeaturedContentComponent
    ],
    exports: [ ContentComponent, 
               SearchComponent
               ],
    providers: [ ContentService ]
})

export class ContentModule { }
