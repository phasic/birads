import { Component }      from '@angular/core';
import { DataService } from "../../services/data.service";
@Component({
    selector: 'table-component',
    templateUrl: '../../templates/table/table.template.html'
})
export class TableComponent{
    constructor(private dataservice: DataService){
    }
    test(){
        console.log("In Test");
        console.log(`ACR: right: ${this.dataservice.getAcr('right')}, left: ${this.dataservice.getAcr('left')}`);
        console.log(`BIRADS: right: ${this.dataservice.getBirads('right')}, left: ${this.dataservice.getBirads('left')}`);
        console.log(`Composition: ${this.dataservice.getComposition()}`);
    }

}



