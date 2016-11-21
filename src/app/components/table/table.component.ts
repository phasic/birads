import { Component }      from '@angular/core';
import { DataService } from "../../services/data.service";
import {PageController} from "../../services/page.controller";
/**
 * This component contains the table.
 *
 * Every method (mass, distortion, asymmetry, ...) has a different table for their findings.
 *
 * Once a finding is entered via the menus, that data will be automatically added to the table corresponding with the selected method.
 *
 *          selector: 'table-component'
 *          templateUrl: '../../templates/table/table.template.html'
 */
@Component({
    selector: 'table-component',
    templateUrl: '../../templates/table/table.template.html'
})
export class TableComponent{
    /**
     * The constructor will initialize the following
     * @param dataservice   This service stores all the data
     * @param pagectrl      Page controller manages functions to assure functionality (tracking click, adding badges, ... )
     */
    constructor(private dataservice: DataService, private pagectrl: PageController){
    }

    /**
     * When the remove button on a row is pressed, removeEntry will be alled and removes that row and the corresponding badge.
     * @param index     the row number of the entry
     * @param method    name of the table
     */
    removeEntry(index: number, method: string): void{           //remove an entry from the table
        this.dataservice.getData(method).splice(index, 1);      //remove the entry from the dataervice ( and table)
        this.removeBadge(index, method);                        //remove the entry badge from the images
    }

    /**
     * Removes the badges which corresponds to the correct entry determined by the index and method.
     *
     * When the badge is removed, the other badges of the same method need to be adjusted to the correct number again.
     * @param index     The row number of the entry
     * @param method    Name of the table
     */
    removeBadge(index: number, method: string): void{
        let element:any = document.getElementById(method+ (index+1) + 's');     //get the side badge
        element.remove();                                                       //destroy that element
        element = document.getElementById(method+ (index+1) + 'f');             //get the front badge
        element.remove();                                                       //destroy that element
        let datalength: number = this.dataservice.getData(method).length ;      //the length of the array of that certain method
        this.pagectrl.removeLocation(method, index);                            //remove the badge location from the page controller ( that array is used for screen resizing and scrolling)

        for(let i = index+1; i <= datalength; i++){                              //iterate over the method array, starting from the removed element, until the end
            element = document.getElementById(method+ (i + 1) + 's');           //get the side badge
            element.id = method + i + 's';                                      //lower the id with 1
            element.innerHTML = `<div class='circle-finding'>${method.slice(0,1).toLocaleUpperCase()}${i}</div>`;   //lower the innerHTML with 1
            element = document.getElementById(method+ (i + 1) + 'f');           //get the front badge
            element.id = method + i + 'f';                                      //lower the id with 1
            element.innerHTML = `<div class='circle-finding'>${method.slice(0,1).toLocaleUpperCase()}${i}</div>`;   //lower the innerHTML wtih 1
        }
    }

    /**
     * Set the distance of that certain entry, based on a value of an input box.
     * @param distance  Passed value, which is entered in an input box
     * @param method    Name of the table (name is based on a method)
     * @param index     Row number of the entry
     */
    setDistance(distance: any, method: string, index: number): void{
        distance = parseFloat(distance);                        //change the distance to a float ( gets passed as a string on runtime, we dont want that)
        let data: any  = this.dataservice.getData(method);      //get the data of the selected row and table
        data.distance = distance;                               //change the original distance to the new distance
        this.dataservice.setData(method, data, index);          //bind the data again with the updated distance value
    }

    /**
     * Set the size of that certain entry, based on a value of and input box.
     * @param size      Passed value, which is entered in an input box
     * @param method    Name of the table (name is based on a method)
     * @param index     Row number of the entry
     */
    setSize(size: any, method: string, index: number): void{
        size = parseFloat(size);                                //change the size to a float ( gets passed as a string on runtime, we dont want that)
        let data: any  = this.dataservice.getData(method);      //get the data of the selected row and table
        data.size = size;                                       //change the original size to the new size
        this.dataservice.setData(method, data, index);          //bind the data again with the updated size value
    }

}



