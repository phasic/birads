import {Injectable, ElementRef} from "@angular/core";
import {DataService} from "./data.service";

@Injectable()
export class PageController {
    //TODO THE CLICK LOCATION OF EVERY FINDING NEEDS TO BE SAVED TOO
    private method: string;
    private showmenu: string;
    private clientX: number;
    private clientY: number;
    constructor( private dataservice: DataService) {
        this.method = '';
        this.showmenu = '';
    }

    setMethod(method: string): void {
        this.method = method;
    }
    getMethod(): string {
        return this.method;
    }
    setShowmenu(showmenu: string): void {
        this.showmenu = showmenu;
    }
    getShowmenu(): string {
        return this.showmenu;
    }
    isMenuShown(): boolean {
        return (this.showmenu !== '');
    }
    setClientX(clientX: number): void{
        this.clientX = clientX;
    }
    getClientX(): number{
        return this.clientX;
    }
    setClientY(clientY: number): void{
        this.clientY = clientY;
    }
    getClientY(): number{
        return this.clientY;
    }
    setMouseLocation(clientX: number, clientY: number): void{
        this.clientX = clientX;
        this.clientY = clientY;
    }
    createBadge(elementref: ElementRef) {
        console.log('In createBadge');
        switch (this.getMethod()) {
            //TODO RIGHT CLICK TO DELETE FINDING
            case 'mass':
                this.renderBadge('M', elementref);
                break;
            case 'distortion':
                this.renderBadge('D', elementref);
                break;
            case 'asymmetries':
                this.renderBadge('A', elementref);
                break;
            case 'calcifications':
                this.renderBadge('C', elementref);
                break;
            default:
        }
    }
    renderBadge(argument: string, elementref: ElementRef): void {
        let index: number;
        switch (argument) {
            case 'M':
                index = this.dataservice.getMass().length;
                break;
            case 'D':
                index = this.dataservice.getDistortions().length;
                break;
            case 'A':
                index = this.dataservice.getAsymmetries().length;
                break;
            case 'C':
                index = this.dataservice.getCalcifications().length;
        }
        let tmp: any;
        tmp = document.createElement('div');

        tmp.innerHTML = `<div class='badge'>${argument}${index}</div>`;
        tmp.style = `position: fixed; top:${this.clientY - 5}; left:${this.clientX - 7}`;
        console.log(tmp);
        elementref.nativeElement.appendChild(tmp);
    }


    private numberofclicks: number = 0;

    

}