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
    @ViewChild('modal1') public modal1: ModalDirective;
    @ViewChild('modal2') public modal2: ModalDirective;
    @ViewChild('modal3') public modal3: ModalDirective;
    ngOnChanges(changes){
        if(this.show) {
            this.endOfMenu();
            setTimeout(() => { this.pagectrl.setShowmenu('');},10);


        }

    }
    endOfMenu(): void{
        this.addTable();
        this.pagectrl.createBadge(this.elementref);
        this.pagectrl.calculateBadgeDistance();
    }
    addTable(): void{
        this.dataservice.addDistortions("architectural distortion");

    }




}


