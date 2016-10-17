import {Component, ElementRef}      from '@angular/core';
import {PageController} from "../../services/page.controller";
import {DataService} from "../../services/data.service";
import {element} from "protractor";
@Component({
    selector: 'map-component',
    templateUrl: '../../templates/map/map.template.html'
})
export class MapComponent {
    /**
     * Constructor of MapComponent
     * @param dataservice
     * @param pagectrl page controller manages functions to assure functionality (tracking click, adding badges, ... )
     * @param elementref
     */
    constructor(private dataservice: DataService, private pagectrl: PageController, private elementref: ElementRef) {

    }
    clickHandler(event: any): void {
        this.clickedMap(event);
    }
    private firstimage: string;
    clickedMap(event: any): void{ //function gets called when an image is clicked
        if(!this.pagectrl.isMenuShown() && (this.pagectrl.getMethod() !== '')) { //if the menu is not shown and we selected a method
            this.pagectrl.setImages();
            if (this.firstClick()) {                                            //check if its the first time we clicked an image
                this.pagectrl.setClickLocation(event.target, event, true);
                this.renderFirstClickMarker(event);
                this.firstimage = event.target.id;                      //keep the id of the first clicked image
            }
            else{       //if it isn't the first time we clicked, and we clicked the correct height
                if ((this.firstimage == 'RS' && event.target.id == 'RF') ||
                    (this.firstimage == 'LS' && event.target.id == 'LF') ||
                    (this.firstimage == 'RF' && event.target.id == 'RS') ||
                    (this.firstimage == 'LF' && event.target.id == 'LS')){
                    this.pagectrl.setClickLocation(event.target, event);
                    MapComponent.removeFirstClickMarker();
                    this.pagectrl.setShowmenu(this.pagectrl.getMethod());
                    this.pagectrl.setNumberOfClicks(0);
                }
                else{
                    MapComponent.removeFirstClickMarker();
                    this.pagectrl.setNumberOfClicks(0);
                }

            }
        }
    }
    firstClick(): boolean{
        this.pagectrl.setNumberOfClicks(this.pagectrl.getNumberOfClicks() + 1);
        return this.pagectrl.getNumberOfClicks() == 1;
    }
    renderFirstClickMarker(event: any): void{
        let clickedX: number = event.clientX;
        let clickedY: number = event.clientY;
        let tmp: any = document.createElement('div');
        tmp.innerHTML = `<div class='circle-firstclick'></div>`;
        tmp.id = 'firstlocation';
        tmp.style = `position: fixed; top:${clickedY}; left:${clickedX}`;
        this.elementref.nativeElement.appendChild(tmp);
    }
    calculateFirstClickLocation(clickedX: number, clickedY: number){
        let index: number = 0;
        let relX: number;
        let relY: number;
        let image: any;
        for(let element of this.pagectrl.images){
            if(clickedX > element.locX &&
                clickedX < (element.locX + element.width) &&
                clickedY > element.locY &&
                clickedY < (element.locY + element.height)){
                relX = (clickedX - element.locX) / element.width;
                relY = (clickedY - element.locY) / element.height;
                image = element;
                break;
            }
            index++;
        }
        this.pagectrl.firstclicklocation = { relX : relX, relY: relY, imagenumber: index};

    }

    static removeFirstClickMarker(): void{
        let elements: any = document.getElementsByClassName('circle-firstclick');
        for(let i = 0; i < elements.length; i++){
            elements[i].parentNode.remove();
        }
    }
}


