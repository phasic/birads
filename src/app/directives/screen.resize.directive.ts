import {ElementRef, HostListener, Directive, ViewChild} from '@angular/core';
import {DataService} from "../services/data.service";
import {element} from "protractor";
import {PageController} from "../services/page.controller";

@Directive({
    selector: '[resize]'
})
export class ScreenResize {
    private imagediv: any;
    private badge: any;
    private divX: number;
    private divY: number;
    private divW: number;
    private divH: number;
    private badgeX: number;
    private badgeY: number;
    private wscale: number;
    private hscale: number;
    constructor(private dataservice: DataService, private pagectrl: PageController, private elementRef: ElementRef){
        setTimeout(() => {
            this.imagediv = document.getElementById('images').getBoundingClientRect();
            this.divX = this.imagediv.left;
            this.divY = this.imagediv.top;
            this.divW = this.imagediv.width;
            this.divH = this.imagediv.height;

        }, 100);

    }
    @HostListener('window:resize',['$event'])
    onResize(event: Event): void{

        this.imagediv = document.getElementById('images').getBoundingClientRect();
        this.wscale = this.imagediv.width / this.divW;
        this.hscale = this.imagediv.height / this.divH;

        let locX: number;
        let locY: number;

        for(let method of this.dataservice.getMethods()){
            for(let i = 1; i <= this.pagectrl.getBadgeLocation(method).length; i++){
                this.badge = document.getElementById(`${method}${i}s`);
                locX = this.imagediv.left + this.pagectrl.getBadgeLocation(method)[i-1].side.x*this.wscale ;
                locY = this.imagediv.top + this.pagectrl.getBadgeLocation(method)[i-1].side.y*this.hscale ;
                this.badge.style = `position: fixed; top:${locY}; left:${locX}`;
                this.badge = document.getElementById(`${method}${i}f`);
                locX = this.imagediv.left + this.pagectrl.getBadgeLocation(method)[i-1].front.x*this.wscale ;
                locY = this.imagediv.top + this.pagectrl.getBadgeLocation(method)[i-1].front.y*this.hscale ;
                this.badge.style = `position: fixed; top:${locY}; left:${locX}`;

            }
        }
        let element: any;
        if( (element = document.getElementById('firstlocation')) !== null) {
            locX = this.imagediv.left + this.pagectrl.firstclicklocation.x * this.wscale;
            locY = this.imagediv.top + this.pagectrl.firstclicklocation.y * this.hscale;
            element.style = `position: fixed; top:${locY}; left:${locX}`;
        }
    }
}

