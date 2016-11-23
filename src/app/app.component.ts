import {Component, ViewContainerRef, OnInit} from '@angular/core';
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
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit{
  get showflemishreport(): boolean {
    return this._showflemishreport;
  }

  set showflemishreport(value: boolean) {
    this._showflemishreport = value;
  }
  public constructor(private viewContainerRef: ViewContainerRef, private pagectrl: PageController){

  }

  /**
   * When passing ?flemloc at the end of the URL , we'll show the flemish report too
   */
  ngOnInit(){
    this.showflemishreport = window.location.search == "?flemloc";
  }
  private _showflemishreport: boolean;
  /**
   * This handler disables the right clicks on the page. So the user doesn't see the right click menu.
   *
   * It prevents the default action of the right mouse click.
   * @param event
   */
  keyPressHandler(event: any){
    event.preventDefault();
  }


}

