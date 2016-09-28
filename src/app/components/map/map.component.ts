import {Component, ElementRef, ViewChild, ViewChildren, QueryList}      from '@angular/core';
import { DataService } from "../../services/data.service";
// import {element} from "@angular/upgrade/src/angular_js";
import {TranslateService} from "ng2-translate";
import {ModalDirective} from "ng2-bootstrap";
import {MassComponent} from "./modals/mass.component";


@Component({
    selector: 'map-component',
    templateUrl: '../../templates/map/map.template.html'
})
export class MapComponent{
    constructor(private dataservice: DataService, private translate: TranslateService){
        this.dataservice = dataservice;
        this.translate = translate;
    }



    @ViewChild('massModal1') public massModal1: ModalDirective;
    @ViewChild('massModal2') public massModal2: ModalDirective;
    @ViewChild('massModal3') public massModal3: ModalDirective;

    private showmenu: string;

    whichMenu(){
        console.log('In whichMenu()');
        switch (this.dataservice.getMethod()){
            case 'mass':
                this.showmenu = 'mass';
                break;
            case 'distortion':
                this.showmenu = 'distortion';
                break;
            case 'asymmetries':
                this.showmenu = 'asymmetries';
                break;
            case 'calcifications':
                this.showmenu = 'calcifications';
                break;
            default:
        }
    }

