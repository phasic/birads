import {Component, ElementRef}      from '@angular/core';
import {PageController} from "../../services/page.controller";
import {DataService} from "../../services/data.service";
@Component({
    selector: 'map-component',
    templateUrl: '../../templates/map/map.template.html'
})
export class MapComponent {
    /**
     * Constructor of MapComponent
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
            if (this.firstClick()) {                                            //check if its the first time we clicked an image
                this.pagectrl.setClickedImage(event.target, event, true);
                this.renderFirstClickMarker(event);
                this.firstimage = event.target.id;                      //keep the id of the first clicked image
            }
            else{       //if it isn't the first time we clicked, and we clicked the correct height
                if ((this.firstimage == 'RS' && event.target.id == 'RF') ||
                    (this.firstimage == 'LS' && event.target.id == 'LF') ||
                    (this.firstimage == 'RF' && event.target.id == 'RS') ||
                    (this.firstimage == 'LF' && event.target.id == 'LS')){
                    this.pagectrl.setClickedImage(event.target, event);
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
        let clickedX: number = event.offsetX + event.target.x;
        let clickedY: number = event.offsetY + event.target.y;
        let tmp: any;
        tmp = document.createElement('div');
        tmp.innerHTML = `<div class='circle-firstclick'></div>`;
        tmp.id = 'firstlocation';
        tmp.style = `position: fixed; top:${clickedY}; left:${clickedX}`;
        this.elementref.nativeElement.appendChild(tmp);

        let imgdiv: any = document.getElementById('images').getBoundingClientRect();
        clickedX -= imgdiv.left;
        clickedY -= imgdiv.top;
        this.pagectrl.firstclicklocation = {x : clickedX, y: clickedY};
    }
    static removeFirstClickMarker(): void{
        let elements: any = document.getElementsByClassName('circle-firstclick');
        for(let i = 0; i < elements.length; i++){
            elements[i].parentNode.remove();
        }


    }
}


