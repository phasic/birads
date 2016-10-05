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
        let x:any = document.getElementById(method+ (index+1) + 'a');
        x.remove();
        x = document.getElementById(method+ (index+1) + 'b');
        x.remove();

        for(let i = index+1; i <= this.dataservice.getDistortions().length; i++){
            x = document.getElementById(method+ (i + 1) + 'a');
            x.id = method + i + 'a';
            x.innerHTML = method + i;
            x.innerHTML = `<div class='badge'>${method}${i}</div>`;
            x = document.getElementById(method+ (i + 1) + 'b');
            x.id = method + i + 'b';
            x.innerHTML = `<div class='badge'>${method}${i}</div>`;

        }
        //TODO: DO THE SAME FOR THE OTHER METHODS
    }
}



