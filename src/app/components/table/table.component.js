"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var TableComponent = (function () {
    function TableComponent(dataservice, translate) {
        this.dataservice = dataservice;
        this.translate = translate;
        // private data: any = this.dataservice.getData();
        this.data = [];
        this.index = 0;
        this.dataservice = dataservice;
        this.translate = translate;
    }
    TableComponent.prototype.test = function () {
        console.log("In test!");
        // console.log(this.data)
        this.data.push(this.index++);
    };
    TableComponent = __decorate([
        core_1.Component({
            selector: 'table-component',
            templateUrl: '../../templates/table/table.template.html'
        })
    ], TableComponent);
    return TableComponent;
}());
exports.TableComponent = TableComponent;
