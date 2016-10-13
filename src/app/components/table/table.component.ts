import { Component }      from '@angular/core';
import { DataService } from "../../services/data.service";
import {PageController} from "../../services/page.controller";
import {HotkeyService} from "../../services/hotkey.service";
@Component({
    selector: 'table-component',
    templateUrl: '../../templates/table/table.template.html'
})
export class TableComponent{
    constructor(private dataservice: DataService, private pagectrl: PageController){
    }
    removeEntry(index: number, method: string): void{           //remove an entry from the table
        this.dataservice.getData(method).splice(index, 1);
        this.removeBadge(index, method);
    }
    removeBadge(index: number, method: string): void{
        let element:any = document.getElementById(method+ (index+1) + 's');     //get the side badge
        element.remove();                                                       //destroy that element
        element = document.getElementById(method+ (index+1) + 'f');             //get the front badge
        element.remove();                                                       //destroy that element
        let datalength: number = this.dataservice.getData(method).length ;                                        //the length of the array of that certain method
        this.pagectrl.removeLocation(method, index);

        for(let i = index+1; i <= datalength; i++){  //iterate over the method array, starting from the removed element, until the end
            element = document.getElementById(method+ (i + 1) + 's');           //get the side badge
            element.id = method + i + 's';                                      //lower the id with 1
            element.innerHTML = `<div class='circle-finding'>${method.slice(0,1).toLocaleUpperCase()}${i}</div>`;       //lower the innerHTML with 1
            element = document.getElementById(method+ (i + 1) + 'f');           //get the front badge
            element.id = method + i + 'f';                                      //lower the id with 1
            element.innerHTML = `<div class='circle-finding'>${method.slice(0,1).toLocaleUpperCase()}${i}</div>`;       //lower the innerHTML wtih 1
        }

    }
    setDistance(distance: any, method: string, index: number): void{
        distance = parseFloat(distance);
        let data: any  = this.dataservice.getData(method);
        data.distance = distance;
        this.dataservice.setData(method, data, index);
    }


}



