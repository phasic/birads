import {NgModule} from "@angular/core/src/metadata/ng_module";
import {AppComponent} from "./app.component";
import {ScreenResize} from "./directives/screen.resize.directive";
import {MapComponent} from "./components/map/map.component";
import {SidebarComponent} from "./components/map/sidebar.component";
import {AsymmetryComponent} from "./components/modals/asymmetries.component";
import {CalcificationComponent} from "./components/modals/calcifications.component";
import {DistortionComponent} from "./components/modals/distortion.component";
import {MassComponent} from "./components/modals/mass.component";
import {PalpitationComponent} from "./components/modals/palpitation.component";
import {ScarComponent} from "./components/modals/scar.component";
import {ClassificationComponent} from "./components/table/classification.component";
import {LegendComponent} from "./components/table/legend.component";
import {TableComponent} from "./components/table/table.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule, Http} from "@angular/http";
import {Ng2BootstrapModule} from "ng2-bootstrap";
import {TranslateModule, TranslateLoader, TranslateStaticLoader, TranslateService} from "ng2-translate";
import {DataService} from "./services/data.service";
import {PageController} from "./services/page.controller";
import {HotkeyService} from "./services/hotkey.service";
import {ImageMapResize} from "./directives/imagemap.resize.directive";
@NgModule({
    declarations: [
        /*APP*/
        AppComponent,
        /*DIRECTIVES*/
        ScreenResize,
        ImageMapResize,
        /*MAP*/
        MapComponent,
        SidebarComponent,
        /*MODALS*/
        AsymmetryComponent,
        CalcificationComponent,
        DistortionComponent,
        MassComponent,
        PalpitationComponent,
        ScarComponent,
        /*TABLE*/
        ClassificationComponent,
        LegendComponent,
        TableComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        Ng2BootstrapModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
            deps: [Http]
        })
    ],
    providers: [DataService, PageController, HotkeyService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(translate: TranslateService){


        translate.addLangs(["en", "fr", "nl"]);
        translate.setDefaultLang('en');     //if we don't find a translation for the selected language, fall back to english
        // translate.use('en');
        translate.use(translate.getBrowserLang());
    }
}

// TODO PROBLEM WITH TRANSLATIONS AFTER BUILDING

