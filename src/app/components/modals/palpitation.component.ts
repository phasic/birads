import {Component, OnChanges, Input, ElementRef}      from '@angular/core';
import { DataService } from "../../services/data.service";
import {PageController} from "../../services/page.controller";


@Component({
    selector: 'palpitation-component',
    templateUrl: '../../templates/modals/palpitation.template.html'
})
export class PalpitationComponent implements OnChanges{
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
        this.pagectrl.calculateBadgeDistance();
        this.addToTable();
        this.pagectrl.renderBadge(this.elementref);
    }
    addToTable(): void{
        this.dataservice.addPalpitations(this.pagectrl.distance);
    }




}


