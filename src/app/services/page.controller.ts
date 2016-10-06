import {Injectable, ElementRef} from "@angular/core";
import {DataService} from "./data.service";

@Injectable()
export class PageController {
    private method: string;
    private showmenu: string;
    private badgelocations: {
        mass: {
            side: {
                x: number,
                y: number
            },
            front: {
                x: number,
                y: number
            }
        }[],
        distortion: {
            side: {
                x: number,
                y: number
            },
            front: {
                x: number,
                y: number
            }
        }[],
        asymmetry: {
            side: {
                x: number,
                y: number
            },
            front: {
                x: number,
                y: number
            }
        }[],
        calcification: {
            side: {
                x: number,
                y: number
            },
            front: {
                x: number,
                y: number
            }
        }[]
    };


    constructor( private dataservice: DataService) {
        this.method = '';
        this.showmenu = '';
        this.numberofclicks = 0;
        this.height = '';
        this.badgelocations = {
            mass: [],
            distortion: [],
            asymmetry: [],
            calcification: []
        };
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


        this.sideX = this.sideX - 15;
        this.sideY = this.sideY - 5;
        this.frontX = this.frontX - 15;
        this.frontY = this.frontY - 5;


        let tmp: any;
        tmp = document.createElement('div');
        tmp.setAttribute('context-menu', 'test($event)');
        tmp.innerHTML = `<div class='badge'>${argument}${index}</div>`;
        tmp.style = `position: fixed; top:${this.frontY}; left:${this.sideX}`;
        tmp.id = argument + index + 'a';
        elementref.nativeElement.appendChild(tmp);

        tmp = document.createElement('div');
        tmp.innerHTML = `<div class='badge'>${argument}${index}</div>`;
        tmp.style = `position: fixed; top:${this.frontY}; left:${this.frontX}`;
        tmp.id = argument + index + 'b';
        elementref.nativeElement.appendChild(tmp);

        this.saveBadgeLocation(argument);
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



    saveBadgeLocation(argument: string): void {
        //make the badlocation first relative to the image instead of to the screen

        let imagediv: any = document.getElementById('images').getBoundingClientRect();
        this.sideX -= imagediv.left;
        this.frontX -= imagediv.left;
        this.sideY -= imagediv.top;
        this.frontY -= imagediv.top;

        //TODO this can be wrond, look into it if it forms a problem

        if (argument == 'M') {
            this.badgelocations.mass.push(
                {
                    side: {
                        x: this.sideX,
                        y: this.frontY
                    },
                    front: {
                        x: this.frontX,
                        y: this.frontY
                    }
                }
            );
        }
        else if(argument == 'D'){
            this.badgelocations.distortion.push(
                {
                    side:{
                        x : this.sideX,
                        y : this.frontY
                    },
                    front:{
                        x : this.frontX,
                        y : this.frontY
                    }
                }
            );
        }
        else if(argument == 'A'){
            this.badgelocations.asymmetry.push(
                {
                    side:{
                        x : this.sideX,
                        y : this.frontY
                    },
                    front:{
                        x : this.frontX,
                        y : this.frontY
                    }
                }
            );
        }
        else if(argument == 'C'){
            this.badgelocations.calcification.push(
                {
                    side:{
                        x : this.sideX,
                        y : this.frontY
                    },
                    front:{
                        x : this.frontX,
                        y : this.frontY
                    }
                }
            );
        }

    }

    getBadgeLocations(): any{
        return this.badgelocations;
    }
}