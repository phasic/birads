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

    //TODO REMOVE THE SWITCHES
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
            case 'P':
                this.dataservice.getPalpitations().splice(index,1);
                this.removeBadge(index, method);
                break;
            case 'S':
                this.dataservice.getScars().splice(index,1);
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
            case 'P':
                datalength = this.dataservice.getPalpitations().length;
                this.pagectrl.removeLocation('P', index);
                break;
            case 'S':
                datalength = this.dataservice.getScars().length;
                this.pagectrl.removeLocation('P', index);
                break;
            default:
        }
        for(let i = index+1; i <= datalength; i++){  //iterate over the method array, starting from the removed element, until the end
            element = document.getElementById(method+ (i + 1) + 's');           //get the side badge
            element.id = method + i + 's';                                      //lower the id with 1
            element.innerHTML = `<div class='circle-finding'>${method}${i}</div>`;       //lower the innerHTML with 1
            element = document.getElementById(method+ (i + 1) + 'f');           //get the front badge
            element.id = method + i + 'f';                                      //lower the id with 1
            element.innerHTML = `<div class='circle-finding'>${method}${i}</div>`;       //lower the innerHTML wtih 1
        }

    }


    setDistance(distance: any, method: string, index: number): void{
        distance = parseFloat(distance);
        let data: any = this.dataservice;
        if(method == 'M'){
            data = data.getMass(index);
            data.distance = distance;
            this.dataservice.setMass(data, index);
        }
        else if(method == 'D'){
            data = data.getDistortions(index);
            data.distance = distance;
            this.dataservice.setDistortions(data, index);
        }
        else if(method == 'A'){
            data = data.getAsymmetries(index);
            data.distance = distance;
            this.dataservice.setAsymmetries(data, index);
        }
        else if(method == 'C'){
            data = data.getCalcifications(index);
            data.distance = distance;
            this.dataservice.setCalcifications(data, index);
        }
        else if(method == 'P'){
            data = data.getPalpitations(index);
            data.distance = distance;
            this.dataservice.setPalpitations(data, index);
        }
        else if(method == 'S'){
            data = data.getScars(index);
            data.distance = distance;
            this.dataservice.setScars(data, index);
        }
    }
}



