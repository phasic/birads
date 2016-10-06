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
        this.dataservice = dataservice;
        this.pagectrl = pagectrl;
        this.elementRef = elementRef;
        setTimeout(() => {
            this.imagediv = document.getElementById('images').getBoundingClientRect();
            this.divX = this.imagediv.left;
            this.divY = this.imagediv.top;
            this.divW = this.imagediv.width;
            this.divH = this.imagediv.height;

            console.log(`X: ${this.divX}, Y: ${this.divY}, W: ${this.divW}, H: ${this.divH}`);
        }, 100);

    }
    @HostListener('window:resize',['$event'])
    onResize(event: Event): void{
        //TODO RESIZE, DO THIS LATER
        this.imagediv = document.getElementById('images').getBoundingClientRect();
        this.wscale = this.imagediv.width / this.divW;
        this.hscale = this.imagediv.height / this.divH;

        // console.log('111111111');
        // console.log(this.pagectrl.getBadgeLocations());
        // for(let x of this.pagectrl.getBadgeLocations()){
        //     console.log(x)
        // }


        let locX: number;
        let locY: number;
//TODO THIS IS TOO MESSY
        for(let i = 1; i <= this.pagectrl.getBadgeLocations().mass.length; i++){
            this.badge = document.getElementById('M' + i + 'a');
             locX = this.imagediv.left + this.pagectrl.getBadgeLocations().mass[i-1].side.x*this.wscale ;
             locY = this.imagediv.top + this.pagectrl.getBadgeLocations().mass[i-1].side.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;
            this.badge = document.getElementById('M' + i + 'b');
             locX = this.imagediv.left + this.pagectrl.getBadgeLocations().mass[i-1].front.x*this.wscale ;
             locY = this.imagediv.top + this.pagectrl.getBadgeLocations().mass[i-1].front.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;

        }
        for(let i = 1; i <= this.pagectrl.getBadgeLocations().distortion.length; i++){
            this.badge = document.getElementById('D' + i + 'a');
            locX = this.imagediv.left + this.pagectrl.getBadgeLocations().distortion[i-1].side.x*this.wscale ;
            locY = this.imagediv.top + this.pagectrl.getBadgeLocations().distortion[i-1].side.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;
            this.badge = document.getElementById('D' + i + 'b');
            locX = this.imagediv.left + this.pagectrl.getBadgeLocations().distortion[i-1].front.x*this.wscale ;
            locY = this.imagediv.top + this.pagectrl.getBadgeLocations().distortion[i-1].front.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;

        }
        for(let i = 1; i <= this.pagectrl.getBadgeLocations().asymmetry.length; i++){
            this.badge = document.getElementById('A' + i + 'a');
            locX = this.imagediv.left + this.pagectrl.getBadgeLocations().asymmetry[i-1].side.x*this.wscale ;
            locY = this.imagediv.top + this.pagectrl.getBadgeLocations().asymmetry[i-1].side.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;
            this.badge = document.getElementById('A' + i + 'b');
            locX = this.imagediv.left + this.pagectrl.getBadgeLocations().asymmetry[i-1].front.x*this.wscale ;
            locY = this.imagediv.top + this.pagectrl.getBadgeLocations().asymmetry[i-1].front.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;

        }
        for(let i = 1; i <= this.pagectrl.getBadgeLocations().calcification.length; i++){
            this.badge = document.getElementById('C' + i + 'a');
            locX = this.imagediv.left + this.pagectrl.getBadgeLocations().calcification[i-1].side.x*this.wscale ;
            locY = this.imagediv.top + this.pagectrl.getBadgeLocations().calcification[i-1].side.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;
            this.badge = document.getElementById('C' + i + 'b');
            locX = this.imagediv.left + this.pagectrl.getBadgeLocations().calcification[i-1].front.x*this.wscale ;
            locY = this.imagediv.top + this.pagectrl.getBadgeLocations().calcification[i-1].front.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;

        }


        // let locX: number = this.imagediv.left + this.pagectrl.getBadgeLocations().distortion[0].side.x*this.wscale ;
        // let locY: number = this.imagediv.top + this.pagectrl.getBadgeLocations().distortion[0].side.y*this.hscale ;
        //
        // this.badge.style = `position: fixed; top:${locY}; left:${locX}`;



    }



}

