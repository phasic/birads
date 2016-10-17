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

    ngOnChanges(changes){
        if(this.show) {
            this.modal1.show();
            this.pagectrl.setMenuActive(true);
        }
    }
    private shapearray: Array<string> = [       //values of shape
        'round',
        'oval',
        'irregular'
    ];
    private marginarray: Array<string> = [      //values of margin
        'circumscribed',
        'obscured',
        'microlobulated',
        'indistinct',
        'spiculated'
    ];
    private densityarray: Array<string> = [     //values of density
        'low',
        'equal',
        'high'
    ];
    private menus: Array<string> = [
        'shape',
        'margin',
        'density'
    ];
    private shape: string;                      //selected shape
    private margin: string;                     //selected margin
    private density: string;                    //selected density
    mouseControl(argument: string, finding: string): void{
        if(argument == this.menus[0]){
            this.shape = finding;
            this.modal1.hide();
            this.modal2.show();
        }
        else if(argument == this.menus[1]){
            this.margin = finding;
            this.modal2.hide();
            this.modal3.show();
        }
        else if(argument == this.menus[2]){
            this.density = finding;
            this.modal3.hide();
            this.endOfMenu();
        }
    }
    hotKeys(keycode: number, argument: string): void{
        let hotkeys: any = this.hotkeyservice.hotkeys.modal;
        if(argument == this.menus[0]) {
            this.shape = (keycode == hotkeys.one) ? this.shapearray[0] :
                (keycode == hotkeys.two) ? this.shapearray[1] :
                    (keycode == hotkeys.three) ? this.shapearray[2] : '';
            if(this.shape != '') {
                this.modal1.hide();
                this.modal2.show();
            }
        }
        else if(argument == this.menus[1]) {
            this.margin = (keycode == hotkeys.one) ? this.marginarray[0] :
                (keycode == hotkeys.two) ? this.marginarray[1] :
                    (keycode == hotkeys.three) ? this.marginarray[2] :
                        (keycode == hotkeys.four) ? this.marginarray[3] :
                            (keycode == hotkeys.five) ? this.marginarray[4] : '';
            if(this.margin != '') {
                this.modal2.hide();
                this.modal3.show();
            }
        }
        if(argument == this.menus[2]) {
            this.density = (keycode == hotkeys.one) ? this.densityarray[0] :
                (keycode == hotkeys.two) ? this.densityarray[1] :
                    (keycode == hotkeys.three) ? this.densityarray[2] : '';
            if(this.density != '') {
                this.modal3.hide();
                this.endOfMenu();
            }
        }
    }
    endOfMenu(): void{
        this.pagectrl.setMenuActive(false);
        this.pagectrl.calculateDistance();
        this.addToTable();                                    //add data to the table and dataervice
        this.pagectrl.renderBadge(this.elementref);         //create a badge on the image
    }
    addToTable(): void{                       //add the data
        this.dataservice.addMass(0, this.pagectrl.distance, this.shape, this.margin, this.density);    //bind everything to the dataervice
    }
    modalInterrupt(){               //if we cut the modal interaction short, reset the showMenu
        setTimeout(() => {
            if(!this.modal1.isShown && !this.modal2.isShown && !this.modal3.isShown && (this.pagectrl.getShowmenu()!='')){
                this.pagectrl.setShowmenu('');
                this.pagectrl.setNumberOfClicks(0);
            }
        }, 10);
    }


}


