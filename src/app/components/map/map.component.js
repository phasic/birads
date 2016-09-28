"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var MapComponent = (function () {
    function MapComponent(dataservice, translate) {
        this.dataservice = dataservice;
        this.translate = translate;
        this.data = this.dataservice.getData();
        this.dataQQ = [];
        this.index = 0;
        this.dataservice = dataservice;
        this.translate = translate;
    }
    MapComponent.prototype.hotKeys = function (keycode, argument) {
        //TODO: Maybe a popover to show which key selected
        switch (keycode) {
            case 49:
                this.addFinding(1, argument);
                break;
            case 50:
                this.addFinding(2, argument);
                break;
            case 51:
                this.addFinding(3, argument);
                break;
            case 52:
                this.addFinding(4, argument);
                break;
            case 53:
                this.addFinding(5, argument);
                break;
            default:
        }
        switch (argument) {
            case 'shape':
                this.lgModal.hide();
                this.lgModal2.show();
                break;
            case 'margin':
                this.lgModal2.hide();
                this.lgModal3.show();
                break;
            case 'density':
                this.lgModal3.hide();
                this.test();
                this.addTable();
                break;
            default:
        }
    };
    MapComponent.prototype.addFinding = function (i, argument) {
        //TODO: CATCH CLICK KEYBIND OUT OF BOUNDS, REPOPUP SAME MODAL
        switch (argument) {
            case 'shape':
                switch (i) {
                    case 1:
                        this.shape = "round";
                        break;
                    case 2:
                        this.shape = 'oval';
                        break;
                    case 3:
                        this.shape = 'irregular';
                        break;
                    default:
                        this.lgModal.hide();
                        this.lgModal.show();
                        break;
                }
                break;
            case 'margin':
                switch (i) {
                    case 1:
                        this.margin = 'circumscribed';
                        break;
                    case 2:
                        this.margin = 'obscured';
                        break;
                    case 3:
                        this.margin = 'microlobulated';
                        break;
                    case 4:
                        this.margin = 'indistinct';
                        break;
                    case 5:
                        this.margin = 'spiculated';
                        break;
                    default:
                        this.lgModal2.hide();
                        this.lgModal2.show();
                        break;
                }
                break;
            case 'density':
                switch (i) {
                    case 1:
                        this.density = 'low';
                        break;
                    case 2:
                        this.density = 'equal';
                        break;
                    case 3:
                        this.density = 'high';
                        break;
                    default:
                        // this.lgModal3.hide();
                        console.log("out of bounds");
                        this.lgModal3.show();
                        break;
                }
                break;
            default:
        }
    };
    //TODO CHECK FOR DUPLICATES, FIX TABLE LAYOUT, ENTER IT CLEANLY
    MapComponent.prototype.addTable = function () {
        this.dataservice.addMass(0, this.shape, this.margin, this.density, null, null);
    };
    MapComponent.prototype.test = function () {
        console.log("In MAPtest!");
        // console.log(this.data)
        this.dataQQ.push(this.index++);
    };
    __decorate([
        core_1.ViewChild('lgModal')
    ], MapComponent.prototype, "lgModal", void 0);
    __decorate([
        core_1.ViewChild('lgModal2')
    ], MapComponent.prototype, "lgModal2", void 0);
    __decorate([
        core_1.ViewChild('lgModal3')
    ], MapComponent.prototype, "lgModal3", void 0);
    MapComponent = __decorate([
        core_1.Component({
            selector: 'map-component',
            templateUrl: '../../templates/map/map.template.html'
        })
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
