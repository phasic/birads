import {Component, OnChanges, Input}      from '@angular/core';
import { DataService } from "../../../services/data.service";
import {TranslateService} from "ng2-translate";
import {ModalDirective} from "ng2-bootstrap";
import {ViewChild} from "@angular/core/src/metadata/di";


@Component({
    selector: 'asymmetries-component',
    templateUrl: '../../../templates/map/modals/asymmetries.template.html'
})
export class AsymmetriesComponent implements OnChanges{
    constructor(private dataservice: DataService, private translate: TranslateService) {
        this.dataservice = dataservice;
        this.translate = translate;
    }
    @Input() show: boolean;
    @ViewChild('modal1') public modal1: ModalDirective;
    @ViewChild('modal2') public modal2: ModalDirective;
    @ViewChild('modal3') public modal3: ModalDirective;
    ngOnChanges(changes){
        console.log("in changes");
        console.log(changes);
        if(this.show) {
            this.modal1.show();
        }
    }

    private asymmetry: string;
    hotKeys(keycode: number): void{
        switch(keycode){
            case 49:
            case 50:
            case 51:
            case 52:
                this.setFinding(keycode);
                this.addTable();
                this.modal1.hide();
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
            default:
                console.log("FOUTE SELECTIE");
        }
    }
    addTable(): void{
        this.dataservice.addAsymmetries(this.asymmetry);
        this.dataservice.setModalshow(false);

    }
    mouseControl(finding: string): void{
        this.asymmetry = finding;
        this.modal1.hide();
        this.addTable();
    }


}


