import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { ListComponent } from './list/list.component';


@NgModule({
  imports: [BrowserModule, VirtualScrollModule, SearchRoutingModule],
  declarations: [SearchComponent, ListComponent],
  exports: [SearchComponent],
  providers: []
})
export class SearchModule { }
