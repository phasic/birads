import {Component, OnChanges, Input, ElementRef}      from '@angular/core';
import {DataService} from "../../services/data.service";
import {ModalDirective} from "ng2-bootstrap";
import {ViewChild} from "@angular/core/src/metadata/di";
import {PageController} from "../../services/page.controller";
@Component({
    selector: 'asymmetries-component',
    templateUrl: '../../templates/modals/asymmetries.template.html'
})
export class AsymmetriesComponent implements OnChanges{
    /**
     * Constructor of AsymmetriesComponent
     * @param dataservice this service stores all the data
     * @param pagectrl page controller manages functions to assure functionality (tracking click, adding badges, ... )
     * @param elementref is the reference of the element this component is a part of
     */
    constructor(private dataservice: DataService, private pagectrl: PageController, private elementref: ElementRef) {
    }
    @Input() show: boolean;                                 //input is the variable 'show' this is used to trigger the menu to pop up
    @ViewChild('modal1') public modal1: ModalDirective;     //get a hold of the menu
    /**
     * When the input changes, this function gets called. This is used to trigger the visibility of the first menu
     *
     * @param changes
     */
    ngOnChanges(changes){                                   //when the input 'show' changes, call this
        if(this.show) {                                     //if 'show' is set, show the first menu
            this.modal1.show();
        }
    }

    /**
     * This stores all the different possible findings
     * @type {(string|string|string|string)[]}
     */
    private asymmetryarray: Array<string> = [
        'asymmetry',
        'focal asymmetry',
        'global asymmetry',
        'developing asymmetry'
    ];

    /**
     * Store the asymmetry locally, and bind it to the dataservice one we cycled through all the menus
     */
    private asymmetry: string;

    /**
     * If we click a selection on the menu, bind the finding to the asymmetry variable
     * Hide the menu, and call endOfMenu to render a badge and bind the data to the dataservice
     *
     * @param finding the finding we clicked in the menu: asymmetry, focal asymmetry, global asymmetry, developing asymmetry
     */
    mouseControl(finding: string): void{
        this.asymmetry = finding;
        this.modal1.hide();
        this.endOfMenu();
    }

    /**
     * This is called when we use the keyboard to control the menus
     * get the keycode, bind the right finding to 'asymmetry', hide the menu, set the pagectrl.showmenu to ''
     * so the rest of the page knows no menu is shown again
     * call endOfMenu()
     *
     * @param keycode tracks what key is pressed on the keyboard
     */
    hotKeys(keycode: number): void{
        switch(keycode){
            case 49:
            case 50:
            case 51:
            case 52:
                this.setFinding(keycode);
                this.modal1.hide();
                this.pagectrl.setShowmenu('');
                this.endOfMenu();
                break;
            default:
        }
    }

    /**
     * Gets the pressed key and binds the right value to 'asymmetry'
     *
     * @param keycode tracks what key is pressed on the keyboard
     */
    setFinding(keycode: number): void {
        switch(keycode){
            case 49:
                this.asymmetry = 'asymmetry';
                break;
            case 50:
                this.asymmetry= 'focal asymmetry';
                break;
            case 51:
                this.asymmetry = 'global asymmetry';
                break;
            case 52:
                this.asymmetry = "developing asymmetry";
                break;
            default:
        }
    }

    /**
     * Calls function to add the data to the dataervice, and creates a badge on the right location and calculate the distance
     */
    endOfMenu(): void{
        this.addTable();
        this.pagectrl.createBadge(this.elementref);
        this.pagectrl.calculateBadgeDistance();

    }

    /**
     * Binds the data to the dataservice
     */
    addTable(): void{
        this.dataservice.addAsymmetries(this.asymmetry);
    }

    /**
     * If we cut short the menu interaction, this gets called to reset every tracker
     */
    modalInterrupt(){               //if we cut the modal interaction short, reset the showMenu
        setTimeout(() => {
            if(!this.modal1.isShown && (this.pagectrl.getShowmenu()!='')){
                this.pagectrl.setShowmenu('');
                this.pagectrl.setNumberOfClicks(0);
            }
        }, 10);
    }


}


