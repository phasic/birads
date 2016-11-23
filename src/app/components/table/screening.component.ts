import { Component }      from '@angular/core';
import { DataService } from "../../services/data.service";
import {TranslateService} from "ng2-translate";

@Component({
    selector: 'screening-component',
    templateUrl: '../../templates/table/screening.template.html'
})
export class ScreeningComponent{

    constructor(private dataservice: DataService, private translate: TranslateService){
    }

    private categories: Array<any> = new Array(18);

    private hassubcategories: Array<number> = [5, 10];

    private subcategories: Array<number> = [6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17];

    check(event: any): void{
    if(event.target.tagName == 'INPUT'){
            return;
        }
        else{
            event.target.firstChild.click();
            return;
        }
    }

    setReason(reason: string): void{
        this.dataservice.screeningreason = reason;
    }
    test(){
        let x: any;


        x = this.dataservice.screeningreason;


        console.log(x);
    }
}



