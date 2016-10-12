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
    private shape: string;                      //selected shape
    private margin: string;                     //selected margin
    private density: string;                    //selected density
    mouseControl(argument: string, finding: string): void{
        if(argument == 'shape'){
            this.shape = finding;
            this.modal1.hide();
            this.modal2.show();
        }
        else if(argument == 'margin'){
            this.margin = finding;
            this.modal2.hide();
            this.modal3.show();
        }
        else if(argument == 'density'){
            this.density = finding;
            this.modal3.hide();
            this.endOfMenu();
        }
    }
    hotKeys(keycode: number, argument: string): void{
        let hotkeys: any = this.hotkeyservice.hotkeys.modal;
        if(argument == 'shape') {
            this.shape = (keycode == hotkeys.one) ? 'round' :
                (keycode == hotkeys.two) ? 'oval' :
                    (keycode == hotkeys.three) ? 'irregular' : '';
            if(this.shape != '') {
                this.modal1.hide();
                this.modal2.show();
            }
        }
        else if(argument == 'margin') {
            this.margin = (keycode == hotkeys.one) ? 'circumscribed' :
                (keycode == hotkeys.two) ? 'obscured' :
                    (keycode == hotkeys.three) ? 'microlobulated' :
                        (keycode == hotkeys.four) ? 'indistinct' :
                            (keycode == hotkeys.five) ? 'spiculated' : '';
            if(this.margin != '') {
                this.modal2.hide();
                this.modal3.show();
            }
        }
        if(argument == 'density') {
            this.density = (keycode == hotkeys.one) ? 'low' :
                (keycode == hotkeys.two) ? 'equal' :
                    (keycode == hotkeys.three) ? 'high' : '';
            if(this.shape != '') {
                this.modal3.hide();
                this.endOfMenu();
            }
        }
    }
    endOfMenu(): void{
        this.pagectrl.setMenuActive(false);
        this.pagectrl.calculateBadgeDistance();
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


