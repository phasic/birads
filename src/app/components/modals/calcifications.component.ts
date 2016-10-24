import {Component, OnChanges, Input, ElementRef}      from '@angular/core';
import { DataService } from "../../services/data.service";
import {TranslateService} from "ng2-translate";
import {ModalDirective} from "ng2-bootstrap";
import {ViewChild} from "@angular/core/src/metadata/di";
import {PageController} from "../../services/page.controller";
import {HotkeyService} from "../../services/hotkey.service";


@Component({
    selector: 'calcification-component',
    templateUrl: '../../templates/modals/calcifications.template.html'
})
export class CalcificationComponent implements OnChanges{
    constructor(private dataservice: DataService, private pagectrl: PageController, private elementref: ElementRef, private hotkeyservice: HotkeyService,
    translate: TranslateService) {
        setTimeout(() => {
            this.togglebutton = String.fromCharCode(hotkeyservice.hotkeys.modal.toggle);
            let x: any = translate.get("TABLE.CALCIFICATION.MORPHOLOGY.HEADERNAME");
            this.headername = x.value + ' ' + this.togglebutton;
        }, 10);
    }
    @Input() show: string;
    @ViewChild('modal1') public modal1: ModalDirective;
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
     * The button name of the toggle button in the header of the menu, save this so the button changes when we change the hotkeys
     */
    private togglebutton: any;
    /**
     * the full string of the header of the menu, changes depending on keybinds and translations
     */
    private headername: string;
    /**
     * array to keep all possible selections of benign morphologies
     * name the files for the images, the same as these strings
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
     * array to keep all possible selections of non benign morphologies
     * name the files for the images, the same as these strings
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
     * array to keep all possible selections of distributions
     * name the files for the images, the same as these strings
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
     * array to keep all menus
     * name the files for the images, the same as these strings
     * @type {(string|string)[]}
     */
    private menus: Array<string> = [
        'morphology',
        'distribution'
    ];

    /**
     * used to toggle between benign and non-benign morphology choices
     * @type {boolean}
     */
    private benign: boolean = true;
    /**
     * store the selected morphology
     */
    private morphology: string;
    /**
     * store the selected distribution
     */
    private distribution: string;

    /**
     * if we click in a menu, mouseControl will be called
     * @param argument morphology or distribution
     * @param finding  string that contains an element of the selection arrays
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

    private hotkeys: any = '';

    /**
     * When a menu is shown and we press a key on the keyboard, this function will get called
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
            this.morphology = (keycode == hotkeys.one) ? this.morphologyarraybenign[0] :        //check which button is pressed, and bind the corresponding value
                (keycode == hotkeys.two) ? this.morphologyarraybenign[1] :
                    (keycode == hotkeys.three) ? this.morphologyarraybenign[2] :
                        (keycode == hotkeys.four) ? this.morphologyarraybenign[3] :
                            (keycode == hotkeys.five) ? this.morphologyarraybenign[4] :
                                (keycode == hotkeys.six) ? this.morphologyarraybenign[5] :
                                    (keycode == hotkeys.seven) ? this.morphologyarraybenign[6] :
                                        (keycode == hotkeys.eight) ? this.morphologyarraybenign[7] :
                                            (keycode == hotkeys.nine) ? this.morphologyarraybenign[8] : ''; //default, or wrong button pressed is an empty string
            if(this.morphology != ''){                                  //if a correct button is pressed
                this.modal1.hide();                                     //hide the first menu
                this.modal2.show();                                     //show the second menu
            }
        }
        if(argument == this.menus[0] && !this.benign){                   //if were in the non benign morphology menus
            this.morphology = (keycode == hotkeys.one) ? this.morphologyarraynotbenign[0] ://check which button is pressed, and bind the corresponding value
                (keycode == hotkeys.two) ? this.morphologyarraynotbenign[1] :
                    (keycode == hotkeys.three) ? this.morphologyarraynotbenign[2] :
                        (keycode == hotkeys.four) ? this.morphologyarraynotbenign[3] :
                            (keycode == hotkeys.five) ? this.morphologyarraynotbenign[4] :
                                (keycode == hotkeys.six) ? this.morphologyarraynotbenign[5] : '';//default, or wrong button pressed is an empty string
            if(this.morphology != ''){                                  //if a correct button is pressed
                this.modal1.hide();                                     //hide the first menu
                this.modal2.show();                                     //show the second menu
            }
        }
        if(argument == this.menus[1]){                                  //ifwe are in the seoond, distribution, menu
            this.distribution = (keycode == hotkeys.one) ? this.distributionarray[0] :  //check which button is pressed, and bind the corresponding value
                (keycode == hotkeys.two) ? this.distributionarray[1] :
                    (keycode == hotkeys.three) ? this.distributionarray[2] :
                        (keycode == hotkeys.four) ? this.distributionarray[3] :
                            (keycode == hotkeys.five) ? this.distributionarray[4] : '';//default, or wrong button pressed is an empty string
            if(this.distribution != ''){                                //if a correct button is pressed
                this.modal2.hide();                                     //hide the second menu
                this.endOfMenu();                                       //go to the end of menu function, which handles the data binding and cleanup
            }
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
        this.dataservice.addCalcifications(this.pagectrl.distance, this.morphology, this.distribution);
    }
    /**
     * If we cut short the menu interaction, we need to clean everything up so we can start again
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


