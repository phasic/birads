import {Component, OnChanges, Input, ElementRef}      from '@angular/core';
import { DataService } from "../../services/data.service";
import {TranslateService} from "ng2-translate";
import {ModalDirective} from "ng2-bootstrap";
import {ViewChild} from "@angular/core/src/metadata/di";
import {PageController} from "../../services/page.controller";
import {HotkeyService} from "../../services/hotkey.service";

/**
 * This component contains the functionality of the calcifications menu. Handles mouse clicks and keyboard clicks to navigate through the menus.
 *
 * Once two legal clicks are made on the images, and the calcifications are selected on the sidebar, the calcifications menu will pop up.
 *
 * It will bind the data to the data service once we went through the menus.
 *
 *          selector: 'calcification-component'
 *          templateUrl: '../../templates/modals/calcifications.template.html'
 */
@Component({
    selector: 'calcification-component',
    templateUrl: '../../templates/modals/calcifications.template.html'
})
export class CalcificationComponent implements OnChanges{
    /**
     * The menu contains a toggle button to show more selections for the morphology, initialize the right translation for this button and header.
     *
     * The constructor will initialize the following
     *
     * @param dataservice   This service stores all the data
     * @param pagectrl      Page controller manages functions to assure functionality (tracking click, adding badges, ... )
     * @param elementref    The element that contains the menu
     * @param hotkeyservice Gets the keybindings from a json file, and binds them to the right buttons
     * @param translate     Translate service
     */
    constructor(private dataservice: DataService, private pagectrl: PageController, private elementref: ElementRef, private hotkeyservice: HotkeyService,
    translate: TranslateService) {
        setTimeout(() => {
            this.togglebutton = String.fromCharCode(hotkeyservice.hotkeys.modal.toggle);
            let x: any = translate.get("TABLE.CALCIFICATION.MORPHOLOGY.HEADERNAME");
            this.headername = x.value + ' ' + this.togglebutton;
        }, 10);

        this.benign = true;
    }
    /**
     * When this input is true, show the first menu. This input is set by selecting a method in the sidebar and then
     * clicking making two legal clicks on the images.
     */
    @Input() show: string;
    /**
     * The first menu.
     */
    @ViewChild('modal1') public modal1: ModalDirective;
    /**
     * The second menu.
     */
    @ViewChild('modal2') public modal2: ModalDirective;
    /**
     * When we detect changes on the input, call this function.
     * This is used to trigger the correct menu.
     * Show the menu and mark it in the pagecontroller that a menu is showing.
     * @param changes unused parameter
     */
    ngOnChanges(changes){
        if(this.show) {                                     //if show is true, then show the first menu, 'show' is the input
            this.modal1.show();                             //show the first menu
            this.pagectrl.setMenuActive(true);              //mark it in the pagecontroller that a menu is showing
        }
    }

    /**
     * The button name of the toggle button in the header of the menu, save this so the button changes when we change the hotkeys.
     */
    private togglebutton: any;
    /**
     * the full string of the header of the menu, changes depending on keybindings and translations.
     */
    private headername: string;
    /**
     * Array to keep all possible selections of benign morphologies.
     *
     * Name the files for the images, the same as these strings.
     * @type {(string|string|string|string|string|string|string|string|string)[]}
     */
    private morphologyarraybenign: Array<string> = [
        'skin calcification',
        'milk of calcium',
        'rod-like - plasmacel mastisis',
        'dystrophic',
        'popcorn - fibroadenoma',
        'rim calcification',
        'vascular calcification',
        'round',
        'punctate'
    ];
    /**
     * Array to keep all possible selections of non benign morphologies.
     * Name the files for the images, the same as these strings.
     * @type {(string|string|string|string|string|string)[]}
     */
    private morphologyarraynotbenign: Array<string> = [
        'amorphous (benign)',
        'amorphous (DCIS)',
        'fine pleomorphic',
        'coarse heterogeneous',
        'fine linear',
        'fine linear branching'
    ];
    /**
     * Array to keep all possible selections of distributions.
     * Name the files for the images, the same as these strings.
     * @type {(string|string|string|string|string)[]}
     */
    private distributionarray: Array<string> = [
        'diffuse',
        'regional',
        'group',
        'linear',
        'segmental'
    ];
    /**
     * Array to keep all menus.
     * Name the files for the images, the same as these strings.
     * @type {(string|string)[]}
     */
    private menus: Array<string> = [
        'morphology',
        'distribution'
    ];

    /**
     * Used to toggle between benign and non-benign morphology choices.
     * @type {boolean}
     */
    private benign: boolean;
    /**
     * Store the selected morphology.
     */
    private morphology: string;
    /**
     * Store the selected distribution.
     */
    private distribution: string;

