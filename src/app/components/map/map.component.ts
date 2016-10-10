import {Component}      from '@angular/core';
import {PageController} from "../../services/page.controller";
@Component({
    selector: 'map-component',
    templateUrl: '../../templates/map/map.template.html'
})
export class MapComponent {
    /**
     * Constructor of MapComponent
     * @param pagectrl page controller manages functions to assure functionality (tracking click, adding badges, ... )
     */
    constructor(private pagectrl: PageController) {
        this.height = '';
    }
    clickHandler(event: any): void {

        this.clickedMap(event);

    }
    private firstimage: string;
    clickedMap(event: any): void{                                       //function gets called when an image is clicked
        if(!this.pagectrl.isMenuShown() && (this.pagectrl.getMethod() !== '')) { //if the menu is not shown and we selected a method
            if (this.firstClick()) {                                            //check if its the first time we clicked an image
                this.pagectrl.setClickedImage(event.target, event);
                this.setClickedHeight(event.offsetY/event.target.height); //keep the clickheight if <0.5 --> 0.5,  if > 0.5 --> 1
                this.firstimage = event.target.id;                      //keep the id of the first clicked image
            }
            else if(this.checkClickedHeight(event.offsetY, event.target.height)) {       //if it isn't the first time we clicked, and we clicked the correct height
                if ((this.firstimage == 'RS' && event.target.id == 'RF') ||
                    (this.firstimage == 'LS' && event.target.id == 'LF') ||
                    (this.firstimage == 'RF' && event.target.id == 'RS') ||
                    (this.firstimage == 'LF' && event.target.id == 'LS')){
                    this.pagectrl.setClickedImage(event.target, event);
                    this.pagectrl.setShowmenu(this.pagectrl.getMethod());
                    this.pagectrl.setNumberOfClicks(0);
                }
                else this.pagectrl.setNumberOfClicks(0);
            }
        }
    }
    firstClick(): boolean{
        this.pagectrl.setNumberOfClicks(this.pagectrl.getNumberOfClicks() + 1);
        return this.pagectrl.getNumberOfClicks() == 1;

    }
    private height: string;
    setClickedHeight(height: number){
        if(height <= 0.5){
            this.height = "top";
        }
        else if(height > 0.5){
            this.height = "bottom";
        }
    }
    checkClickedHeight(clickoffset: number, imgsize: number): boolean{     //compares second click with height of the first click
        let height2: number = clickoffset/imgsize;
        return ((height2 <= 0.5 && this.height == 'top') || (height2 > 0.5 && this.height == 'bottom'));

    }
}


