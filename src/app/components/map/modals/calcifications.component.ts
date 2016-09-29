import {Component, OnChanges, Input}      from '@angular/core';
import { DataService } from "../../../services/data.service";
import {TranslateService} from "ng2-translate";
import {ModalDirective} from "ng2-bootstrap";
import {ViewChild} from "@angular/core/src/metadata/di";


@Component({
    selector: 'calcification-component',
    templateUrl: '../../../templates/map/modals/calcifications.template.html'
})
export class CalcificationComponent implements OnChanges{
    constructor(private dataservice: DataService, private translate: TranslateService) {
        this.dataservice = dataservice;
        this.translate = translate;
    }
    @Input() show: string;
    @ViewChild('modal1') public modal1: ModalDirective;
    @ViewChild('modal2') public modal2: ModalDirective;
    @ViewChild('modal3') public modal3: ModalDirective;
    ngOnChanges(changes){
        if(this.show) {
            this.modal1.show();
        }
    }

    private benign: boolean = true;
    private morphology: string;
    private distribution: string;
    hotKeys(keycode: number, argument: string, page?: number): void{
        this.dataservice.disableSidebar();

        if(page){
            page = 1;
        }
        else
            page = 2;
        switch (page + argument) {
            case 1+'morphology':
                switch (keycode) {
                    case 192:
                        this.benign = !this.benign;
                        break;
                    case 49:       //1
                    case 50:       //2
                    case 51:       //3
                    case 52:       //4
                    case 53:       //5
                    case 54:       //6
                    case 55:       //7
                    case 56:       //8
                    case 57:       //9
                        this.setFinding(keycode, argument, page);
                        this.modal1.hide();
                        this.modal2.show();
                        break;
                    default:
                        console.log("FOUTE SELECTIE");
                }
                break;
            case 2+'morphology':
                switch (keycode) {
                    case 192:
                        this.benign = !this.benign;
                        break;
                    case 49:       //1
                    case 50:       //2
                    case 51:       //3
                    case 52:       //4
                    case 53:       //5
                    case 54:       //6
                        this.setFinding(keycode, argument, page);
                        this.modal1.hide();
                        this.modal2.show();
                        break;
                    default:
                        console.log("FOUTE SELECTIE");
                }
                break;
            default:
                switch (keycode) {
                    case 49:
                    case 50:
                    case 51:
                    case 52:
                    case 53:
                        this.setFinding(keycode, argument);
                        this.modal2.hide();
                        this.addTable();
                        this.dataservice.enableSidebar();
                        this.dataservice.setShowmenu('');
                        break;
                    default:
                        console.log("FOUTE SELECTIE");
                }
                break;
        }

    }


    setFinding(keycode: number, argument: string, page?: number): void {
        switch (page) {
            case 1:
                switch (keycode + argument) {
                    case 49 + 'morphology':
                        this.morphology = 'skin calcification';
                        break;
                    case 50 + 'morphology':
                        this.morphology = 'milk of calcium';
                        break;
                    case 51 + 'morphology':
                        this.morphology = 'rold-like - plasmacel mastisis';
                        break;
                    case 52 + 'morphology':
                        this.morphology = 'dystrophoc';
                        break;
                    case 53 + 'morphology':
                        this.morphology = 'popcorn - fibroadenoma';
                        break;
                    case 54 + 'morphology':
                        this.morphology = 'rim calcification';
                        break;
                    case 55 + 'morphology':
                        this.morphology = 'vascular calcification';
                        break;
                    case 56 + 'morphology':
                        this.morphology = 'round';
                        break;
                    case 57 + 'morphology':
                        this.morphology = 'punctate';
                        break;
                    default:
                        console.log("FOUTE SELECTIE");

                }
                break;
            case 2:
                switch (keycode + argument) {
                    case 49 + 'morphology':
                        this.morphology = 'amorphous (benign)';
                        break;
                    case 50 + 'morphology':
                        this.morphology = 'amorphous (DCIS)';
                        break;
                    case 51 + 'morphology':
                        this.morphology = 'fine pleomorhpic';
                        break;
                    case 52 + 'morphology':
                        this.morphology = 'coarse heterogeneous';
                        break;
                    case 53 + 'morphology':
                        this.morphology = 'fine linear';
                        break;
                    case 54 + 'morphology':
                        this.morphology = 'fine linear branching';
                        break;
                    default:
                        console.log("FOUTE SELECTIE");

                }
                break;
            default:
                switch (keycode + argument) {
                    case 49 + 'distribution':
                        this.distribution = 'diffuse';
                        break;
                    case 50 + 'distribution':
                        this.distribution = 'regional';
                        break;
                    case 51 + 'distribution':
                        this.distribution = 'group';
                        break;
                    case 52 + 'distribution':
                        this.distribution = 'linear';
                        break;
                    case 53 + 'distribution':
                        this.distribution = 'segmental';
                        break;
                    default:
                        console.log("AAAAAAAAAAAAAAAAAAAAAA");
                }
                break;
        }
    }
    addTable(): void{
        // this.dataservice.addMass(0, this.morphology, this.distribution, this.density);
        this.dataservice.addCalcifications(this.morphology, this.distribution);

    }

    mouseControl(argument: string, finding: string): void{
        if(argument == 'morphology'){
            this.morphology = finding;
            this.modal1.hide();
            this.modal2.show();
        }
        if(argument == 'distribution'){
            this.distribution = finding;
            this.modal2.hide();
            this.addTable();

        }
    }




}


