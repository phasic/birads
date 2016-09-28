import { Component }      from '@angular/core';
import { DataService } from "../../services/data.service";
import {TranslateService} from "ng2-translate";
@Component({
    selector: 'table-component',
    templateUrl: '../../templates/table/table.template.html'
})
export class TableComponent{
    constructor(private dataservice: DataService, private translate: TranslateService){
        this.dataservice = dataservice;
        this.translate = translate;
    }
    // private data: any = this.dataservice.getData();
    // private data: any = [];
    // private index: number = 0;
    test(){
        // console.log("In test!");
        // console.log(this.dataservice.getData());
        this.dataservice.addMass(0,"test1", "test2", "test3");
        console.log(this.dataservice.getMass());
    }

}



