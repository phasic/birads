import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import { AppComponent } from './app.component';

import { Ng2BootstrapModule }   from 'ng2-bootstrap/ng2-bootstrap';
import {TranslateModule, TranslateService, TranslateStaticLoader, TranslateLoader} from   'ng2-translate/ng2-translate';
//Map Components
import { MapComponent }         from './components/map/map.component';
import { LegendComponent }      from './components/table/legend.component';
import { SidebarComponent }     from './components/map/sidebar.component';
//Modals
import { MassComponent }        from "./components/modals/mass.component";
import { CalcificationComponent }        from "./components/modals/calcifications.component";
import { DistortionComponent }        from "./components/modals/distortion.component";
import { AsymmetriesComponent }        from "./components/modals/asymmetries.component";

//Table Components
import { TableComponent }       from './components/table/table.component';
//Data Service
import { DataService }           from './services/data.service';
import {PageController} from "./services/page.controller";
import {ScreenResize} from "./directives/screen.resize.directive";
import {ClassificationComponent} from "./components/table/classification.component";

@NgModule({
    declarations: [
        AppComponent,
        MapComponent,
        LegendComponent,
        SidebarComponent,
        MassComponent,
        CalcificationComponent,
        DistortionComponent,
        AsymmetriesComponent,
        TableComponent,
        ScreenResize,
        ClassificationComponent,
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
    providers: [DataService, PageController],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(translate: TranslateService){
        translate.addLangs(["en", "fr", "nl"]);
        translate.setDefaultLang('en');
        translate.use('en');
    }
}



