import {Component, OnChanges, Input, ElementRef}      from '@angular/core';
import {DataService} from "../../services/data.service";
import {ModalDirective} from "ng2-bootstrap";
import {ViewChild} from "@angular/core/src/metadata/di";
import {PageController} from "../../services/page.controller";
import {HotkeyService} from "../../services/hotkey.service";
/**
 * This component contains the functionality of the asymmetries menu. Handles mouse clicks and keyboard clicks to navigate through the menus.
 *
 * Once two legal clicks are made on the images, and the asymmetries are selected on the sidebar, the asymmetries menu will pop up.
 *
 * It will bind the data to the data service once we went through the menus.
 *
 *          selector: 'asymmetries-component'
 *          templateUrl: '../../templates/modals/asymmetries.template.html'
 */
@Component({
    selector: 'asymmetries-component',
    templateUrl: '../../templates/modals/asymmetries.template.html'
})
export class AsymmetryComponent implements OnChanges{
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

    /**
     * When this input is true, show the first menu. This input is set by selecting a method in the sidebar and then
     * clicking making two legal clicks on the images.
     */
    @Input() show: boolean;
    /**
     * The first menu.
     */
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
     * if we click in a menu, mouseControl will be called.
     *
     * Set the asymmetry to the passed finding. And hide the menu, then call endOfMenu.
     * @param finding Element of the asymmetryarray
     */
    mouseControl(finding: string): void{
        this.asymmetry = finding;               //set the selected asymmetry to the right value
        this.modal1.hide();                     //hide the first menu
        this.endOfMenu();                       //go to the end of menu function, which handles the data binding and cleanup
    }

    /**
     * When a menu is shown and we press a key on the keyboard, this function will get called.
     *
     * It will set the asymmetry corresponding with the pressed key.
     * @param keycode   Keycode of the pressed key
     */
    hotKeys(keycode: number): void {
        let hotkeys: any = this.hotkeyservice.hotkeys.modal;                //get the hotkeys of the hotkey service
        this.asymmetry = {
            [hotkeys.one] : this.asymmetryarray[0],
            [hotkeys.two] : this.asymmetryarray[1],
            [hotkeys.three] : this.asymmetryarray[2],
            [hotkeys.four] : this.asymmetryarray[3]
        }[keycode] || '';
        if (this.asymmetry != '') {                                         //if a correct key is pressed
            this.modal1.hide();                                             //hide the first menu
            this.endOfMenu();                                               //go to the end of menu function, which handles the data binding and cleanup
        }
    }

    /**
     *
     * Lets the pagecontroller know there isn't an active menu anymore.
     *
     * Calculate the distance from the mammary (not used anymore)
     *
     * Adds the entered data from the menu to the table
     *
     * Render a badge on the images corresponding with the original click location.
     *
     */
    endOfMenu(): void{
        this.pagectrl.setMenuActive(false);                                 //tell the pagecontroller that the menu isn't active anymore
        this.pagectrl.calculateDistance();                                  //calculate distance (notu sed anymore, but still kept in the background)
        this.addToTable();                                                    //add the data to the dataservice, so it's shown in the tables
        this.pagectrl.renderBadge(this.elementref);                         //render a badge at the right locations we determined earlier
    }

    /**
     * Add the data selected via the menus to the dataservice so it's shown in the tables.
     */
    addToTable(): void{
        this.dataservice.addAsymmetries(this.pagectrl.distance, this.asymmetry);
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


