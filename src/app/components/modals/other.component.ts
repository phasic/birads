import {Component, OnChanges, Input, ElementRef}      from '@angular/core';
import {DataService} from "../../services/data.service";
import {ModalDirective} from "ng2-bootstrap";
import {ViewChild} from "@angular/core/src/metadata/di";
import {PageController} from "../../services/page.controller";
import {HotkeyService} from "../../services/hotkey.service";
/**
 * This component contains the functionality of the other menu. Handles mouse clicks and keyboard clicks to navigate through the menus.
 *
 * It will bind the data to the data service once we went through the menus.
 *
 *          selector: 'other-component'
 *          templateUrl: '../../templates/modals/other.template.html'
 */
@Component({
    selector: 'other-component',
    templateUrl: '../../templates/modals/other.template.html'
})
export class OtherComponent implements OnChanges{
    /**
     * The constructor will initialize the following
     * @param dataservice   This service stores all the data
     * @param pagectrl      Page controller manages functions to assure functionality (tracking click, adding badges, ... )
     * @param elementref    The element that contains the menu
     * @param hotkeyservice Gets the keybindings from a json file, and binds them to the right buttons
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
     * Array to keep all possible selections of others.
     * @type {(string|string|string|string)[]}
     */
    private otherarray: Array<string> = [
        'palpitation',
        'scar'
    ];
    /**
     * Variable to keep track of the selected 'other'.
     */
    private other: string;

    /**
     * If we click in a menu, mouseControl will be called.
     *
     * Set the 'other' to the passed finding. And hide the menu, then call endOfMenu.
     * @param finding Element of the otherarray
     */
    mouseControl(finding: string): void{
        this.other = finding;               //set the selected 'other' to the right value
        this.modal1.hide();                     //hide the first menu
        this.endOfMenu();                       //go to the end of menu function, which handles the data binding and cleanup
    }

    /**
     * When a menu is shown and we press a key on the keyboard, this function will get called
     *
     * It will set the finding corresponding with the pressed key.
     *  @param keycode   Keycode of the pressed key
     */
    hotKeys(keycode: number): void {
        let hotkeys: any = this.hotkeyservice.hotkeys.modal;                //get the hotkeys of the hotkey service
        this.other = {
                [hotkeys.one] : this.otherarray[0],
                [hotkeys.two] : this.otherarray[1]
            }[keycode] || '';
        if (this.other != '') {                                         //if a correct key is pressed
            this.modal1.hide();                                             //hide the first menu
            this.endOfMenu();                                               //go to the end of menu function, which handles the data binding and cleanup
        }
    }

    /**
     * Handles the data binding to the dataservice and cleans up. So we can restart adding findings to the maps.
     *
     * set the menu inactive (no menu showing), calculate the distance (not used anymore), add the data to the table and render the badge.
     */
    endOfMenu(): void{
        this.pagectrl.setMenuActive(false);                                 //tell the pagecontroller that the menu isn't active anymore
        this.pagectrl.calculateDistance();                                  //calculate distance (notu sed anymore, but still kept in the background)
        this.addToTable();                                                    //add the data to the dataservice, so it's shown in the tables
        this.pagectrl.renderBadge(this.elementref);                         //render a badge at the right locations we determined earlier
    }

    /**
     * Add the data selected via the menu's to the dataservice so it's shown in the tables.
     */
    addToTable(): void{
        this.dataservice.addOther(this.pagectrl.distance, this.other);
    }

    /**
     * If we cut short the menu interaction, we need to clean everything up so we can start again.
     *
     * Set the show menu to an empty array (so we indicate that there is no menu showing). Reset the number of clicks.
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


