import {Injectable, ElementRef} from "@angular/core";
import {DataService} from "./data.service";

@Injectable()
export class PageController {
    private method: string;
    private showmenu: string;

    constructor( private dataservice: DataService) {
        this.method = '';
        this.showmenu = '';
        this.numberofclicks = 0;
        this.height = '';
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

    createBadge(elementref: ElementRef) {
        switch (this.getMethod()) {
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
        tmp.setAttribute('context-menu', 'test($event)');
        tmp.innerHTML = `<div class='badge'>${argument}${index}</div>`;
        tmp.style = `position: fixed; top:${this.frontY - 5}; left:${this.sideX - 7}`;
        tmp.id = argument + index + 'a';
        elementref.nativeElement.appendChild(tmp);

        tmp = document.createElement('div');
        tmp.innerHTML = `<div class='badge'>${argument}${index}</div>`;
        tmp.style = `position: fixed; top:${this.frontY - 5}; left:${this.frontX - 7}`;
        tmp.id = argument + index + 'b';
        elementref.nativeElement.appendChild(tmp);
    }


    private numberofclicks: number;

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


    getSideX(): number{
        return this.sideX;
    }
    getSideY(): number{
        return this.sideY;
    }
    setSideLoc(sideX: number, sideY: number): void{
        this.sideX = sideX;
        this.sideY = sideY;
    }
    getFrontX(): number{
        return this.frontX;
    }
    getFrontY(): number{
        return this.frontY;
    }
    setFrontLoc(frontX: number, frontY: number): void{
        this.frontX = frontX;
        this.frontY = frontY;
    }



    test(event){
        console.log("TEST");
        event.preventDefault();
        event.stopPropagation();
    }

    private height: string;

    setClickedHeight(height: number){
        if(height <= 0.5){
            this.height = "top";
        }
        else if(height > 0.5){
            this.height = "bottom";
        }
    }
    getclickedHeight(): string{
        return this.height;
    }

    checkClickedHeight(clickoffset: number, imgsize: number): boolean{     //compares second click with height of the first click
        let height2: number = clickoffset/imgsize;
        return ((height2 <= 0.5 && this.height == 'top') || (height2 > 0.5 && this.height == 'bottom'));

    }
}