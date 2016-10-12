import { Component }      from '@angular/core';
import { DataService } from "../../services/data.service";
import {PageController} from "../../services/page.controller";
import {HotkeyService} from "../../services/hotkey.service";
@Component({
    selector: 'table-component',
    templateUrl: '../../templates/table/table.template.html'
})
export class TableComponent{
    constructor(private dataservice: DataService, private pagectrl: PageController, private hotkey: HotkeyService){
    }
    removeEntry(index: number, method: string): void{           //remove an entry from the table
        switch (method) {
            case 'M':                                           //mass
                this.dataservice.getMass().splice(index,1);     //remove it from the data
                this.removeBadge(index, method);                //delete the badge
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


        let element:any = document.getElementById(method+ (index+1) + 's');     //get the side badge
        element.remove();                                                       //destroy that element
        element = document.getElementById(method+ (index+1) + 'f');             //get the front badge
        element.remove();                                                       //destroy that element

        let datalength: any;                                        //the length of the array of that certain method
        switch (method){
            case 'M':
                datalength = this.dataservice.getMass().length;    //get the amount of entries in the mass method
                this.pagectrl.removeLocation('M', index);
                break;
            case 'D':
                datalength = this.dataservice.getDistortions().length;          //same for the rest
                this.pagectrl.removeLocation('D', index);
                break;
            case 'A':
                datalength = this.dataservice.getAsymmetries().length;
                this.pagectrl.removeLocation('A', index);
                break;
            case 'C':
                datalength = this.dataservice.getCalcifications().length;
                this.pagectrl.removeLocation('C', index);
                break;
            default:
        }

        for(let i = index+1; i <= datalength; i++){  //iterate over the method array, starting from the removed element, until the end
            element = document.getElementById(method+ (i + 1) + 's');           //get the side badge
            element.id = method + i + 's';                                      //lower the id with 1
            element.innerHTML = `<div class='badge'>${method}${i}</div>`;       //lower the innerHTML with 1
            element = document.getElementById(method+ (i + 1) + 'f');           //get the front badge
            element.id = method + i + 'f';                                      //lower the id with 1
            element.innerHTML = `<div class='badge'>${method}${i}</div>`;       //lower the innerHTML wtih 1
        }

    }

    test(): void{
        this.hotkey.test();
    }
}



