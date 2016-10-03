import {Component}      from '@angular/core';
import {PageController} from "../../services/page.controller";


@Component({
    selector: 'sidebar-component',
    templateUrl: '../../templates/map/sidebar.template.html'
})
export class SidebarComponent {
    constructor(private pagectrl: PageController) {
    }
    hotKeys(keycode: number): void {
        if (this.pagectrl.isMenuShown()) {
            //if the menu is up, disable sidebar hotkeys
        }
        else {
            switch (keycode) {
                case 81: //Q
                    this.pagectrl.setMethod('mass');
                    break;
                case 87: //W
                    this.pagectrl.setMethod('distortion');
                    break;
                case 69: //E
                    this.pagectrl.setMethod('asymmetries');
                    break;
                case 82: //R
                    this.pagectrl.setMethod('calcifications');
                    break;
                default:
            }
        }
    }




}