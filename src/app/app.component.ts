import { Component } from '@angular/core';
import { getData } from './data';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  data = getData(5);
}