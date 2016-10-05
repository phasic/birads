import { Component, ViewContainerRef } from '@angular/core';
import {PageController} from "./services/page.controller";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  private  viewContainerRef: ViewContainerRef;
  public constructor(viewContainerRef: ViewContainerRef, private pagectrl: PageController){
    this.viewContainerRef = viewContainerRef;
    this.pagectrl = pagectrl;
  }

  test(keycode){
    event.stopPropagation();
    event.preventDefault();
    console.log("TEEST RIGHT CLICK!!");
  }
}

