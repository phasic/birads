import {Component}      from '@angular/core';
import {PageController} from "../../services/page.controller";
import {DataService} from "../../services/data.service";
import {HotkeyService} from "../../services/hotkey.service";
import {TranslateService} from "ng2-translate";
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
     * @param translate
     */
    constructor(private dataservice: DataService, private pagectrl: PageController,
                private hotkeyservice: HotkeyService, private translate: TranslateService) {
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
            method = (keycode == hotkeys.one) ? this.dataservice.getMainMethods()[0] :
                (keycode == hotkeys.two) ? this.dataservice.getMainMethods()[1] :
                    (keycode == hotkeys.three) ? this.dataservice.getMainMethods()[2] :
                        (keycode == hotkeys.four) ? this.dataservice.getMainMethods()[3] :
                            (keycode == hotkeys.five) ? this.dataservice.getOtherMethods()[0] :
                                (keycode == hotkeys.six) ? this.dataservice.getOtherMethods()[1] : '';
            if(method != ''){
                this.pagectrl.setMethod(method);
            }
        }
    }

    otherHeaderName(translate? : boolean): string{
        let translation: any;
        if(this.dataservice.getOtherMethods().indexOf(this.pagectrl.getMethod()) > -1){
            translation =  this.translate.get("SIDEBAR." + this.pagectrl.getMethod().toLocaleUpperCase());
            return (translate) ? translation.value : this.pagectrl.getMethod();
        }
        else{
            translation = this.translate.get("SIDEBAR.OTHER");
            // console.log(translation.value);
            return (translate) ? translation.value : 'other';
        }
    }
}