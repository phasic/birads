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

    //TODO ACCEPT THE UGLINEES, BUT CLEAN IT UP
        for(let i = 1; i <= this.pagectrl.getBadgeLocations().mass.length; i++){
            this.badge = document.getElementById('M' + i + 's');
             locX = this.imagediv.left + this.pagectrl.getBadgeLocations().mass[i-1].side.x*this.wscale ;
             locY = this.imagediv.top + this.pagectrl.getBadgeLocations().mass[i-1].side.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;
            this.badge = document.getElementById('M' + i + 'f');
             locX = this.imagediv.left + this.pagectrl.getBadgeLocations().mass[i-1].front.x*this.wscale ;
             locY = this.imagediv.top + this.pagectrl.getBadgeLocations().mass[i-1].front.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;
        }
        for(let i = 1; i <= this.pagectrl.getBadgeLocations().distortion.length; i++){
            this.badge = document.getElementById('D' + i + 's');
            locX = this.imagediv.left + this.pagectrl.getBadgeLocations().distortion[i-1].side.x*this.wscale ;
            locY = this.imagediv.top + this.pagectrl.getBadgeLocations().distortion[i-1].side.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;
            this.badge = document.getElementById('D' + i + 'f');
            locX = this.imagediv.left + this.pagectrl.getBadgeLocations().distortion[i-1].front.x*this.wscale ;
            locY = this.imagediv.top + this.pagectrl.getBadgeLocations().distortion[i-1].front.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;
        }
        for(let i = 1; i <= this.pagectrl.getBadgeLocations().asymmetry.length; i++){
            this.badge = document.getElementById('A' + i + 's');
            locX = this.imagediv.left + this.pagectrl.getBadgeLocations().asymmetry[i-1].side.x*this.wscale ;
            locY = this.imagediv.top + this.pagectrl.getBadgeLocations().asymmetry[i-1].side.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;
            this.badge = document.getElementById('A' + i + 'f');
            locX = this.imagediv.left + this.pagectrl.getBadgeLocations().asymmetry[i-1].front.x*this.wscale ;
            locY = this.imagediv.top + this.pagectrl.getBadgeLocations().asymmetry[i-1].front.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;
        }
        for(let i = 1; i <= this.pagectrl.getBadgeLocations().calcification.length; i++){
            this.badge = document.getElementById('C' + i + 's');
            locX = this.imagediv.left + this.pagectrl.getBadgeLocations().calcification[i-1].side.x*this.wscale ;
            locY = this.imagediv.top + this.pagectrl.getBadgeLocations().calcification[i-1].side.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;
            this.badge = document.getElementById('C' + i + 'f');
            locX = this.imagediv.left + this.pagectrl.getBadgeLocations().calcification[i-1].front.x*this.wscale ;
            locY = this.imagediv.top + this.pagectrl.getBadgeLocations().calcification[i-1].front.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;
        }
        for(let i = 1; i <= this.pagectrl.getBadgeLocations().palpitation.length; i++){
            this.badge = document.getElementById('P' + i + 's');
            locX = this.imagediv.left + this.pagectrl.getBadgeLocations().palpitation[i-1].side.x*this.wscale ;
            locY = this.imagediv.top + this.pagectrl.getBadgeLocations().palpitation[i-1].side.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;
            this.badge = document.getElementById('P' + i + 'f');
            locX = this.imagediv.left + this.pagectrl.getBadgeLocations().palpitation[i-1].front.x*this.wscale ;
            locY = this.imagediv.top + this.pagectrl.getBadgeLocations().palpitation[i-1].front.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;
        }
        for(let i = 1; i <= this.pagectrl.getBadgeLocations().scar.length; i++){
            this.badge = document.getElementById('S' + i + 's');
            locX = this.imagediv.left + this.pagectrl.getBadgeLocations().scar[i-1].side.x*this.wscale ;
            locY = this.imagediv.top + this.pagectrl.getBadgeLocations().scar[i-1].side.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;
            this.badge = document.getElementById('S' + i + 'f');
            locX = this.imagediv.left + this.pagectrl.getBadgeLocations().scar[i-1].front.x*this.wscale ;
            locY = this.imagediv.top + this.pagectrl.getBadgeLocations().scar[i-1].front.y*this.hscale ;
            this.badge.style = `position: fixed; top:${locY}; left:${locX}`;
        }

        let element: any;
        if( (element = document.getElementById('firstlocation')) !== null) {
            locX = this.imagediv.left + this.pagectrl.firstclicklocation.x * this.wscale;
            locY = this.imagediv.top + this.pagectrl.firstclicklocation.y * this.hscale;
            element.style = `position: fixed; top:${locY}; left:${locX}`;
        }
    }
}

