import {Component, OnChanges, Input, ElementRef}      from '@angular/core';
import { DataService } from "../../services/data.service";
import {TranslateService} from "ng2-translate";
import {ModalDirective} from "ng2-bootstrap";
import {ViewChild} from "@angular/core/src/metadata/di";
import {PageController} from "../../services/page.controller";


@Component({
    selector: 'calcification-component',
    templateUrl: '../../templates/modals/calcifications.template.html'
})
export class CalcificationComponent implements OnChanges{
    constructor(private dataservice: DataService, private pagectrl: PageController, private elementref: ElementRef) {
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
        // this.page.disableSidebar();
        if(keycode == 192){
            this.benign = !this.benign;
        }
        if(argument == 'morphology' && this.benign){
            this.morphology = (keycode == 49) ? 'skin calcification' :
                (keycode == 50) ? 'milk of calcium' :
                    (keycode == 51) ? 'rod-like - plasmacel mastitis' :
                        (keycode == 52) ? 'dystrophic' :
                            (keycode == 53) ? 'popcorn - fibroadenoma' :
                                (keycode == 54) ? 'rim calcification' :
                                    (keycode == 55) ? 'vascular calcification' :
                                        (keycode == 56) ? 'round' :
                                            (keycode == 57) ? 'punctate' : '';
            if(this.morphology != ''){
                this.modal1.hide();
                this.modal2.show();
            }
        }
        if(argument == 'morphology' && !this.benign){
            this.morphology = (keycode == 49) ? 'amorphous (benign)' :
                (keycode == 50) ? 'amorphous (DCIS)' :
                    (keycode == 51) ? 'fine pleomorphic' :
                        (keycode == 52) ? 'coarse heterogeneous' :
                            (keycode == 53) ? 'fine linear' :
                                (keycode == 54) ? 'fine linear branching' : '';
            if(this.morphology != ''){
                this.modal1.hide();
                this.modal2.show();
            }
        }
        if(argument == 'distribution'){
            this.distribution = (keycode == 49) ? 'diffuse' :
                (keycode == 50) ? 'regional' :
                    (keycode == 51) ? 'group' :
                        (keycode == 52) ? 'linear' :
                            (keycode == 53) ? 'segmental' : '';
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
        this.dataservice.addCalcifications(this.pagectrl.distanceX, this.pagectrl.distanceY,
            this.pagectrl.distanceZ, this.morphology, this.distribution);
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


