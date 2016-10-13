import {Component}      from '@angular/core';
import {PageController} from "../../services/page.controller";
import {DataService} from "../../services/data.service";
import {HotkeyService} from "../../services/hotkey.service";
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
     * @param hotkeyservice
     */
    constructor(private dataservice: DataService, private pagectrl: PageController,
                private hotkeyservice: HotkeyService) {
    }

    /**
     * hotKeys gets called when we press a keyboard key
     * Change the keycodes if you want to change the hotkeys
     *
     * @param keycode   the keycode of the clicked keyboard key
     */
    hotKeys(keycode: number): void {
        let hotkeys: any = this.hotkeyservice.hotkeys.sidebar;
        let method: string = '';
        if (!this.pagectrl.getMenuActive()) {
            method = (keycode == hotkeys.one) ? 'mass' :
                (keycode == hotkeys.two) ? 'distortion' :
                    (keycode == hotkeys.three) ? 'asymmetry' :
                        (keycode == hotkeys.four) ? 'calcification' :
                            (keycode == hotkeys.five) ? 'palpitation' :
                                (keycode == hotkeys.six) ? 'scar' : '';
            if(method != ''){
                this.pagectrl.setMethod(method);
            }
        }
    }

    otherHeaderName(): string{
        if(this.dataservice.getOtherMethods().indexOf(this.pagectrl.getMethod()) > -1){
            return this.pagectrl.getMethod();
        }
        else
            return 'other';
    }
}