import {Component}      from '@angular/core';
import {PageController} from "../../services/page.controller";
@Component({
    selector: 'map-component',
    templateUrl: '../../templates/map/map.template.html'
})
export class MapComponent {
    constructor(private pagectrl: PageController) {
        this.pagectrl = pagectrl;
    }
    clickHandler(event: any): void {
        //fist click, check which image we clicked
        this.clickedMap(event);

    }
    private firstimage: string;

    clickedMap(event: any): void{
        console.log("evenement");
        console.log(event);
        if(!this.pagectrl.isMenuShown()) {
            this.pagectrl.addClick();
            if (this.pagectrl.getNumberOfClicks() == 1) {
                if (['RF', 'LF'].indexOf(event.target.id) !== -1) {
                    //we clicked on a front image
                    this.pagectrl.setFrontLoc(event.x, event.y);
                }
                if (['RS', 'LS'].indexOf(event.target.id) !== -1) {
                    //we clicked on a side image
                    this.pagectrl.setSideLoc(event.x, event.y); //TODO WE NEED TO CHANGE THIS LATER ON TO USEABLE VALUES
                }
                this.firstimage = event.target.id;
            }
            else {
                switch (this.firstimage) {
                    case 'RS':
                        if (event.target.id == 'RF') {
                            this.handleMenu('front', event);
                        }
                        break;
                    case 'RF':
                        if (event.target.id == 'RS') {
                            this.handleMenu('side', event);
                        }
                        break;
                    case 'LS':
                        if (event.target.id == 'LF') {
                            this.handleMenu('front', event);
                        }
                        break;
                    case 'LF':
                        if (event.target.id == 'LS') {
                            this.handleMenu('side', event);
                        }
                        break;
                    default:
                }

            }

        }
    }

    handleMenu(lat: string, event: any): void{
        switch (lat){           //set the second pair of coordinates
            case 'front':
                this.pagectrl.setFrontLoc(event.x, event.y);
                break;
            case 'side':
                this.pagectrl.setSideLoc(event.x, event.y);
                break;
            default:
        }
        this.pagectrl.setNumberOfClicks(0); //reset the amout of clicks
        //show the modal
        switch (this.pagectrl.getMethod()) { //is set by the sidebar
            case 'mass':
                this.pagectrl.setShowmenu('mass');
                break;
            case 'distortion':
                this.pagectrl.setShowmenu('distortion');
                break;
            case 'asymmetries':
                this.pagectrl.setShowmenu('asymmetries');
                break;
            case 'calcifications':
                this.pagectrl.setShowmenu('calcifications');
                break;
            default:
        }
    }
}


