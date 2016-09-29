import {Component}      from '@angular/core';
import { DataService } from "../../services/data.service";
import {TranslateService} from "ng2-translate";


@Component({
    selector: 'sidebar-component',
    templateUrl: '../../templates/map/sidebar.template.html'
})
export class SidebarComponent {
    constructor(private dataservice: DataService, private translate: TranslateService) {
        this.dataservice = dataservice;
        this.translate = translate;
    }
    hotKeys(keycode: number): void{
        if(this.dataservice.getModalshow()){
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
    }
}
