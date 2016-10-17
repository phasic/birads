"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SidebarComponent = (function () {
    /**
     * Constructor of SidebarComponent
     *
     * @param dataservice   this service stores all the data
     * @param pagectrl      page controller manages functions to assure functionality (tracking click, adding badges, ... )
     * @param hotkeyservice
     * @param translate
     */
    function SidebarComponent(dataservice, pagectrl, hotkeyservice, translate) {
        this.dataservice = dataservice;
        this.pagectrl = pagectrl;
        this.hotkeyservice = hotkeyservice;
        this.translate = translate;
    }
    /**
     * hotKeys gets called when we press a keyboard key
     * Change the keycodes if you want to change the hotkeys
     *
     * @param keycode   the keycode of the clicked keyboard key
     */
    SidebarComponent.prototype.hotKeys = function (keycode) {
        var hotkeys = this.hotkeyservice.hotkeys.sidebar;
        var method = '';
        if (!this.pagectrl.getMenuActive()) {
            method = (keycode == hotkeys.one) ? this.dataservice.getMainMethods()[0] :
                (keycode == hotkeys.two) ? this.dataservice.getMainMethods()[1] :
                    (keycode == hotkeys.three) ? this.dataservice.getMainMethods()[2] :
                        (keycode == hotkeys.four) ? this.dataservice.getMainMethods()[3] :
                            (keycode == hotkeys.five) ? this.dataservice.getOtherMethods()[0] :
                                (keycode == hotkeys.six) ? this.dataservice.getOtherMethods()[1] : '';
            if (method != '') {
                this.pagectrl.setMethod(method);
            }
        }
    };
    SidebarComponent.prototype.otherHeaderName = function (translate) {
        var translation;
        if (this.dataservice.getOtherMethods().indexOf(this.pagectrl.getMethod()) > -1) {
            translation = this.translate.get("SIDEBAR." + this.pagectrl.getMethod().toLocaleUpperCase());
            return (translate) ? translation.value : this.pagectrl.getMethod();
        }
        else {
            translation = this.translate.get("SIDEBAR.OTHER");
            // console.log(translation.value);
            return (translate) ? translation.value : 'other';
        }
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'sidebar-component',
            templateUrl: '../../templates/map/sidebar.template.html'
        })
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
