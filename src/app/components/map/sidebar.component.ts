import {Component}      from '@angular/core';
import {PageController} from "../../services/page.controller";
import {DataService} from "../../services/data.service";
import {HotkeyService} from "../../services/hotkey.service";
import {TranslateService} from "ng2-translate";
/**
 * This component contains the bar with all the possible methods of which we can add findings (mass, distortion, ...). It also enables the functionality to select them with hotkeys.
 *
 * When we want to add a finding to the report, we first need to select a method from this sidebar. (with hotkeys or mouse click)
 *
 *      selector: 'sidebar-component'
 *      templateUrl: '../../templates/map/sidebar.template.html'
 *
 */
@Component({
    selector: 'sidebar-component',
    templateUrl: '../../templates/map/sidebar.template.html'
})
export class SidebarComponent {
    /**
     * Constructor of SidebarComponent.
     * The constructor will initialize the following

     * @param dataservice   This service stores all the data
     * @param pagectrl      Page controller manages functions to assure functionality (tracking click, adding badges, ... )
     * @param hotkeyservice Gets the keybindings from a json file, and binds them to the right buttons
     * @param translate     Translate service
     */
    constructor(private dataservice: DataService, private pagectrl: PageController,
                private hotkeyservice: HotkeyService, private translate: TranslateService) {
    }

    /**
     * When we first open the page, there is no selected method. Nothing is selected in the sidebar.
     * @type {string}
     */
    private method: string = '';
    /**
     * HotKeys gets called when we press a keyboard key. Checks the keycode with the stored keycodes of the hotkeyservice,
     * and sets the corresponding method.
     *
     *
     * If you want to change the hotkeys, change the hotkeys.json file.
     *
     * By default Q, W, E, R, T are used to select the methods.
     * @param keycode   The keycode of the pressed keyboard key.
     */
    hotKeys(keycode: number): void {
        let hotkeys: any = this.hotkeyservice.hotkeys.sidebar;                  //get the hotkeys from the hotkey service
        let method: string = '';                                                //initialize an empty method
        if (!this.pagectrl.getMenuActive()) {                                   //if theres no active menu
            this.method = ({                                                    //check which key we clicked
                    [hotkeys.one] : this.dataservice.getMainMethods()[0],
                    [hotkeys.two] : this.dataservice.getMainMethods()[1],
                    [hotkeys.three] : this.dataservice.getMainMethods()[2],
                    [hotkeys.four] : this.dataservice.getMainMethods()[3],
                    [hotkeys.five] : this.dataservice.getMainMethods()[4]
                }[keycode] || this.method);
            this.pagectrl.setMethod(this.method);                               //set the correct method
        }
    }
}