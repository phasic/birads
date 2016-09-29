import {Component, ElementRef}      from '@angular/core';
import { DataService } from "../../services/data.service";
import {TranslateService} from "ng2-translate";
import {Draggable} from "../../directives/draggable.directive";
import {elementAt} from "rxjs/operator/elementAt";


@Component({
    selector: 'sidebar-component',
    templateUrl: '../../templates/map/sidebar.template.html'
})
export class SidebarComponent {
    constructor(private dataservice: DataService, private translate: TranslateService, private elementref: ElementRef) {
        this.dataservice = dataservice;
        this.translate = translate;
        this.elementref = elementref;
    }

    hotKeys(keycode: number): void {
        console.log('---------------Begin: hotKeys---------------');
        console.log("In sidebar.component: hotKeys");
        // console.log("getModalshow :"  + this.dataservice.getModalshow());
        console.log("Disabled?   " + this.dataservice.getDisabled());
        if (this.dataservice.getDisabled()) {
            //do nothing
        }
        else {

            switch (keycode) {
                case 81: //Q
                    this.dataservice.setMethod('mass');
                    break;
                case 87: //W
                    this.dataservice.setMethod('distortion');
                    break;
                case 69: //E
                    this.dataservice.setMethod('asymmetries');
                    break;
                case 82: //R
                    this.dataservice.setMethod('calcifications');
                    break;
                default:
            }


        }
        console.log("this.dataservice.setMethod = " + this.dataservice.getMethod());
        console.log('---------------End: hotKeys---------------');
    }




}