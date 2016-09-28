"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var DataService = (function () {
    function DataService() {
        this.dataQQ = [];
        this.setData([]);
        this.setMass([]);
        // this.setdummydata();
    }
    DataService.prototype.setData = function (data) {
        this.data = data;
    };
    DataService.prototype.getData = function () {
        return this.data;
    };
    DataService.prototype.setComposition = function (composition) {
        this.data.composition = composition;
    };
    DataService.prototype.getComposition = function () {
        return this.data.composition;
    };
    DataService.prototype.setMass = function (mass) {
        this.data.mass = mass;
    };
    DataService.prototype.getMass = function (index) {
        if (index == null) {
            return this.data.mass;
        }
        return this.data.mass[index];
    };
    DataService.prototype.addMass = function (size, shape, margin, density, calcifications, features) {
        if (this.data.mass === null) {
            this.data.mass = [{
                    size: size,
                    shape: shape,
                    margin: margin,
                    density: density,
                    calcifications: calcifications,
                    features: features
                }];
        }
        else {
            this.data.mass.push({
                size: size,
                density: density,
                shape: shape,
                margin: margin,
                calcifications: calcifications,
                features: features
            });
        }
        // console.log(this.data);
    };
    DataService = __decorate([
        core_1.Injectable()
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
