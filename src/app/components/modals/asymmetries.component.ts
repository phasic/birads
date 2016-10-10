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

    constructor(private dataservice: DataService, private pagectrl: PageController, private elementref: ElementRef) {
    }
    @Input() show: boolean;
    @ViewChild('modal1') public modal1: ModalDirective;
    ngOnChanges(changes){
        if(this.show) {
            this.modal1.show();
            this.pagectrl.setMenuActive(true);
        }
    }
    private asymmetryarray: Array<string> = [
        'asymmetry',
        'focal asymmetry',
        'global asymmetry',
        'developing asymmetry'
    ];
    private asymmetry: string;
    mouseControl(finding: string): void{
        this.asymmetry = finding;
        this.modal1.hide();
        this.endOfMenu();
    }
    hotKeys(keycode: number): void {
        this.asymmetry = (keycode == 49) ? 'asymmetry' :
            (keycode == 50) ? 'focal asymmetry' :
                (keycode == 51) ? 'global asymmetry' :
                    (keycode == 52) ? 'developing asymmetry' : '';
        if (this.asymmetry != '') {
            this.modal1.hide();
            this.endOfMenu();
        }
    }
    endOfMenu(): void{
        this.pagectrl.setMenuActive(false);
        this.pagectrl.calculateBadgeDistance();
        this.addTable();
        this.pagectrl.renderBadge(this.elementref);
    }
    addTable(): void{
        this.dataservice.addAsymmetries(this.pagectrl.distanceX, this.pagectrl.distanceY,
            this.pagectrl.distanceZ, this.asymmetry);
    }
    modalInterrupt(){
        setTimeout(() => {
            if(!this.modal1.isShown && (this.pagectrl.getShowmenu()!='')){
                this.pagectrl.setShowmenu('');
                this.pagectrl.setNumberOfClicks(0);
            }
        }, 10);
    }


}


