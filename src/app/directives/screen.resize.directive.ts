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
    private wscale: number;
    private hscale: number;
    constructor(private dataservice: DataService, private pagectrl: PageController, private elementRef: ElementRef){
           }
    @HostListener('window:resize',['$event'])
    onResize(event: Event): void{
        this.pagectrl.resizeBadges();
    }
    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void{
        this.pagectrl.resizeBadges();
    }
}

