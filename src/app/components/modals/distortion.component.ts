import {Component, OnChanges, Input, ElementRef}      from '@angular/core';
import { DataService } from "../../services/data.service";
import {TranslateService} from "ng2-translate";
import {ModalDirective} from "ng2-bootstrap";
import {ViewChild} from "@angular/core/src/metadata/di";
import {PageController} from "../../services/page.controller";


@Component({
    selector: 'distortion-component',
    templateUrl: '../../templates/modals/distortion.template.html'
})
export class DistortionComponent implements OnChanges{
    constructor(private dataservice: DataService, private pagectrl: PageController, private elementref: ElementRef) {
    }
    @Input() show: string;
    ngOnChanges(changes){
        if(this.show) {
            this.endOfMenu();
            setTimeout(() => { this.pagectrl.setShowmenu('');},10);
        }
    }
    endOfMenu(): void{
        this.pagectrl.calculateDistance();
        this.addToTable();
        this.pagectrl.renderBadge(this.elementref);
    }
    addToTable(): void{
        this.dataservice.addDistortions(this.pagectrl.distance, "architectural distortion");

    }




}


