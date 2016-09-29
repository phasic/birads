import {Component, ElementRef, ViewChild, ViewChildren, QueryList}      from '@angular/core';
import { DataService } from "../../services/data.service";
// import {element} from "@angular/upgrade/src/angular_js";
import {TranslateService} from "ng2-translate";
import {ModalDirective} from "ng2-bootstrap";
import {MassComponent} from "./modals/mass.component";


@Component({
    selector: 'map-component',
    templateUrl: '../../templates/map/map.template.html'
})
export class MapComponent {
    constructor(private dataservice: DataService, private translate: TranslateService, private elementref: ElementRef) {
        this.dataservice = dataservice;
        this.translate = translate;
        this.elementref = elementref;
    }


    @ViewChild('massModal1') public massModal1: ModalDirective;
    @ViewChild('massModal2') public massModal2: ModalDirective;
    @ViewChild('massModal3') public massModal3: ModalDirective;


    whichMenu() {
        console.log('\t\t---------------Begin: whichMenu---------------');
        console.log("\t\tIn map.component: whichMenu");
        console.log("\t\tSelected method: " + this.dataservice.getMethod());
        switch (this.dataservice.getMethod()) {
            case 'mass':
                this.dataservice.setShowmenu('mass');
                break;
            case 'distortion':
                this.dataservice.setShowmenu('distortion');
                break;
            case 'asymmetries':
                this.dataservice.setShowmenu('asymmetries');
                break;
            case 'calcifications':
                this.dataservice.setShowmenu('calcifications');
                break;
            default:
        }
        console.log('\t\tgetShowmenu: ' + this.dataservice.getShowmenu());
        console.log('\t\t---------------End: whichMenu---------------');
    }
    clickHandler(event) {
        console.log('---------------Begin: clickHandler---------------');
        console.log("In map.component: clickHandler");
        this.whichMenu(); //which menu do i need to show
        let tmp: any;
        console.log("getMethod: " + this.dataservice.getMethod());
        switch (this.dataservice.getMethod()) {
            //TODO RIGHT CLICK TO DELETE FINDING
            case 'mass':
                tmp = document.createElement('div');
                tmp.innerHTML = "<div class='badge'>M" + (this.dataservice.getMass().length +1) + "</div>";
                tmp.style = 'position: fixed; top:' + (event.clientY-5) + '; left:' + (event.clientX-7);
                this.elementref.nativeElement.appendChild(tmp);
                break;
            case 'distortion':
                tmp = document.createElement('div');
                tmp.innerHTML = "<div class='badge'>D" + (this.dataservice.getDistortions().length +1) + "</div>";
                tmp.style = 'position: fixed; top:' + (event.clientY-5) + '; left:' + (event.clientX-7);
                this.elementref.nativeElement.appendChild(tmp);
                break;
            case 'asymmetries':
                tmp = document.createElement('div');
                tmp.innerHTML = "<div class='badge'>A" + (this.dataservice.getAsymmetries().length +1) + "</div>";
                tmp.style = 'position: fixed; top:' + (event.clientY-5) + '; left:' + (event.clientX-7);
                this.elementref.nativeElement.appendChild(tmp);
                break;
            case 'calcifications':
                tmp = document.createElement('div');
                tmp.innerHTML = "<div class='badge'>C" + (this.dataservice.getCalcifications().length +1) + "</div>";
                tmp.style = 'position: fixed; top:' + (event.clientY-5) + '; left:' + (event.clientX-7);
                this.elementref.nativeElement.appendChild(tmp);
                break;
            default:
        }


        console.log(tmp);
        console.log('---------------End: clickHandler---------------');

    }


}


