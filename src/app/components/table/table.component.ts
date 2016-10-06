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

    removeEntry(index: number, method: string): void{
        switch (method) {
            case 'M':
                this.dataservice.getMass().splice(index,1);
                this.removeBadge(index, method);
                break;
            case 'D':
                this.dataservice.getDistortions().splice(index,1);
                this.removeBadge(index, method);
                break;
            case 'A':
                this.dataservice.getAsymmetries().splice(index,1);
                this.removeBadge(index, method);
                break;
            case 'C':
                this.dataservice.getCalcifications().splice(index,1);
                this.removeBadge(index, method);
                break;
            default:
        }
    }

    removeBadge(index: number, method: string): void{
        let element:any = document.getElementById(method+ (index+1) + 'a');
        element.remove();
        element = document.getElementById(method+ (index+1) + 'b');
        element.remove();

        let datalength: any;
        switch (method){
            case 'M':
                datalength = this.dataservice.getMass().length;
                break;
            case 'D':
                datalength = this.dataservice.getDistortions().length;
                break;
            case 'A':
                datalength = this.dataservice.getAsymmetries().length;
                break;
            case 'C':
                datalength = this.dataservice.getCalcifications().length;
                break;
            default:
        }

        for(let i = index+1; i <= datalength; i++){
            element = document.getElementById(method+ (i + 1) + 'a');
            element.id = method + i + 'a';
            element.innerHTML = method + i;
            element.innerHTML = `<div class='badge'>${method}${i}</div>`;
            element = document.getElementById(method+ (i + 1) + 'b');
            element.id = method + i + 'b';
            element.innerHTML = `<div class='badge'>${method}${i}</div>`;

        }
    }
}



