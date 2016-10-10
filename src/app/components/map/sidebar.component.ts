import {Component}      from '@angular/core';
import {PageController} from "../../services/page.controller";
import {DataService} from "../../services/data.service";
@Component({
    selector: 'sidebar-component',
    templateUrl: '../../templates/map/sidebar.template.html'
})
export class SidebarComponent {
    /**
     * Constructor of SidebarComponent
     *
     * @param dataservice   this service stores all the data
     * @param pagectrl      page controller manages functions to assure functionality (tracking click, adding badges, ... )
     */
    constructor(private dataservice: DataService, private pagectrl: PageController) {
    }

    /**
     * hotKeys gets called when we press a keyboard key
     * Change the keycodes if you want to change the hotkeys
     *
     * @param keycode   the keycode of the clicked keyboard key
     */
    hotKeys(keycode: number): void {
        //TODO lock sidebar when modal is up
        if (!this.pagectrl.getMenuActive()) {
            switch (keycode) {
                case 81: //Q
                    this.pagectrl.setMethod('mass');
                    break;
                case 87: //W
                    this.pagectrl.setMethod('distortion');
                    break;
                case 69: //E
                    this.pagectrl.setMethod('asymmetry');
                    break;
                case 82: //R
                    this.pagectrl.setMethod('calcification');
                    break;
                default:
            }

        }
    }
}