import {Component, OnChanges, Input, ElementRef}      from '@angular/core';
import { DataService } from "../../services/data.service";
import {TranslateService} from "ng2-translate";
import {ModalDirective} from "ng2-bootstrap";
import {ViewChild} from "@angular/core/src/metadata/di";
import {PageController} from "../../services/page.controller";


@Component({
    selector: 'distortion-component',
    templateUrl: '../../templates/modals/distortion.template.html'
})
export class DistortionComponent implements OnChanges{
    constructor(private dataservice: DataService, private pagectrl: PageController, private elementref: ElementRef) {
    }
    @Input() show: string;
    /**
     * When we detect changes on the input, call this function.
     * This is used to trigger the correct menu.
     * Show the menu and mark it in the pagecontroller that a menu is showing.
     * @param changes unused parameter
     */
    ngOnChanges(changes){
        if(this.show) {                                     //if show is true, then show the first menu, 'show' is the input
            this.endOfMenu();                               //bind the data, and clean up
            setTimeout(() => { this.pagectrl.setShowmenu('');},10);  //wait 10 ms and reset the show menu variable
        }
    }
    /**
     * Handles the data binding to the dataservice and cleans up. So we can restart adding findings to the maps
     */
    endOfMenu(): void{
        this.pagectrl.calculateDistance();                                  //calculate distance (notu sed anymore, but still kept in the background)
        this.addToTable();                                                    //add the data to the dataservice, so it's shown in the tables
        this.pagectrl.renderBadge(this.elementref);                         //render a badge at the right locations we determined earlier
    }
    /**
     * Add the data selected to the dataservice so it's shown in the tables
     */
    addToTable(): void{
        this.dataservice.addDistortions(this.pagectrl.distance, "architectural distortion");

    }




}


