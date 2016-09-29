import {Component, OnChanges, Input}      from '@angular/core';
import { DataService } from "../../../services/data.service";
import {TranslateService} from "ng2-translate";
import {ModalDirective} from "ng2-bootstrap";
import {ViewChild} from "@angular/core/src/metadata/di";


@Component({
    selector: 'distortion-component',
    templateUrl: '../../../templates/map/modals/distortion.template.html'
})
export class DistortionComponent implements OnChanges{
    constructor(private dataservice: DataService, private translate: TranslateService) {
        this.dataservice = dataservice;
        this.translate = translate;
    }
    @Input() show: string;
    @ViewChild('modal1') public modal1: ModalDirective;
    @ViewChild('modal2') public modal2: ModalDirective;
    @ViewChild('modal3') public modal3: ModalDirective;
    ngOnChanges(changes){
        console.log('---------------Begin: ngOnChanges---------------');
        console.log("In distortion.component: ngOnChanges");
        if(this.show) {
            this.addTable();
            setTimeout(() => { this.dataservice.setShowmenu('');},10);


        }
        console.log('---------------End: ngOnChanges---------------');

    }
    addTable(): void{
        console.log('IN ADDTABLE');
        this.dataservice.addDistortions("Architectural Distortion");

    }



}


