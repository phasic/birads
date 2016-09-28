import { Component, ViewContainerRef } from '@angular/core';
import {DataService} from "./services/data.service";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  private  viewContainerRef: ViewContainerRef;
  public constructor(viewContainerRef: ViewContainerRef){
    this.viewContainerRef = viewContainerRef;
  }

}

