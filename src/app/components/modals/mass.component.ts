import {Component, OnChanges, Input, ElementRef}      from '@angular/core';
import { DataService } from "../../services/data.service";
import {ModalDirective} from "ng2-bootstrap";
import {ViewChild} from "@angular/core/src/metadata/di";
import {PageController} from "../../services/page.controller";
import {HotkeyService} from "../../services/hotkey.service";


@Component({
    selector: 'mass-component',
    templateUrl: '../../templates/modals/mass.template.html'
})
export class MassComponent implements OnChanges{
    constructor(private dataservice: DataService, private pagectrl: PageController,
                private elementref: ElementRef, private hotkeyservice: HotkeyService){
    }
    @Input() show: boolean;
    @ViewChild('modal1') public modal1: ModalDirective;
    @ViewChild('modal2') public modal2: ModalDirective;
    @ViewChild('modal3') public modal3: ModalDirective;
    /**
     * When we detect changes on the input, call this function.
     * This is used to trigger the correct menu.
     * Show the menu and mark it in the pagecontroller that a menu is showing.
     * @param changes unused parameter
     */
    ngOnChanges(changes){
        if(this.show) {                                      //if show is true, then show the first menu, 'show' is the input
            this.modal1.show();                             //show the first menu
            this.pagectrl.setMenuActive(true);              //mark it in the pagecontroller that a menu is showing
        }
    }

    /**
     * array to keep all possible selections of shapes
     * @type {(string|string|string)[]}
     */
    private shapearray: Array<string> = [       //values of shape
        'round',
        'oval',
        'irregular'
    ];
    /**
     * array to keep all possible selections of margins
     * @type {(string|string|string|string|string)[]}
     */
    private marginarray: Array<string> = [      //values of margin
        'circumscribed',
        'obscured',
        'microlobulated',
        'indistinct',
        'spiculated'
    ];
    /**
     * array to keep all possible selections of densities
     * @type {(string|string|string)[]}
     */
    private densityarray: Array<string> = [     //values of density
        'low',
        'equal',
        'high'
    ];
    /**
     * array to keep all possible menus
     * @type {(string|string|string)[]}
     */
    private menus: Array<string> = [
        'shape',
        'margin',
        'density'
    ];
    /**
     * selected shape
     */
    private shape: string;                      //selected shape
    /**
     * selected margin
     */
    private margin: string;                     //selected margin
    /**
     * selected density
     */
    private density: string;                    //selected density
    /**
     * if we click in a menu, mouseControl will be called
     * @param argument shape, margin or density
     * @param finding   element of the findings arrays
     */
    mouseControl(argument: string, finding: string): void{
        if(argument == this.menus[0]){          //if the passed argument corresponds with the first element in the menus array (shape)
            this.shape = finding;               //set the shape
            this.modal1.hide();                 //hide the first menu
            this.modal2.show();                 //show the second menu
        }
        else if(argument == this.menus[1]){     //if the passed aregument corresponds with the second element in the menus array (margin)
            this.margin = finding;              //set the margin
            this.modal2.hide();                 //hide the second menu
            this.modal3.show();                 //show the third menu
        }
        else if(argument == this.menus[2]){     //if the passed aregument corresponds with the third element in the menus array (density)
            this.density = finding;             //set the density
            this.modal3.hide();                 //hide the third menu
            this.endOfMenu();                   //bind the data, and clean up
        }
    }

    /**
     * When a menu is shown and we press a key on the keyboard, this function will get called
     * @param keycode code that stores the pressed key
     * @param argument shape, margin, density
     */
    hotKeys(keycode: number, argument: string): void{
        let hotkeys: any = this.hotkeyservice.hotkeys.modal;            //get the hotkeys of the hotkey service
        if(argument == this.menus[0]) {                                 //if were in the first menu
            this.shape = (keycode == hotkeys.one) ? this.shapearray[0] :    //check which button is pressed and bind the corresponding value
                (keycode == hotkeys.two) ? this.shapearray[1] :
                    (keycode == hotkeys.three) ? this.shapearray[2] : '';   //default or wrong button is an empty string
            if(this.shape != '') {                                      //if we pressed a correct button
                this.modal1.hide();                                     //hide the first menu
                this.modal2.show();                                     //show the second menu
            }
        }
        else if(argument == this.menus[1]) {                            //if were in the second menu
            this.margin = (keycode == hotkeys.one) ? this.marginarray[0] :  //check which button is pressed and bind the corresponding value
                (keycode == hotkeys.two) ? this.marginarray[1] :
                    (keycode == hotkeys.three) ? this.marginarray[2] :
                        (keycode == hotkeys.four) ? this.marginarray[3] :
                            (keycode == hotkeys.five) ? this.marginarray[4] : '';   //default or wrong button is an empty string
            if(this.margin != '') {                                     //if we pressed a correct button
                this.modal2.hide();                                     //hide the second menu
                this.modal3.show();                                     //show the third menu
            }
        }
        if(argument == this.menus[2]) {                                 //if where in the third menu
            this.density = (keycode == hotkeys.one) ? this.densityarray[0] :    //check which button is pressed and bind the corresponding value
                (keycode == hotkeys.two) ? this.densityarray[1] :
                    (keycode == hotkeys.three) ? this.densityarray[2] : '';     //default or wrong button is an empty string
            if(this.density != '') {                                    //if we pressed a correct button
                this.modal3.hide();                                     //hide the third menu
                this.endOfMenu();                                       //bind the data, and clean up
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
    addToTable(): void{                       //add the data
        this.dataservice.addMass(0, this.pagectrl.distance, this.shape, this.margin, this.density);    //bind everything to the dataervice
    }
    /**
     * If we cut short the menu interaction, we need to clean everything up so we can start again
     */
    modalInterrupt(){               //if we cut the modal interaction short, reset the showMenu
        setTimeout(() => {
            if(!this.modal1.isShown && !this.modal2.isShown && !this.modal3.isShown && (this.pagectrl.getShowmenu()!='')){
                this.pagectrl.setShowmenu('');
                this.pagectrl.setNumberOfClicks(0);
            }
        }, 10);
    }


}


