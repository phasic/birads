import { Component, ViewContainerRef } from '@angular/core';
import {PageController} from "./services/page.controller";
/**
 * This is the main component. Once you open the page, this will be shown.
 *
 * By default the component has a HTML content of 'loading...', once all the elements are loaded, the component shows his content.
 *
 *      selector: 'my-app'
 *      templateUrl: './app.component.html'
 *      styleUrls: ['app.component.css']
 */
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  // private  viewContainerRef: ViewContainerRef;
  public constructor(private viewContainerRef: ViewContainerRef, private pagectrl: PageController){
    // this.viewContainerRef = viewContainerRef;
    // this.pagectrl = pagectrl;
  }


}