    test(){
        console.log("In MAPtest!");
        // console.log(this.dataservice.getData())
    }
    // addtoTable(): void{
    //     let location: Array<string> = this.getLocation();
    //     let region: string = location[0];
    //     let side: string = location[1];
    //     let level: string = location[2];
    //     let findentry: [boolean,number] = this.findEntry(region, side, level);
    //     let foundentry: boolean = findentry[0];
    //     let i: number = findentry[1];
    //     if(!foundentry){
    //         this.addData(region, level, side,'x', 'x', 'x', 'x', null, '', i);
    //         this.dataservice.setMethod('T2');
    //         this.dataservice.setFindingsIndex(0);
    //     }
    //     setTimeout(() => {
    //         let id: string = region + "_" + level + "_" + side;
    //         let element: any = document.getElementById(id);
    //         element.scrollIntoView();
    //         let sibling: any = element.parentNode.firstChild;
    //         for( ; sibling; sibling = sibling.nextSibling){
    //             if( sibling.nodeType == 1 && sibling != element){       //NodeType == 1 --> element_node
    //                 sibling.removeAttribute('class', 'highlight');
    //             }
    //         }
    //         element.setAttribute('class', 'highlight');
    //     });
    //
    //
    // };
    // addFinding(): void{
    //     let location: Array<string> = this.getLocation();
    //     let region: string = location[0];
    //     let side: string = location[1];
    //     let level: string = location[2];
    //     let findentry: [boolean, number] = this.findEntry(region,side,level);
    //     let foundEntry: boolean = findentry[0];
    //     let i: number = findentry[1];
    //
    //     if(foundEntry){
    //         try {
    //             if(this.dataservice.getData()[i].findings.length >= 10){
    //                 event.preventDefault();
    //                 event.stopPropagation();
    //                 return;
    //             }
    //             if (this.dataservice.getData()[i].findings.length >= 4) {
    //                 let confirmstring: any = this.translate.get("TABLE.DIALOG");
    //                 if (window.confirm(confirmstring.value)) {
    //                     this.dataservice.getData()[i].findings.push(
    //                         {
    //                             T2: 'x',
    //                             DWI: 'x',
    //                             DCE: 'x',
    //                             PIRADS: 'x',
    //                             volume: null,
    //                             comment: ''
    //                         }
    //                     );
    //                     this.dataservice.setFindingsIndex(this.dataservice.getData()[i].findings.length-1);
    //                 }
    //             }
    //             else {
    //                 this.dataservice.getData()[i].findings.push(
    //                     {
    //                         T2: 'x',
    //                         DWI: 'x',
    //                         DCE: 'x',
    //                         PIRADS: 'x',
    //                         volume: null,
    //                         comment: ''
    //                     }
    //                 );
    //                 this.dataservice.setFindingsIndex(this.dataservice.getData()[i].findings.length-1);
    //             }
    //         }
    //         catch (e) {
    //             //just ignore the error
    //         }
    //     }
    //     else {
    //         this.addtoTable();
    //     }
    //     setTimeout(() => {
    //         let id: string = region + "_" + level + "_" + side;
    //         let element: any = document.getElementById(id);
    //         element.scrollIntoView();
    //         let sibling: any = element.parentNode.firstChild;
    //         for( ; sibling; sibling = sibling.nextSibling){
    //             if( sibling.nodeType == 1 && sibling != element){       //NodeType == 1 --> element_node
    //                 sibling.removeAttribute('class', 'highlight');
    //             }
    //         }
    //         element.setAttribute('class', 'highlight');
    //     });
    //     event.preventDefault();
    //     event.stopPropagation();
    //
    // }
    // adjustScore(delta: number): void{
    //     try {
    //         //Get the correct sector
    //         let location: Array<string> = this.getLocation();
    //         let region: string = location[0];
    //         let side: string = location[1];
    //         let level: string = location[2];
    //         //Get the selected method
    //         let method: string = this.dataservice.getMethod();
    //         //Find the entry in the data
    //         let findentry: [boolean, number] = this.findEntry(region, side, level);
    //         let foundentry: boolean = findentry[0];
    //         let i: number = findentry[1];
    //         //Declare default score arrays
    //         let scorearray1: Array<string> = ['1', '2', '3', '4', '5', 'x'];
    //         let scorearray2: Array<string> = ['-', '+', 'x'];
    //         let scorearray: Array<string>;
    //         //Declare the index in the score array, used for incrementing and decrementing the score
    //         let index: number;
    //         switch (method) {
    //             case 'T2':
    //                 scorearray = scorearray1;
    //                 index = scorearray.indexOf(this.dataservice.getData()[i].findings[this.dataservice.getFindingsIndex()].T2);
    //                 break;
    //             case 'DWI':
    //                 scorearray = scorearray1;
    //                 index = scorearray.indexOf(this.dataservice.getData()[i].findings[this.dataservice.getFindingsIndex()].DWI);
    //                 break;
    //             case 'DCE':
    //                 scorearray = scorearray2;
    //                 index = scorearray.indexOf(this.dataservice.getData()[i].findings[this.dataservice.getFindingsIndex()].DCE);
    //                 break;
    //             default:
    //         }
    //         //Get the scroll direction. negative = up, positive = down
    //             if (delta > 0) {
    //                 index--;
    //             if (index < 0) {
    //                 index = scorearray.length - 1;
    //             }
    //         }
    //         else if (delta < 0) {
    //             index++;
    //             if (index >= scorearray.length) {
    //                 index = 0;
    //             }
    //         }
    //         //Place the new score in the dataservice data
    //         switch (method) {
    //             case 'T2':
    //                 this.dataservice.getData()[i].findings[this.dataservice.getFindingsIndex()].T2 = scorearray[index];
    //                 break;
    //             case 'DWI':
    //                 this.dataservice.getData()[i].findings[this.dataservice.getFindingsIndex()].DWI = scorearray[index];
    //                 break;
    //             case 'DCE':
    //                 this.dataservice.getData()[i].findings[this.dataservice.getFindingsIndex()].DCE = scorearray[index];
    //                 break;
    //             default:
    //         }
    //         this.dataservice.calcPirads(region,i);
    //
    //         // this.colorMap();
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }
    //     catch(e){
    //         if(e instanceof TypeError){} //We're scrolling over a field that's not in the data, that's okay
    //         else{console.log(e);}
    //     }
    // }
    // findEntry(region: string, side: string, level: string): [boolean,number]{
    //     let i: number;
    //     for (i = 0; i < this.dataservice.getData().length; i++){          //run over the data to check for doubles
    //         if((region === this.dataservice.getData()[i].region) && (side === this.dataservice.getData()[i].side) && (level === this.dataservice.getData()[i].level )){
    //             return [true, i];
    //         }
    //     }
    //     return [false,i];
    // }
    // addData(region:string, level: string, side: string, T2: string, DWI: string, DCE: string, PIRADS: string,
    //         volume: number, comment: string, index: number): void{
    //     this.dataservice.getData().push({
    //         region: region,
    //         level: level,
    //         side: side,
    //         findings: [{
    //             T2: T2,
    //             DWI: DWI,
    //             DCE: DCE,
    //             PIRADS: PIRADS,
    //             volume: volume,
    //             comment: comment,
    //         }],
    //         index: index
    //     });
    // }
    // getLocation(): Array<string>{
    //     return event.srcElement.getAttribute("title").split("_");
    // }
    //
    // private hotkeyclicked: boolean;
    // hotKeys(keycode: number): void{
    //     let location: Array<string> = this.getLocation();
    //     this.hotkeyclicked = true;
    // //TODO: Maybe a popover to show which key selected
    //     switch(keycode){
    //         case 49: //1
    //             this.dataservice.setFindingsIndex(0);
    //             break;
    //         case 50: //2
    //             this.dataservice.setFindingsIndex(1);
    //             break;
    //         case 51: //3
    //             this.dataservice.setFindingsIndex(2);
    //             break;
    //         case 52: //4
    //             this.dataservice.setFindingsIndex(3);
    //             break;
    //         case 53: //5
    //             this.dataservice.setFindingsIndex(4);
    //             break;
    //         case 54: //6
    //             this.dataservice.setFindingsIndex(5);
    //             break;
    //         case 55: //7
    //             this.dataservice.setFindingsIndex(6);
    //             break;
    //         case 56: //8
    //             this.dataservice.setFindingsIndex(7);
    //             break;
    //         case 57: //9
    //             this.dataservice.setFindingsIndex(8);
    //             break;
    //         case 48: //0
    //             this.dataservice.setFindingsIndex(9);
    //             break;
    //         case 81: //Q
    //             this.dataservice.setMethod('T2');
    //             break;
    //         case 87: //W
    //             this.dataservice.setMethod('DWI');
    //             break;
    //         case 69: //E
    //             this.dataservice.setMethod('DCE');
    //             break;
    //         case 38: //UP arrow
    //             this.adjustScore(-100);
    //             break;
    //         case 40: //DOWN arrow
    //             this.adjustScore(100);
    //             break;
    //         case 37: //LEFT arrow
    //             this.adjustMethod('left');
    //             break;
    //         case 39: //RIGHT arrow
    //             this.adjustMethod('right');
    //             break;
    //         default:
    //     }
    //     this.hotkeyclicked = !this.hotkeyclicked;
    // }
    // adjustMethod(direction: string): void{
    //     let methods: Array<string> = ['T2', 'DWI', 'DCE']; //this wil be used for the left right arrows
    //     let method: string;
    //     let methodindex: number;
    //     method = this.dataservice.getMethod();
    //     methodindex = methods.indexOf(method);
    //     switch(direction) {
    //         case 'left':
    //             methodindex --;
    //             if(methodindex < 0){
    //                 methodindex = methods.length-1;
    //             }
    //             break;
    //         case 'right':
    //             methodindex ++;
    //             if(methodindex > methods.length-1){
    //                 methodindex = 0;
    //             }
    //             break;
    //         default:
    //     }
    //     this.dataservice.setMethod(methods[methodindex]);
    // }
    //
    // colorMap(){
    //     console.log("COLORMAP");
    //     console.log(event.srcElement);
    //     event.srcElement.setAttribute("ng-attr-fill", "background-color:red");
    // }
}


