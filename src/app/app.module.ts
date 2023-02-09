import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

import { TestComponent } from './test/test.component';
import { AddColumns } from './directives/add-columns.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule, WjGridModule ],
  declarations: [ AppComponent, TestComponent, AddColumns ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }