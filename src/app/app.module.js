"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
//Map Components
var map_component_1 = require('./components/map/map.component');
var legend_component_1 = require('./components/map/legend.component');
var imagemap_directive_1 = require("./directives/imagemap.directive");
//Table Components
var table_component_1 = require('./components/table/table.component');
var guide_component_1 = require('./components/table/guide.component');
var autosize_directive_1 = require('./directives/autosize.directive');
var orderby_1 = require('./components/table/orderby');
//Data Service
var data_service_1 = require('./services/data.service');
var AppModule = (function () {
    function AppModule(translate) {
        translate.addLangs(["en", "fr", "nl"]);
        translate.setDefaultLang('en');
        translate.use('en');
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                map_component_1.MapComponent,
                legend_component_1.LegendComponent,
                imagemap_directive_1.RwdImageMap,
                table_component_1.TableComponent,
                guide_component_1.GuideComponent,
                autosize_directive_1.Autosize,
                orderby_1.OrderBy
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                ng2_bootstrap_1.Ng2BootstrapModule,
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, '/assets/i18n', '.json'); },
                    deps: [http_1.Http]
                })
            ],
            providers: [data_service_1.DataService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
