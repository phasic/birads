import {Component, OnChanges, Input, ElementRef}      from '@angular/core';
import { DataService } from "../../services/data.service";
import {ModalDirective} from "ng2-bootstrap";
import {ViewChild} from "@angular/core/src/metadata/di";
import {PageController} from "../../services/page.controller";


@Component({
    selector: 'mass-component',
    templateUrl: '../../templates/modals/mass.template.html'
})
export class MassComponent implements OnChanges{
    constructor(private dataservice: DataService, private pagectrl: PageController, private elementref: ElementRef){
    }
    @Input() show: boolean;
    @ViewChild('modal1') public modal1: ModalDirective;
    @ViewChild('modal2') public modal2: ModalDirective;
    @ViewChild('modal3') public modal3: ModalDirective;

    ngOnChanges(changes){
        if(this.show) {
           this.modal1.show();
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
        switch (argument){
            case 'shape':
                this.shape = finding;
                this.modal1.hide();
                this.modal2.show();
                break;
            case 'margin':
                this.margin = finding;
                this.modal2.hide();
                this.modal3.show();
                break;
            case 'density':
                this.density = finding;
                this.modal3.hide();
                this.endOfMenu();
                break;
            default:
        }
    }
    hotKeys(keycode: number, argument: string): void{
        switch(keycode + argument){
            case 49+'shape':    //1
            case 50+'shape':    //2
            case 51+'shape':    //3
                this.setFinding(keycode,argument);  //set this.shape to the right value
                this.modal1.hide();                 //hide the first menu
                this.modal2.show();                 //show the second menu
                break;
            case 49+'margin':   //1
            case 50+'margin':   //2
            case 51+'margin':   //3
            case 52+'margin':   //4
            case 53+'margin':   //5
                this.setFinding(keycode,argument);  //set this.margin to the right value
                this.modal2.hide();                 //hide the second menu
                this.modal3.show();                 //show the third menu
                break;
            case 49+'density':  //1
            case 50+'density':  //2
            case 51+'density':  //3
                this.setFinding(keycode,argument);  //set this.density to the right valuw
                this.modal3.hide();                 //hide the third menu
                this.pagectrl.setShowmenu('');      //no menu is shown anymore
                this.endOfMenu();                   //bind local data to dataservice, create badge
                break;
            default:
        }
    }
    setFinding(keycode: number, argument: string): void {      //bind the right values to the local variables
        switch(keycode + argument){
            case 49+'shape':
                this.shape = 'round';
                break;
            case 50+'shape':
                this.shape = 'oval';
                break;
            case 51+'shape':
                this.shape = 'irregular';
                break;
            case 49+'margin':
                this.margin = 'circumscribed';
                break;
            case 50+'margin':
                this.margin = 'obscured';
                break;
            case 51+'margin':
                this.margin = 'microlobulated';
                break;
            case 52+'margin':
                this.margin = 'indistinct';
                break;
            case 53+'margin':
                this.margin = 'spiculated';
                break;
            case 49+'density':
                this.density = 'low';
                break;
            case 50+'density':
                this.density = 'equal';
                break;
            case 51+'density':
                this.density = 'high';
                break;
            default:
        }
    }
    endOfMenu(): void{
        this.addTable();                                    //add data to the table and dataervice
        this.pagectrl.createBadge(this.elementref);         //create a badge on the image
    }
    addTable(): void{                       //add the data
        let sx ,sy, fx, fy: number;                         //get the clicked locations
        sx = this.pagectrl.getSideX();
        sy = this.pagectrl.getSideY();
        fx = this.pagectrl.getFrontX();
        fy = this.pagectrl.getFrontY();
        this.dataservice.addMass(0, sx, sy, fx, fy,  this.shape, this.margin, this.density);    //bind everything to the dataervice
    }

    modalInterrupt(){               //if we cut the modal interaction short, reset the showMenu
        setTimeout(() => {
            if(!this.modal1.isShown && !this.modal2.isShown && !this.modal3.isShown && (this.pagectrl.getShowmenu()!='')){
                this.pagectrl.setShowmenu('');
                this.pagectrl.setNumberOfClicks(0);
            }
        }, 10);
    }



    // NUMBER OF CLICK DONT UPDATE, FIX THAT!!!!


}


