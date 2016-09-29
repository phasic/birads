import {Component, OnChanges, Input}      from '@angular/core';
import { DataService } from "../../../services/data.service";
import {TranslateService} from "ng2-translate";
import {ModalDirective} from "ng2-bootstrap";
import {ViewChild} from "@angular/core/src/metadata/di";


@Component({
    selector: 'distortion-component',
    templateUrl: '../../../templates/map/modals/distortion.template.html'
})
export class DistortionComponent implements OnChanges{
    constructor(private dataservice: DataService, private translate: TranslateService) {
        this.dataservice = dataservice;
        this.translate = translate;
    }
    @Input() show: string;
    @ViewChild('modal1') public modal1: ModalDirective;
    @ViewChild('modal2') public modal2: ModalDirective;
    @ViewChild('modal3') public modal3: ModalDirective;
    ngOnChanges(changes){
        console.log("in changes");
        console.log(changes);
        if(this.show) {
            this.addTable();
        }
    }

    hotKeys(keycode: number, argument: string): void{
        switch(keycode + argument){
            case 49+'shape':
            case 50+'shape':
            case 51+'shape':
                this.setFinding(keycode,argument);
                this.modal1.hide();
                this.modal2.show();
                break;
            case 49+'margin':
            case 50+'margin':
            case 51+'margin':
            case 52+'margin':
            case 53+'margin':
                this.setFinding(keycode,argument);
                this.modal2.hide();
                this.modal3.show();
                break;
            case 49+'density':
            case 50+'density':
            case 51+'density':
                this.setFinding(keycode,argument);
                this.addTable();
                this.modal3.hide();
                break;
            default:
                console.log("FOUTE SELECTIE");
        }
    }
    private shape: string;
    private margin: string;
    private density: string;

    setFinding(keycode: number, argument: string): void {
        switch(keycode + argument){
            case 49+'shape':
                this.shape = 'round';
                break;
            case 50+'shape':
                this.shape = 'oval';
                break;
            case 51+'shape':
                this.shape = 'irregular';
                break;
            case 49+'margin':
                this.margin = 'circumscribed';
                break;
            case 50+'margin':
                this.margin = 'obscured';
                break;
            case 51+'margin':
                this.margin = 'microlobulated';
                break;
            case 52+'margin':
                this.margin = 'indistinct';
                break;
            case 53+'margin':
                this.margin = 'spiculated';
                break;
            case 49+'density':
                this.density = 'low';
                break;
            case 50+'density':
                this.density = 'equal';
                break;
            case 51+'density':
                this.density = 'high';
                break;
            default:
                console.log("FOUTE SELECTIE");
        }
    }
    addTable(): void{
        //TODO: GET THIS RIGHT
        this.dataservice.addDistortions("Architectural Distortion");
        this.dataservice.setModalshow(false);

    }



}


