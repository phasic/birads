import {Component, OnChanges, Input, ElementRef}      from '@angular/core';
import {DataService} from "../../services/data.service";
import {ModalDirective} from "ng2-bootstrap";
import {ViewChild} from "@angular/core/src/metadata/di";
import {PageController} from "../../services/page.controller";
import {HotkeyService} from "../../services/hotkey.service";
@Component({
    selector: 'asymmetries-component',
    templateUrl: '../../templates/modals/asymmetries.template.html'
})
export class AsymmetryComponent implements OnChanges{
    /**
     *
     * @param dataservice
     * @param pagectrl
     * @param elementref
     * @param hotkeyservice
     */
    constructor(private dataservice: DataService, private pagectrl: PageController,
                private elementref: ElementRef, private hotkeyservice: HotkeyService) {
    }
    @Input() show: boolean;
    @ViewChild('modal1') public modal1: ModalDirective;

    /**
     * When we detect changes on the input, call this function.
     * This is used to trigger the correct menu.
     * Show the menu and mark it in the pagecontroller that a menu is showing.
     * @param changes unused parameter
     */
    ngOnChanges(changes){
        if(this.show) {                         //if show is true, then show the first menu, 'show' is the input
            this.modal1.show();                 //show the first menu
            this.pagectrl.setMenuActive(true);  //mark it in the pagecontroller that a menu is showing
        }
    }

    /**
     * array to keep all possible selections of asymmetries
     * @type {(string|string|string|string)[]}
     */
    private asymmetryarray: Array<string> = [
        'asymmetry',
        'focal asymmetry',
        'global asymmetry',
        'developing asymmetry'
    ];
    /**
     * variable to keep track of the selected asymmetry
     */
    private asymmetry: string;

    /**
     * if we click in a menu, mouseControl will be called
     * @param finding element of the asymmetryarray
     */
    mouseControl(finding: string): void{
        this.asymmetry = finding;               //set the selected asymmetry to the right value
        this.modal1.hide();                     //hide the first menu
        this.endOfMenu();                       //go to the end of menu function, which handles the data binding and cleanup
    }

    /**
     * When a menu is shown and we press a key on the keyboard, this function will get called
     * @param keycode   keycode of the pressed key
     */
    hotKeys(keycode: number): void {
        let hotkeys: any = this.hotkeyservice.hotkeys.modal;                //get the hotkeys of the hotkey service
        this.asymmetry = (keycode == hotkeys.one) ? this.asymmetryarray[0] :    //check which key is pressed, and select the correct value to bind
            (keycode == hotkeys.two) ? this.asymmetryarray[1] :
                (keycode == hotkeys.three) ? this.asymmetryarray[2] :
                    (keycode == hotkeys.four) ? this.asymmetryarray[3] : '';    //keep  the selection empty if a wrong key is pressed
        if (this.asymmetry != '') {                                         //if a correct key is pressed
            this.modal1.hide();                                             //hide the first menu
            this.endOfMenu();                                               //go to the end of menu function, which handles the data binding and cleanup
        }
    }

    /**
     * Handles the data binding to the dataservice and cleans up. So we can restart adding findings to the maps
     */
    endOfMenu(): void{
        this.pagectrl.setMenuActive(false);                                 //tell the pagecontroller that the menu isn't active anymore
        this.pagectrl.calculateDistance();                                  //calculate distance (notu sed anymore, but still kept in the background)
        this.addToTable();                                                    //add the data to the dataservice, so it's shown in the tables
        this.pagectrl.renderBadge(this.elementref);                         //render a badge at the right locations we determined earlier
    }

    /**
     * Add the data selected via the menu's to the dataservice so it's shown in the tables
     */
    addToTable(): void{
        this.dataservice.addAsymmetries(this.pagectrl.distance, this.asymmetry);
    }

    /**
     * If we cut short the menu interaction, we need to clean everything up so we can start again
     */
    modalInterrupt(){
        setTimeout(() => {
            if(!this.modal1.isShown && (this.pagectrl.getShowmenu()!='')){
                this.pagectrl.setShowmenu('');
                this.pagectrl.setNumberOfClicks(0);
            }
        }, 10);
    }


}


