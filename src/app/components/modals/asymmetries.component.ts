import {Component, OnChanges, Input, ElementRef}      from '@angular/core';
import { DataService } from "../../services/data.service";
import {TranslateService} from "ng2-translate";
import {ModalDirective} from "ng2-bootstrap";
import {ViewChild} from "@angular/core/src/metadata/di";
import {PageController} from "../../services/page.controller";


@Component({
    selector: 'asymmetries-component',
    templateUrl: '../../templates/modals/asymmetries.template.html'
})
export class AsymmetriesComponent implements OnChanges{
    constructor(private dataservice: DataService, private pagectrl: PageController, private elementref: ElementRef) {
    }
    @Input() show: boolean;
    @ViewChild('modal1') public modal1: ModalDirective;
    ngOnChanges(changes){
        if(this.show) {
            this.modal1.show();
        }
    }

    private asymmetry: string;
    mouseControl(finding: string): void{
        this.asymmetry = finding;
        this.modal1.hide();
        this.endOfMenu();
    }
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
                console.log("FOUTE SELECTIE");
        }
    }

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
                console.log("FOUTE SELECTIE");
        }
    }

    endOfMenu(): void{
        this.addTable();
        this.pagectrl.createBadge(this.elementref);
    }
    addTable(): void{
        this.dataservice.addAsymmetries(this.asymmetry);
    }

    modalInterrupt(){               //if we cut the modal interaction short, reset the showMenu
        setTimeout(() => {
            if(!this.modal1.isShown && (this.pagectrl.getShowmenu()!='')){
                this.pagectrl.setShowmenu('');
                this.pagectrl.setNumberOfClicks(0);
            }
        }, 10);
    }


}


