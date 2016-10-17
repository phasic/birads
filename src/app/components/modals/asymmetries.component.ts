import {Component, OnChanges, Input, ElementRef}      from '@angular/core';
import {DataService} from "../../services/data.service";
import {ModalDirective} from "ng2-bootstrap";
import {ViewChild} from "@angular/core/src/metadata/di";
import {PageController} from "../../services/page.controller";
import {HotkeyService} from "../../services/hotkey.service";
@Component({
    selector: 'asymmetries-component',
    templateUrl: '../../templates/modals/asymmetries.template.html'
})
export class AsymmetryComponent implements OnChanges{

    constructor(private dataservice: DataService, private pagectrl: PageController,
                private elementref: ElementRef, private hotkeyservice: HotkeyService) {
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
        let hotkeys: any = this.hotkeyservice.hotkeys.modal;
        this.asymmetry = (keycode == hotkeys.one) ? this.asymmetryarray[0] :
            (keycode == hotkeys.two) ? this.asymmetryarray[1] :
                (keycode == hotkeys.three) ? this.asymmetryarray[2] :
                    (keycode == hotkeys.four) ? this.asymmetryarray[3] : '';
        if (this.asymmetry != '') {
            this.modal1.hide();
            this.endOfMenu();
        }
    }
    endOfMenu(): void{
        this.pagectrl.setMenuActive(false);
        this.pagectrl.calculateDistance();
        this.addTable();
        this.pagectrl.renderBadge(this.elementref);
    }
    addTable(): void{
        this.dataservice.addAsymmetries(this.pagectrl.distance, this.asymmetry);
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