    /**
     * If we click in a menu, mouseControl will be called.
     *
     * It will check in which menu we are (first or second). And will hide it and show the next one.
     *
     * If we clicked the second menu, then go to endOfMenu.
     * @param argument Morphology or distribution
     * @param finding  String that contains an element of the selection arrays
     */
    mouseControl(argument: string, finding: string): void{
        if(argument == this.menus[0]){          //if the passed argument corresponds with the first element in the menus array (morphology)
            this.morphology = finding;          //set the morphology
            this.modal1.hide();                 //hide the first menu
            this.modal2.show();                 //show the second menu
        }
        if(argument == this.menus[1]){          //if the passed aregument corresponds with the second element in the menus array (distribution)
            this.distribution = finding;        //set the distribution
            this.modal2.hide();                 //hide the second menu
            this.endOfMenu();                   //bind the data, and clean up

        }
    }

    /**
     * Variable used to store the hotkeys of the hotkeyService. Initialize it empty.
     * @type {string}
     */
    private hotkeys: any = '';

    /**
     * When a menu is shown and we press a key on the keyboard, this function will get called.
     *
     * It will set the finding corresponding to the hotkey. Also depending on in which menu we are.
     * @param keycode code that stores the pressed key
     * @param argument morphology or distribution
     */
    hotKeys(keycode: number, argument: string): void{
        let hotkeys: any = this.hotkeyservice.hotkeys.modal;            //get the hotkeys of the hotkey service
        this.hotkeys = hotkeys;
        if(keycode == hotkeys.toggle){                                  //if the toggle button is pressed, switch between benign morph and non benign
            this.benign = !this.benign;                                 //change to the other morphology menu
        }
        if(argument == this.menus[0] && this.benign){                   //if were in the benign morphology menus
            this.morphology = {
                [hotkeys.one]: this.morphologyarraybenign[0],
                [hotkeys.two]: this.morphologyarraybenign[1],
                [hotkeys.three]: this.morphologyarraybenign[2],
                [hotkeys.four]: this.morphologyarraybenign[3],
                [hotkeys.five]: this.morphologyarraybenign[4],
                [hotkeys.six]: this.morphologyarraybenign[5],
                [hotkeys.seven]: this.morphologyarraybenign[6],
                [hotkeys.eight]: this.morphologyarraybenign[7],
                [hotkeys.nine]: this.morphologyarraybenign[8],
            }[keycode] || '';
            if(this.morphology != ''){                                  //if a correct button is pressed
                this.modal1.hide();                                     //hide the first menu
                this.modal2.show();                                     //show the second menu
            }
        }
        if(argument == this.menus[0] && !this.benign){                   //if were in the non benign morphology menus
            this.morphology = {
                [hotkeys.one]: this.morphologyarraynotbenign[0],
                [hotkeys.two]: this.morphologyarraynotbenign[1],
                [hotkeys.three]: this.morphologyarraynotbenign[2],
                [hotkeys.four]: this.morphologyarraynotbenign[3],
                [hotkeys.five]: this.morphologyarraynotbenign[4],
                [hotkeys.six]: this.morphologyarraynotbenign[5]
            }[keycode] || '';
            if(this.morphology != ''){                                  //if a correct button is pressed
                this.modal1.hide();                                     //hide the first menu
                this.modal2.show();                                     //show the second menu
            }
        }
        if(argument == this.menus[1]){                                  //ifwe are in the seoond, distribution, menu
           this.distribution = {
               [hotkeys.one]: this.distributionarray[0],
               [hotkeys.two]: this.distributionarray[1],
               [hotkeys.three]: this.distributionarray[2],
               [hotkeys.four]: this.distributionarray[3],
               [hotkeys.five]: this.distributionarray[4],
           }[keycode] || '';
            if(this.distribution != ''){                                //if a correct button is pressed
                this.modal2.hide();                                     //hide the second menu
                this.endOfMenu();                                       //go to the end of menu function, which handles the data binding and cleanup
            }
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
        this.dataservice.addCalcifications(this.pagectrl.distance, this.morphology, this.distribution);
    }
    /**
     * If we cut short the menu interaction, we need to clean everything up so we can start again.
     *
     * Set the show menu to an empty array (so we indicate that there is no menu showing). Reset the number of clicks.
     */
    modalInterrupt(){               //if we cut the modal interaction short, reset the showMenu
        setTimeout(() => {
            if(!this.modal1.isShown && !this.modal2.isShown  && (this.pagectrl.getShowmenu()!='')){
                this.pagectrl.setShowmenu('');
                this.pagectrl.setNumberOfClicks(0);
            }
        }, 10);
    }





}


