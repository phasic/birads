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

    private benign: boolean = true;
    private morphology: string;
    private distribution: string;
    mouseControl(argument: string, finding: string): void{
        if(argument == 'morphology'){
            this.morphology = finding;
            this.modal1.hide();
            this.modal2.show();
        }
        if(argument == 'distribution'){
            this.distribution = finding;
            this.modal2.hide();
            this.endOfMenu();

        }
    }
    hotKeys(keycode: number, argument: string): void{
        let hotkeys: any = this.hotkeyservice.hotkeys.modal;
        if(keycode == hotkeys.toggle){
            this.benign = !this.benign;
        }
        if(argument == 'morphology' && this.benign){
            this.morphology = (keycode == hotkeys.one) ? 'skin calcification' :
                (keycode == hotkeys.two) ? 'milk of calcium' :
                    (keycode == hotkeys.three) ? 'rod-like - plasmacel mastitis' :
                        (keycode == hotkeys.four) ? 'dystrophic' :
                            (keycode == hotkeys.five) ? 'popcorn - fibroadenoma' :
                                (keycode == hotkeys.six) ? 'rim calcification' :
                                    (keycode == hotkeys.seven) ? 'vascular calcification' :
                                        (keycode == hotkeys.eight) ? 'round' :
                                            (keycode == hotkeys.nine) ? 'punctate' : '';
            if(this.morphology != ''){
                this.modal1.hide();
                this.modal2.show();
            }
        }
        if(argument == 'morphology' && !this.benign){
            this.morphology = (keycode == hotkeys.one) ? 'amorphous (benign)' :
                (keycode == hotkeys.two) ? 'amorphous (DCIS)' :
                    (keycode == hotkeys.three) ? 'fine pleomorphic' :
                        (keycode == hotkeys.four) ? 'coarse heterogeneous' :
                            (keycode == hotkeys.five) ? 'fine linear' :
                                (keycode == hotkeys.six) ? 'fine linear branching' : '';
            if(this.morphology != ''){
                this.modal1.hide();
                this.modal2.show();
            }
        }
        if(argument == 'distribution'){
            this.distribution = (keycode == hotkeys.one) ? 'diffuse' :
                (keycode == hotkeys.two) ? 'regional' :
                    (keycode == hotkeys.three) ? 'group' :
                        (keycode == hotkeys.four) ? 'linear' :
                            (keycode == hotkeys.five) ? 'segmental' : '';
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


