import {ElementRef, HostListener, Directive, ViewChild} from '@angular/core';
import {DataService} from "../services/data.service";
import {element} from "protractor";
import {PageController} from "../services/page.controller";

@Directive({
    selector: '[resize]'
})
export class ScreenResize {
    /**
     *
     * @param dataservice
     * @param pagectrl
     * @param elementRef
     */
    constructor(private dataservice: DataService, private pagectrl: PageController, private elementRef: ElementRef){
    }
    @HostListener('window:resize',['$event'])
    /**
     * When the screen is resized, onResized gets called, and handles the resizing and repositioning of the badges
     * @param event holds the resize event
     */
    onResize(event: Event): void{
        this.pagectrl.resizeBadges();                       //handles the repositioning and resizing of the badges
    }
    @HostListener('window:scroll', ['$event'])
    /**
     * When we scroll in the screen, onScroll gets called, and handles the resizing and repositioning of the badges
     * @param event
     */
    onScroll(event: Event): void{
        this.pagectrl.resizeBadges();                       //handles the repositioning and resizing of the badges
        console.log(`scrolled`);
    }

}

