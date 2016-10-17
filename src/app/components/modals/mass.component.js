"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var di_1 = require("@angular/core/src/metadata/di");
var MassComponent = (function () {
    function MassComponent(dataservice, pagectrl, elementref, hotkeyservice) {
        this.dataservice = dataservice;
        this.pagectrl = pagectrl;
        this.elementref = elementref;
        this.hotkeyservice = hotkeyservice;
        this.shapearray = [
            'round',
            'oval',
            'irregular'
        ];
        this.marginarray = [
            'circumscribed',
            'obscured',
            'microlobulated',
            'indistinct',
            'spiculated'
        ];
        this.densityarray = [
            'low',
            'equal',
            'high'
        ];
        this.menus = [
            'shape',
            'margin',
            'density'
        ];
    }
    MassComponent.prototype.ngOnChanges = function (changes) {
        if (this.show) {
            this.modal1.show();
            this.pagectrl.setMenuActive(true);
        }
    };
    MassComponent.prototype.mouseControl = function (argument, finding) {
        if (argument == this.menus[0]) {
            this.shape = finding;
            this.modal1.hide();
            this.modal2.show();
        }
        else if (argument == this.menus[1]) {
            this.margin = finding;
            this.modal2.hide();
            this.modal3.show();
        }
        else if (argument == this.menus[2]) {
            this.density = finding;
            this.modal3.hide();
            this.endOfMenu();
        }
    };
    MassComponent.prototype.hotKeys = function (keycode, argument) {
        var hotkeys = this.hotkeyservice.hotkeys.modal;
        if (argument == this.menus[0]) {
            this.shape = (keycode == hotkeys.one) ? this.shapearray[0] :
                (keycode == hotkeys.two) ? this.shapearray[1] :
                    (keycode == hotkeys.three) ? this.shapearray[2] : '';
            if (this.shape != '') {
                this.modal1.hide();
                this.modal2.show();
            }
        }
        else if (argument == this.menus[1]) {
            this.margin = (keycode == hotkeys.one) ? this.marginarray[0] :
                (keycode == hotkeys.two) ? this.marginarray[1] :
                    (keycode == hotkeys.three) ? this.marginarray[2] :
                        (keycode == hotkeys.four) ? this.marginarray[3] :
                            (keycode == hotkeys.five) ? this.marginarray[4] : '';
            if (this.margin != '') {
                this.modal2.hide();
                this.modal3.show();
            }
        }
        if (argument == this.menus[2]) {
            this.density = (keycode == hotkeys.one) ? this.densityarray[0] :
                (keycode == hotkeys.two) ? this.densityarray[1] :
                    (keycode == hotkeys.three) ? this.densityarray[2] : '';
            if (this.density != '') {
                this.modal3.hide();
                this.endOfMenu();
            }
        }
    };
    MassComponent.prototype.endOfMenu = function () {
        this.pagectrl.setMenuActive(false);
        this.pagectrl.calculateDistance();
        this.addToTable(); //add data to the table and dataervice
        this.pagectrl.renderBadge(this.elementref); //create a badge on the image
    };
    MassComponent.prototype.addToTable = function () {
        this.dataservice.addMass(0, this.pagectrl.distance, this.shape, this.margin, this.density); //bind everything to the dataervice
    };
    MassComponent.prototype.modalInterrupt = function () {
        var _this = this;
        setTimeout(function () {
            if (!_this.modal1.isShown && !_this.modal2.isShown && !_this.modal3.isShown && (_this.pagectrl.getShowmenu() != '')) {
                _this.pagectrl.setShowmenu('');
                _this.pagectrl.setNumberOfClicks(0);
            }
        }, 10);
    };
    __decorate([
        core_1.Input()
    ], MassComponent.prototype, "show", void 0);
    __decorate([
        di_1.ViewChild('modal1')
    ], MassComponent.prototype, "modal1", void 0);
    __decorate([
        di_1.ViewChild('modal2')
    ], MassComponent.prototype, "modal2", void 0);
    __decorate([
        di_1.ViewChild('modal3')
    ], MassComponent.prototype, "modal3", void 0);
    MassComponent = __decorate([
        core_1.Component({
            selector: 'mass-component',
            templateUrl: '../../templates/modals/mass.template.html'
        })
    ], MassComponent);
    return MassComponent;
}());
exports.MassComponent = MassComponent;
