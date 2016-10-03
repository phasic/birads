import {Injectable, ElementRef} from "@angular/core";
import {DataService} from "./data.service";

@Injectable()
export class PageController {
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
        tmp.style = `position: fixed; top:${this.sideY - 5}; left:${this.sideX - 7}`;
        console.log(tmp);
        elementref.nativeElement.appendChild(tmp);


        tmp = document.createElement('div');

        tmp.innerHTML = `<div class='badge'>${argument}${index}</div>`;
        tmp.style = `position: fixed; top:${this.frontY - 5}; left:${this.frontX - 7}`;
        console.log(tmp);
        elementref.nativeElement.appendChild(tmp);
    }


    private numberofclicks: number = 0;

    setNumberOfClicks(numberofclicks: number): void{
        this.numberofclicks = numberofclicks;
    }
    getNumberOfClicks(): number{
        return this.numberofclicks;
    }
    addClick(): void{
        this.numberofclicks++;
    }


    private sideX: number;
    private sideY: number;
    private frontX: number;
    private frontY: number;


    setSideX(sideX: number): void{
        this.sideX = sideX;
    }
    getSideX(): number{
        return this.sideX;
    }
    setSideY(sideY: number){
        this.sideY = sideY;
    }
    getSideY(): number{
        return this.sideY;
    }
    setSideLoc(sideX: number, sideY: number): void{
        this.sideX = sideX;
        this.sideY = sideY;
    }
    setFrontX(frontX: number): void{
        this.frontX = frontX;
    }
    getFrontX(): number{
        return this.frontX;
    }
    setFrontY(frontY: number): void{
        this.frontY = frontY;
    }
    getFrontY(): number{
        return this.frontY;
    }
    setFrontLoc(frontX: number, frontY: number): void{
        this.frontX = frontX;
        this.frontY = frontY;
    }
}