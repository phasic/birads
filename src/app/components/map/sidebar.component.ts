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
     * @param hotkeyservice gets the keybindings from a json file, and binds them to data
     * @param translate     translate service
     */
    constructor(private dataservice: DataService, private pagectrl: PageController,
                private hotkeyservice: HotkeyService, private translate: TranslateService) {
    }

    /**
     * hotKeys gets called when we press a keyboard key
     * if you want to change the hotkeys, change the hotkeys.json file
     *
     * @param keycode   the keycode of the clicked keyboard key
     */
    hotKeys(keycode: number): void {
        let hotkeys: any = this.hotkeyservice.hotkeys.sidebar;                  //get the hotkeys from the hotkey service
        let method: string = '';                                                //initialize an empty method
        if (!this.pagectrl.getMenuActive()) {                                   //if theres no active menu
            method = (keycode == hotkeys.one) ? this.dataservice.getMainMethods()[0] ://check which hotkey we pressed, and bind the correct value to it
                (keycode == hotkeys.two) ? this.dataservice.getMainMethods()[1] :
                    (keycode == hotkeys.three) ? this.dataservice.getMainMethods()[2] :
                        (keycode == hotkeys.four) ? this.dataservice.getMainMethods()[3] :
                            (keycode == hotkeys.five) ? this.dataservice.getOtherMethods()[0] :
                                (keycode == hotkeys.six) ? this.dataservice.getOtherMethods()[1] : '';  //by default, keep the string empty
            if(method != ''){
                this.pagectrl.setMethod(method);                             //if we pressed a correct key, set the corresponding method
            }
        }
    }

    /**
     * Change the header of the 'other' menu to it's selection when a child element is selected.
     * When no child selection is selected, change it back to 'other'
     * @param translate boolean, make it true if you want to translate the value, want to do this if we use the returned string in the view, but we have 1 instance where we use it for data binding
     * @returns {any}   return the correct word to show as the name of the menu
     */
    otherHeaderName(translate? : boolean): string{
        let translation: any;                                                   //variable to store the correct translation
        if(this.dataservice.getOtherMethods().indexOf(this.pagectrl.getMethod()) > -1){     //if our selected method is an element of our submenu
            translation =  this.translate.get("SIDEBAR." + this.pagectrl.getMethod().toLocaleUpperCase());  //then get the method, translate it
            return (translate) ? translation.value : this.pagectrl.getMethod(); //we only want to translate the view, not the data binding behind it
        }
        else{
            translation = this.translate.get("SIDEBAR.OTHER");                 //if the selected method is not an element of the submenu
            return (translate) ? translation.value : 'other';                 //just return 'other' or a translated value of it
        }
    }
}