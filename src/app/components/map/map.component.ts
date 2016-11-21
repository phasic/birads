import {Component, ElementRef}      from '@angular/core';
import {PageController} from "../../services/page.controller";
import {DataService} from "../../services/data.service";
/**
 * This component contains the breast images, and all the needed functionality for those images
 *
 * When we have a method selected from the sidebar, and we click an image for the first time,
 * a small transparent annotation will be rendered to show the user where he clicked.
 *
 * When we click a second image, there will be a check if it's a legal click.
 *
 * A legal click is:
 *
 * A second click on the same breast (left or right), but on the other perspective.
 *
 * When an illegal click is made (clicked on wrong corresponding image, the same image twice, out of the image),
 * the transparent badge will disappear and the user needs to place the first click again.
 *
 *
 * Once a second legal click is made, the menu of the selected method will pop up. From there the pagecontroller takes over.
 *
 *          selector: 'map-component'
 *          templateUrl: '../../templates/map/map.template.html'
 */
@Component({
    selector: 'map-component',
    templateUrl: '../../templates/map/map.template.html'
})
export class MapComponent {
    /**
     * Constructor of MapComponent.
     *
     * This controller initializes the following
     * @param dataservice   This service stores all the data.
     * @param pagectrl      PageController manages functions to assure functionality (tracking click, adding badges, ... ).
     * @param elementref    References the element containing the images.
     */
    constructor(private dataservice: DataService, private pagectrl: PageController, private elementref: ElementRef) {
    }
    /**
     * Gets called when an image is clicked. It gets the click event and passes it to clickedMap.
     * @param event The click event.
     */
    clickHandler(event: any): void {
        this.clickedMap(event);
    }
    /**
     * Stores the first clicked image by id.
     */
    private firstimage: string;
    /**
     * Gets called in clickHandler.
     * This function executes a sequence of checks to see if the clicks are 'legal' clicks, if they are, show the right menu.
     *
     * First it will check that there isn't a menu shown and if a method is selected. It will then check if it's the first time we clicked an image. If so, store the click location and render a marker.
     * If it isn't the first time we clicked an image, we will check if the second image we clicked is a 'legal' click (same breast other perspective). If that is the case, then show the menu of the selected method.
     *
     * If we didn't click a legal second click, reset everything (remove the first click marker, and set the number of clicks to 0).
     * @param event Is the event which is the origin of the click trigger.
     */
    clickedMap(event: any): void{ //function gets called when an image is clicked
        if(!this.pagectrl.isMenuShown() && (this.pagectrl.getMethod() !== '')) { //if the menu is not shown and we selected a method
            this.pagectrl.setImages();                                          //update the stored images ( size, location, ...)
            if (this.firstClick()) {                                            //check if its the first time we clicked an image
                this.pagectrl.setClickLocation(event.target, event, true);      //set the first click location
                this.renderFirstClickMarker(event);                             //render a badge to offer some feedback of the first click location
                this.firstimage = event.target.id;                              //keep the id of the first clicked image
            }
            else{       //if it isn't the first time we clicked
                if ((this.firstimage == 'RS' && event.target.id == 'RF') ||     //check if we clicked a corresponding image. if we first clicked Right Side, then now we want Right Front
                    (this.firstimage == 'LS' && event.target.id == 'LF') ||     //check for the other possibilities too
                    (this.firstimage == 'RF' && event.target.id == 'RS') ||
                    (this.firstimage == 'LF' && event.target.id == 'LS')){
                    this.pagectrl.setClickLocation(event.target, event);        //If we have a legal click sequence, set the clicked location
                    MapComponent.removeFirstClickMarker();                      //delete the first clicked marker
                    this.pagectrl.setShowmenu(this.pagectrl.getMethod());       //show the right menu
                    this.pagectrl.setNumberOfClicks(0);                         //reset the number of clicks ( so we can re-detect a first click)
                }
                else{
                    MapComponent.removeFirstClickMarker();                      //if it wasnt a legal second click, remove the first marer, reset the number of clicks ( reset the squence)
                    this.pagectrl.setNumberOfClicks(0);
                }

            }
        }
    }
    /**
     * Checks if it's the first time we click an image.
     *
     * Increments the number of clicks and check if it's equal to 1. If so, return true.
     * @returns {boolean} True if it's the first time we clicked an image.
     */
    firstClick(): boolean{
        this.pagectrl.setNumberOfClicks(this.pagectrl.getNumberOfClicks() + 1); //increment the number of clicks
        return this.pagectrl.getNumberOfClicks() == 1;                          //if it's 1, then it's the first time we clicked an image, return true
    }
    /**
     * Renders a marker after we clicked for the first time on an image. This offers the user visual feedback of the first click.
     * @param event Pass the event to get the clicked location
     */
    renderFirstClickMarker(event: any): void{
        let clickedX: number = event.clientX;                                   //get the x coordinate of the click (absolute)
        let clickedY: number = event.clientY;                                   //get the y coordinate of the click (absolute)
        let tmp: any = document.createElement('div');                           //create a new div element to render a badge in
        tmp.innerHTML = `<div class='circle-firstclick'></div>`;                //create a badge in the new div
        tmp.id = 'firstlocation';                                               //set the id
        tmp.style = `position: fixed; top:${clickedY}; left:${clickedX}`;       //set the correct location (clicklocation)
        this.elementref.nativeElement.appendChild(tmp);                         //add it to the body
    }

    /**
     * When we have an illegal click, or we are going to show the menu, delete the first clicked marker.
     */
    static removeFirstClickMarker(): void{
        let elements: any = document.getElementsByClassName('circle-firstclick');//get all elements with this class (it should be one, but just to be sure we delete them all)
        for(let i = 0; i < elements.length; i++){                               //iterate over all found elements
            elements[i].parentNode.remove();                                    //get the parent ( the div) and delete them
        }
    }
}


