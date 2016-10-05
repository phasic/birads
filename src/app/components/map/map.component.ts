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

    clickedMap(event: any): void{
        if(!this.pagectrl.isMenuShown() && (this.pagectrl.getMethod() !== '')) {
            this.pagectrl.addClick();
            if (this.pagectrl.getNumberOfClicks() == 1) {               //check if its the first time we clicked an image
                this.pagectrl.setClickedHeight(event.offsetY/event.target.height); //keep the clickheight if <0.5 --> 0.5/ if > 0.5 --> 1
                if (['RF', 'LF'].indexOf(event.target.id) !== -1) {
                    this.pagectrl.setFrontLoc(event.x, event.y);
                }
                if (['RS', 'LS'].indexOf(event.target.id) !== -1) {
                    this.pagectrl.setSideLoc(event.x, event.y);
                }
                this.firstimage = event.target.id;
            }
            else {                                                      //if it isn't the first time
                switch (this.firstimage) {
                    case 'RS':
                        if (event.target.id == 'RF' && this.pagectrl.checkClickedHeight(event.offsetY, event.target.height)) {
                            this.handleMenu('front', event);
                        }
                        else{
                            this.pagectrl.setNumberOfClicks(0);         //if we dont click on the correct second image, then reset the progress
                        }
                        break;
                    case 'RF':
                        if (event.target.id == 'RS' && this.pagectrl.checkClickedHeight(event.offsetY, event.target.height)) {
                            this.handleMenu('side', event);
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

    handleMenu(lat: string, event: any): void{
        switch (lat){
            case 'front':
                this.pagectrl.setFrontLoc(event.x, event.y);
                break;
            case 'side':
                this.pagectrl.setSideLoc(event.x, event.y);
                break;
            default:
        }
        this.pagectrl.setNumberOfClicks(0);

        switch (this.pagectrl.getMethod()) {
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



    test(event){
        console.log("IN TEST");

        let imgheight: number = event.target.height;
        let imgwidth: number = event.target.width;

        let clickheight: number = event.offsetY;
        let clickwidth: number = event.offsetX;
        // console.log(event);
        // console.log(`height: ${imgheight}, width: ${imgwidth}, ratio: ${imgheight/imgwidth}`);
        // console.log(`click: (X,Y): (${clickwidth}, ${clickheight})`);


        if((clickheight/imgheight) > 0.5){
            console.log("over 50%");
        }
    }
}


