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

        let badgefrontX, badgefrontY, badgesideX : number;
        badgefrontX = this.frontimage.x + this.frontclickedX - 15;
        badgefrontY = this.frontimage.y + this.frontclickedY - 5;
        badgesideX = this.sideimage.x + this.sideclickedX - 15;

        let tmp: any;
        tmp = document.createElement('div');
        tmp.setAttribute('context-menu', 'test($event)');
        tmp.innerHTML = `<div class='badge'>${argument}${index}</div>`;
        tmp.style = `position: fixed; top:${badgefrontY}; left:${badgesideX}`;
        tmp.id = argument + index + 's';
        elementref.nativeElement.appendChild(tmp);
        tmp = document.createElement('div');
        tmp.innerHTML = `<div class='badge'>${argument}${index}</div>`;
        tmp.style = `position: fixed; top:${badgefrontY}; left:${badgefrontX}`;
        tmp.id = argument + index + 'f';
        elementref.nativeElement.appendChild(tmp);

        this.saveBadgeLocation(argument, badgefrontX, badgefrontY, badgesideX, badgefrontY);
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



    /*--- MAP COMPONENT ---*/
    private frontimage: any;
    private sideimage: any;
    private frontclickedX:number;
    private frontclickedY: number;
    private sideclickedX: number;
    private sideclickedY: number;

    setClickedImage(image: any, event: any): void{
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
    //TODO MAKE EVERY GETTER AND SETTER LIKE THIS
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
    calculateBadgeDistance(): void{
        //TODO CALCULATE THE DISTANCE SOONER IN CLICKEDMAP, AND CHECK IF WE CLICKED OUTSIDE THE BREAST

        let originX, originY, originZ: number;

        originY = this.frontimage.height * 0.5;
        originZ = this.sideimage.width * 0.483;

        if(this.frontimage.id.slice(0,1) == 'R') {
            originX = this.frontimage.width * 0.516;  //DONT CHANGE THIS NUMBER!!!!
            this.distanceX = parseFloat(((this.frontclickedX  - originX) / originX).toFixed(2));
            this.distanceY = parseFloat((-(this.frontclickedY - originY) / originY).toFixed(2));
            this.distanceZ = parseFloat(((this.sideclickedX - originZ) / originZ).toFixed(2));
        }
        else if(this.frontimage.id.slice(0,1) == 'L'){
            originX = this.frontimage.width * 0.468;  //TODO MAKE EVERY IMAGE THE SAME SIZE THEN WE CAN DELETE THESE LINES
            this.distanceX = parseFloat(((this.frontclickedX  - originX) / originX).toFixed(2));
            this.distanceY = parseFloat((-(this.frontclickedY - originY) / originY).toFixed(2));
            this.distanceZ = parseFloat((-(this.sideclickedX - originZ) / originZ).toFixed(2));
        }
    }
}