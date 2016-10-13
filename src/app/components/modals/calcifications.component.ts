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
    constructor(private dataservice: DataService, private pagectrl: PageController, private elementref: ElementRef, private hotkeyservice: HotkeyService) {
    }
    @Input() show: string;
    @ViewChild('modal1') public modal1: ModalDirective;
    @ViewChild('modal2') public modal2: ModalDirective;
    ngOnChanges(changes){
        if(this.show) {
            this.modal1.show();
            this.pagectrl.setMenuActive(true);
        }
    }
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
    private morphologyarraynotbenign: Array<string> = [
        'amorphous (benign)',
        'amorphous (DCIS)',
        'fine pleomorphic',
        'coarse heterogeneous',
        'fine linear',
        'fine linear branching'
    ];
    private distributionarray: Array<string> = [
        'diffuse',
        'regional',
        'group',
        'linear',
        'segmental'
    ];
    private menus: Array<string> = [
        'morphology',
        'distribution'
    ];

    private benign: boolean = true;
    private morphology: string;
    private distribution: string;
    mouseControl(argument: string, finding: string): void{
        if(argument == this.menus[0]){
            this.morphology = finding;
            this.modal1.hide();
            this.modal2.show();
        }
        if(argument == this.menus[1]){
            this.distribution = finding;
            this.modal2.hide();
            this.endOfMenu();

        }
    }
    private hotkeys: any;
    hotKeys(keycode: number, argument: string): void{
        let hotkeys: any = this.hotkeyservice.hotkeys.modal;
        this.hotkeys = hotkeys;
        if(keycode == hotkeys.toggle){
            this.benign = !this.benign;
        }
        if(argument == this.menus[0] && this.benign){
            this.morphology = (keycode == hotkeys.one) ? this.morphologyarraybenign[0] :
                (keycode == hotkeys.two) ? this.morphologyarraybenign[1] :
                    (keycode == hotkeys.three) ? this.morphologyarraybenign[2] :
                        (keycode == hotkeys.four) ? this.morphologyarraybenign[3] :
                            (keycode == hotkeys.five) ? this.morphologyarraybenign[4] :
                                (keycode == hotkeys.six) ? this.morphologyarraybenign[5] :
                                    (keycode == hotkeys.seven) ? this.morphologyarraybenign[6] :
                                        (keycode == hotkeys.eight) ? this.morphologyarraybenign[7] :
                                            (keycode == hotkeys.nine) ? this.morphologyarraybenign[8] : '';
            if(this.morphology != ''){
                this.modal1.hide();
                this.modal2.show();
            }
        }
        if(argument == this.menus[0] && !this.benign){
            this.morphology = (keycode == hotkeys.one) ? this.morphologyarraynotbenign[0] :
                (keycode == hotkeys.two) ? this.morphologyarraynotbenign[1] :
                    (keycode == hotkeys.three) ? this.morphologyarraynotbenign[2] :
                        (keycode == hotkeys.four) ? this.morphologyarraynotbenign[3] :
                            (keycode == hotkeys.five) ? this.morphologyarraynotbenign[4] :
                                (keycode == hotkeys.six) ? this.morphologyarraynotbenign[5] : '';
            if(this.morphology != ''){
                this.modal1.hide();
                this.modal2.show();
            }
        }
        if(argument == this.menus[1]){
            this.distribution = (keycode == hotkeys.one) ? this.distributionarray[0] :
                (keycode == hotkeys.two) ? this.distributionarray[1] :
                    (keycode == hotkeys.three) ? this.distributionarray[2] :
                        (keycode == hotkeys.four) ? this.distributionarray[3] :
                            (keycode == hotkeys.five) ? this.distributionarray[4] : '';
            if(this.distribution != ''){
                this.modal2.hide();
                this.endOfMenu();
            }
        }
    }

    endOfMenu(): void{
        this.pagectrl.setMenuActive(false);
        this.pagectrl.calculateBadgeDistance();
        this.addTable();
        this.pagectrl.renderBadge(this.elementref);
    }
    addTable(): void{
        this.dataservice.addCalcifications(this.pagectrl.distance, this.morphology, this.distribution);
    }
    modalInterrupt(){               //if we cut the modal interaction short, reset the showMenu
        setTimeout(() => {
            if(!this.modal1.isShown && !this.modal2.isShown  && (this.pagectrl.getShowmenu()!='')){
                this.pagectrl.setShowmenu('');
                this.pagectrl.setNumberOfClicks(0);
            }
        }, 10);
    }





}


