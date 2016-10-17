import {Injectable, ElementRef} from "@angular/core";
import {DataService} from "./data.service";
import {element} from "protractor";

@Injectable()
export class PageController {
    get sideclicklocation(): {relX: number; relY: number; imagenumber: number} {
        return this._sideclicklocation;
    }

    set sideclicklocation(value: {relX: number; relY: number; imagenumber: number}) {
        this._sideclicklocation = value;
    }
    get frontclicklocation(): {relX: number; relY: number; imagenumber: number} {
        return this._frontclicklocation;
    }

    set frontclicklocation(value: {relX: number; relY: number; imagenumber: number}) {
        this._frontclicklocation = value;
    }
    get firstclicklocation(): {relX: number; relY: number; imagenumber: number} {
        return this._firstclicklocation;
    }

    set firstclicklocation(value: {relX: number; relY: number; imagenumber: number}) {
        this._firstclicklocation = value;
    }

    get distance(): number {
        return this._distance;
    }
    set distance(value: number) {
        this._distance = value;
    }
    get images(): {image: any; locX: number; locY: number; width: number; height: number}[] {
        return this._images;
    }
    private method: string;
    private showmenu: string;
    private menuactive: boolean;
    private numberofclicks: number;
    private _distance: number;
    private _firstclicklocation: {
        relX: number,
        relY: number,
        imagenumber: number
    };
    private _frontclicklocation: {
        relX: number,
        relY: number,
        imagenumber: number
    };
    private _sideclicklocation: {
        relX: number,
        relY: number,
        imagenumber: number
    };
    private _images: {
        image: any,
        locX: number,
        locY: number,
        width: number,
        height: number
    }[];
    private badgelocations: {
        mass: {
            side: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            },
            front: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            }
        }[],
        distortion: {
            side: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            },
            front: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            }
        }[],
        asymmetry: {
            side: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            },
            front: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            }
        }[],
        calcification: {
            side: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            },
            front: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            }
        }[],
        palpitation: {
            side: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            },
            front: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            }
        }[],
        scar: {
            side: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            },
            front: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
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
            calcification: [],
            palpitation: [],
            scar: []
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
    setNumberOfClicks(numberofclicks: number): void{
        this.numberofclicks = numberofclicks;
    }
    getNumberOfClicks(): number{
        return this.numberofclicks;
    }
    setMenuActive(value: boolean): void{
        this.menuactive = value;
    }
    getMenuActive(): boolean{
        return this.menuactive;
    }

    setImages(){
        let imageelements: any;
        imageelements = document.getElementsByClassName("map-image");
        this._images = [];
        for(let element of imageelements){
            this._images.push({
                image: element,
                locX: element.getBoundingClientRect().left,
                locY: element.getBoundingClientRect().top,
                width: element.width,
                height: element.height
            })
        }

    }

    setClickLocation(target: any, event: any, first?: boolean): void{
        let image: any = target.parentNode.previousElementSibling;    //convert the clicked map to the corresponding image
        let index: number = 0;
        let imagenumber: number;
        for(let argument of this.images){
            if(argument.image.id === target.id + 'img'){
                imagenumber = index;
                break;
            }
            index++;
        }
        let relX: number = (event.clientX - image.getBoundingClientRect().left) / image.width;
        let relY: number = (event.clientY - image.getBoundingClientRect().top) / image.height;
        if(first){
            this.firstclicklocation = { relX: relX, relY: relY, imagenumber: imagenumber};
        }
        if(image.id.slice(1,2) === 'F') {
            this.frontclicklocation = { relX: relX, relY: relY, imagenumber: imagenumber};
        }
        else if(image.id.slice(1,2) === 'S'){
            this.sideclicklocation = { relX: relX, relY: relY, imagenumber: imagenumber};
        }
    }
    calculateDistance(): void{
        let frontimage: any = this.images[this.frontclicklocation.imagenumber].image;
        let sideimage: any = this.images[this.sideclicklocation.imagenumber].image;
        let originX: number;
        let originY: number = frontimage.height * 0.5;
        let originZ: number = sideimage.width * 0.483;
        let distanceX: number;
        let distanceY: number;
        let distanceZ: number;
        if(frontimage.id.slice(0,1) == 'R') {
            originX = frontimage.width * 0.516;  //DONT CHANGE THIS NUMBER!!!!
            distanceX = (this.frontclicklocation.relX  - originX) / originX;
            distanceY = -(this.frontclicklocation.relY - originY) / originY;
            // this.distanceZ = parseFloat(((this.sideclickedX - originZ) / originZ).toFixed(2));
        }
        else if(frontimage.id.slice(0,1) == 'L'){
            originX = frontimage.width * 0.468;
            distanceX = (this.frontclicklocation.relX  - originX) / originX;
            distanceY = -(this.frontclicklocation.relY - originY) / originY;
            // this.distanceZ = parseFloat((-(this.sideclickedX - originZ) / originZ).toFixed(2));
        }
        //TODO optimize this calculation
        this.distance = parseFloat((Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY,2))/Math.sqrt(2)).toFixed(2));
    }

    renderBadge(elementref: ElementRef): void {

        let argument: string;
        let index: number;

        for(let method of this.dataservice.methods){
            if(this.getMethod() == method){
                index = this.dataservice.getData(method).length;
                argument = method;
                break;
            }
        }
        let firstclick: any = this.firstclicklocation;
        let firstimage: any = this.images[firstclick.imagenumber];
        let frontclick: any = this.frontclicklocation;
        let frontimage: any = this.images[frontclick.imagenumber];
        let sideclick: any = this.sideclicklocation;
        let sideimage: any = this.images[sideclick.imagenumber];

        let badgefrontX: number = frontimage.locX + (frontclick.relX * frontimage.width);
        let badgesideX: number = sideimage.locX + (sideclick.relX * sideimage.width);
        let badgeY: number = firstimage.locY + (firstclick.relY * firstimage.height);


        let idside: string;
        let idfront: string;
        let tmp: any;
        tmp = document.createElement('div');
        tmp.innerHTML = `<div class='circle-finding'>${argument.slice(0,1).toLocaleUpperCase()}${index}</div>`;
        tmp.style = `position: fixed; top:${badgeY}; left:${badgesideX}`;
        idside = argument + index + 's';
        tmp.id = idside;
        elementref.nativeElement.appendChild(tmp);
        tmp = document.createElement('div');
        tmp.innerHTML = `<div class='circle-finding'>${argument.slice(0,1).toLocaleUpperCase()}${index}</div>`;
        tmp.style = `position: fixed; top:${badgeY}; left:${badgefrontX}`;
        idfront = argument + index + 'f';
        tmp.id = idfront;
        elementref.nativeElement.appendChild(tmp);

        this.saveBadgeLocation(argument, sideclick.relX, firstclick.relY, sideclick.imagenumber, idside ,
            frontclick.relX, firstclick.relY, frontclick.imagenumber, idfront);
    }

    saveBadgeLocation(method: string, sideX: number, sideY: number, sideN: number, idside: string,
                      frontX: number, frontY: number, frontN: number, idfront: string){

        let badgecoordinates: any = {
            side: {
                relX: sideX,
                relY: sideY,
                imagenumber: sideN,
                id: idside
            },
            front: {
                relX: frontX,
                relY: frontY,
                imagenumber: frontN,
                id: idfront
            }
        };
        for(let m of this.dataservice.methods){
            if(method == m){
                this.badgelocations[method].push(badgecoordinates);
                break;
            }
        }
    }
    removeLocation(method: string, index: number): void{
        this.getBadgeLocation(method).splice(index,1);
    }
    getBadgeLocation(method: string): any{
        for(let m of this.dataservice.methods){
            if(method == m){
                return this.badgelocations[method];
            }
        }
    }

    resizeBadges(){
        this.setImages(); //update the images
        let element: any;
        let locX: number;
        let locY: number;
        let image: any;


        for(let method of this.dataservice.methods){
            for(let entry of this.badgelocations[method]){
                //side
                    locX = this.images[entry.side.imagenumber].locX + (entry.side.relX * this.images[entry.side.imagenumber].width);
                    locY = this.images[entry.side.imagenumber].locY + (entry.side.relY * this.images[entry.side.imagenumber].height);
                    element = document.getElementById(entry.side.id);
                    element.style = `position: fixed; top:${locY}; left:${locX}`;
                //front
                    locX = this.images[entry.front.imagenumber].locX + (entry.front.relX * this.images[entry.front.imagenumber].width);
                    locY = this.images[entry.front.imagenumber].locY + (entry.front.relY * this.images[entry.front.imagenumber].height);
                    element = document.getElementById(entry.front.id);
                    element.style = `position: fixed; top:${locY}; left:${locX}`;
            }
        }

        if((element = document.getElementById('firstlocation')) !== null) {
            image = this.images[this.firstclicklocation.imagenumber];
            locX = image.locX + (image.width * this.firstclicklocation.relX);
            locY = image.locY + (image.height * this.firstclicklocation.relY);
            element.style = `position: fixed; top:${locY}; left:${locX}`;
        }





    }
}