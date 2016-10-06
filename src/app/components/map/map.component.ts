import {Component}      from '@angular/core';
import {PageController} from "../../services/page.controller";
@Component({
    selector: 'map-component',
    templateUrl: '../../templates/map/map.template.html'
})
export class MapComponent {
    constructor(private pagectrl: PageController) {
    }
    clickHandler(event: any): void {
        this.clickedMap(event);

    }
    private firstimage: string;

    clickedMap(event: any): void{                                       //function gets called when an image is clicked
        if(!this.pagectrl.isMenuShown() && (this.pagectrl.getMethod() !== '')) { //if the menu is not shown and we selected a method
            this.pagectrl.addClick();                                   //we register the click
            if (this.pagectrl.getNumberOfClicks() == 1) {               //check if its the first time we clicked an image
                this.pagectrl.setClickedHeight(event.offsetY/event.target.height); //keep the clickheight if <0.5 --> 0.5/ if > 0.5 --> 1
                if (['RF', 'LF'].indexOf(event.target.id) !== -1) {     //did we click a 'front' image?
                    this.pagectrl.setFrontLoc(event.x, event.y);        //set the click location of the front image
                }
                if (['RS', 'LS'].indexOf(event.target.id) !== -1) {     //did we click a 'side' image?
                    this.pagectrl.setSideLoc(event.x, event.y);         //set the click location of the side image
                }
                this.firstimage = event.target.id;                      //keep the id of the first clicked image
            }
            else {                                                      //if it isn't the first time we clicked
                switch (this.firstimage) {                              //use the first image as reference
                    case 'RS':
                        if (event.target.id == 'RF' && this.pagectrl.checkClickedHeight(event.offsetY, event.target.height)) {
                            this.handleMenu('front', event);            //if we clicked RS first, and now RF, and we click the right height, then show the menu
                        }
                        else{
                            this.pagectrl.setNumberOfClicks(0);         //if we dont click on the correct second image, then reset the progress
                        }
                        break;
                    case 'RF':
                        if (event.target.id == 'RS' && this.pagectrl.checkClickedHeight(event.offsetY, event.target.height)) {
                            this.handleMenu('side', event);             //same way for the rest
                        }
                        else{
                            this.pagectrl.setNumberOfClicks(0);
                        }
                        break;
                    case 'LS':
                        if (event.target.id == 'LF' && this.pagectrl.checkClickedHeight(event.offsetY, event.target.height)) {
                            this.handleMenu('front', event);
                        }
                        else{
                            this.pagectrl.setNumberOfClicks(0);
                        }
                        break;
                    case 'LF':
                        if (event.target.id == 'LS' && this.pagectrl.checkClickedHeight(event.offsetY, event.target.height)) {
                            this.handleMenu('side', event);
                        }
                        else{
                            this.pagectrl.setNumberOfClicks(0);
                        }
                        break;
                    default:
                }
            }
        }
    }
    handleMenu(lat: string, event: any): void{                       //gets called when we clicked 2 correct images in a row
        switch (lat){
            case 'front':                                           //if our second image is a front image. set the click location
                this.pagectrl.setFrontLoc(event.x, event.y);
                break;
            case 'side':
                this.pagectrl.setSideLoc(event.x, event.y);         //if our second image is a side image, set the click location
                break;
            default:
        }
        this.pagectrl.setNumberOfClicks(0);                         //reset the registered clicks

        switch (this.pagectrl.getMethod()) {                        //get the selected method from the sidebar and show the correct menu (modal)
            case 'mass':
                this.pagectrl.setShowmenu('mass');
                break;
            case 'distortion':
                this.pagectrl.setShowmenu('distortion');
                break;
            case 'asymmetry':
                this.pagectrl.setShowmenu('asymmetry');
                break;
            case 'calcification':
                this.pagectrl.setShowmenu('calcification');
                break;
            default:
        }
    }
}


