import {Injectable, ElementRef} from "@angular/core";
import {DataService} from "./data.service";

@Injectable()
export class PageController {



    private method: string;
    private showmenu: string;
    private _firstclicklocation: {
        x: number,
        y: number
    };
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
    private menuactive: boolean;

    setMenuActive(value: boolean): void{
        this.menuactive = value;
    }
    getMenuActive(): boolean{
        return this.menuactive;
    }




    renderBadge(elementref: ElementRef): void {
        let argument: string;
        let index: number;
        switch (argument = this.getMethod().slice(0,1).toLocaleUpperCase()) {
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

        let badgefrontX: number = this.frontimage.x + this.frontclickedX;
        let badgesideX: number = this.sideimage.x + this.sideclickedX;
        let badgeY: number = this.firstimage.y + this.firstclickedY;

        let tmp: any;
        tmp = document.createElement('div');
        tmp.innerHTML = `<div class='circle-finding'>${argument}${index}</div>`;
        tmp.style = `position: fixed; top:${badgeY}; left:${badgesideX}`;
        tmp.id = argument + index + 's';
        elementref.nativeElement.appendChild(tmp);
        tmp = document.createElement('div');
        tmp.innerHTML = `<div class='circle-finding'>${argument}${index}</div>`;
        tmp.style = `position: fixed; top:${badgeY}; left:${badgefrontX}`;
        tmp.id = argument + index + 'f';
        elementref.nativeElement.appendChild(tmp);

        this.saveBadgeLocation(argument, badgefrontX, badgeY, badgesideX, badgeY);
    }
    private numberofclicks: number;
    setNumberOfClicks(numberofclicks: number): void{
        this.numberofclicks = numberofclicks;
    }
    getNumberOfClicks(): number{
        return this.numberofclicks;
    }


    saveBadgeLocation(argument: string, frontX: number, frontY: number, sideX: number, sideY: number): void{

        let imgdiv: any = document.getElementById('images').getBoundingClientRect();
        frontX -= imgdiv.left;
        frontY -= imgdiv.top;
        sideX -= imgdiv.left;
        sideY -= imgdiv.top;

        let badgecoordinates: any = {
            side: {
                x: sideX,
                y: sideY
            },
            front: {
                x: frontX,
                y: frontY
            }
        };
        if (argument == 'M') {
            this.badgelocations.mass.push(badgecoordinates);
        }
        else if(argument == 'D'){
            this.badgelocations.distortion.push(badgecoordinates);
        }
        else if(argument == 'A'){
            this.badgelocations.asymmetry.push(badgecoordinates);
        }
        else if(argument == 'C'){
            this.badgelocations.calcification.push(badgecoordinates);
        }

    }
    getBadgeLocations(): any{
        return this.badgelocations;
    }
    setBadgeLocations(badgelocation: any): void{
        this.badgelocations = badgelocation;
    }
    get firstclicklocation(): {x: number; y: number} {
        return this._firstclicklocation;
    }

    set firstclicklocation(value: {x: number; y: number}) {
        this._firstclicklocation = value;
    }

    removeLocation(method: string, index: number): void{
        switch (method){
            case 'M':
                this.badgelocations.mass.splice(index,1);
                break;
            case 'D':
                this.badgelocations.distortion.splice(index,1);
                break;
            case 'A':
                this.badgelocations.asymmetry.splice(index,1);
                break;
            case 'C':
                this.badgelocations.calcification.splice(index,1);
                break;
            default:
        }
    }


    /*--- MAP COMPONENT ---*/
    private frontimage: any;
    private sideimage: any;
    private firstimage: any;
    private frontclickedX:number;
    private frontclickedY: number;
    private sideclickedX: number;
    private sideclickedY: number;
    private firstclickedY: number;

    setClickedImage(image: any, event: any, first?: boolean): void{
        if(first){
            this.firstimage = image;
            this.firstclickedY = event.offsetY;
        }
        if(image.id.slice(1,2) === 'F') {
            this.frontimage = image;
            this.frontclickedX = event.offsetX;
            this.frontclickedY = event.offsetY;
        }
        else if(image.id.slice(1,2) === 'S'){
            this.sideimage = image;
            this.sideclickedX = event.offsetX;
            this.sideclickedY = event.offsetY;
        }
    }




    private _distanceX: number;
    private _distanceY: number;
    private _distanceZ: number;
    private _distance: number;
    get distanceZ(): number {
        return this._distanceZ;
    }
    set distanceZ(value: number) {
        this._distanceZ = value;
    }
    get distanceY(): number {
        return this._distanceY;
    }
    set distanceY(value: number) {
        this._distanceY = value;
    }
    get distanceX(): number {
        return this._distanceX;
    }
    set distanceX(value: number) {
        this._distanceX = value;
    }
    get distance(): number {
        return this._distance;
    }

    set distance(value: number) {
        this._distance = value;
    }
    calculateBadgeDistance(): void{
        //TODO CALCULATE THE DISTANCE SOONER IN CLICKEDMAP, AND CHECK IF WE CLICKED OUTSIDE THE BREAST

        let originX, originY, originZ: number;

        originY = this.frontimage.height * 0.5;
        originZ = this.sideimage.width * 0.483;

        if(this.frontimage.id.slice(0,1) == 'R') {
            originX = this.frontimage.width * 0.516;  //DONT CHANGE THIS NUMBER!!!!
            this.distanceX = (this.frontclickedX  - originX) / originX;
            this.distanceY = -(this.frontclickedY - originY) / originY;
            // this.distanceZ = parseFloat(((this.sideclickedX - originZ) / originZ).toFixed(2));
        }
        else if(this.frontimage.id.slice(0,1) == 'L'){
            originX = this.frontimage.width * 0.468;  //TODO MAKE EVERY IMAGE THE SAME SIZE THEN WE CAN DELETE THESE LINES
            this.distanceX = (this.frontclickedX  - originX) / originX;
            this.distanceY = -(this.frontclickedY - originY) / originY;
            // this.distanceZ = parseFloat((-(this.sideclickedX - originZ) / originZ).toFixed(2));
        }
        //TODO optimize this calculation
        this.distance = parseFloat((Math.sqrt(Math.pow(this.distanceX, 2) + Math.pow(this.distanceY,2))/Math.sqrt(2)).toFixed(2));
    }
}