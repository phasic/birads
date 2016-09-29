import {Component, ElementRef, ViewChild, ViewChildren, QueryList}      from '@angular/core';
import { DataService } from "../../services/data.service";
// import {element} from "@angular/upgrade/src/angular_js";
import {TranslateService} from "ng2-translate";
import {ModalDirective} from "ng2-bootstrap";
import {MassComponent} from "./modals/mass.component";


@Component({
    selector: 'map-component',
    templateUrl: '../../templates/map/map.template.html'
})
export class MapComponent {
    constructor(private dataservice: DataService, private translate: TranslateService) {
        this.dataservice = dataservice;
        this.translate = translate;
    }


    @ViewChild('massModal1') public massModal1: ModalDirective;
    @ViewChild('massModal2') public massModal2: ModalDirective;
    @ViewChild('massModal3') public massModal3: ModalDirective;

    private showmenu: string;

    whichMenu() {
        this.dataservice.setModalshow(true);
        console.log('In whichMenu()');
        switch (this.dataservice.getMethod()) {
            case 'mass':
                this.showmenu = 'mass';
                break;
            case 'distortion':
                this.showmenu = 'distortion';
                break;
            case 'asymmetries':
                this.showmenu = 'asymmetries';
                break;
            case 'calcifications':
                this.showmenu = 'calcifications';
                break;
            default:
        }
    }

    test() {
        console.log("In MAPtest!");
    }
}


