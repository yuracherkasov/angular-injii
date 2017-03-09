import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  imports: [SearchRoutingModule, BrowserModule],
  declarations: [SearchComponent],
  exports: [SearchComponent],
  providers: []
})
export class SearchModule { }
