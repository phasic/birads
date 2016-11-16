import {ElementRef, HostListener, Directive, ViewChild} from '@angular/core';
import {DataService} from "../services/data.service";
import {element} from "protractor";
import {PageController} from "../services/page.controller";

/**
 * This directives habdles the screen resize and window scroll.
 *
 * When we resize the screen, the imagemap needs to be rescaled too, this gets called here.
 *
 * When we scroll in the page, the badges on the images need to scroll with them. They also need to move when the image changes size.
 *
 * Those resize functions get called here
 *
 *      selector: '[resize]'
 */
@Directive({
    selector: '[resize]'
})
export class ScreenResize {
    /**
     * The constructor will initialize the following
     * @param dataservice   This service stores all the data
     * @param pagectrl      Page controller manages functions to assure functionality (tracking click, adding badges, ... )
     * @param elementRef
     */
    constructor(private dataservice: DataService, private pagectrl: PageController, private elementRef: ElementRef){
    }
    @HostListener('window:resize',['$event'])
    /**
     * When the screen is resized, onResized gets called, and handles the resizing and repositioning of the badges.
     * @param event holds the resize event
     */
    onResize(event: Event): void{
        this.pagectrl.resizeBadges();                       //handles the repositioning and resizing of the badges
    }
    @HostListener('window:scroll', ['$event'])
    /**
     * When we scroll in the screen, onScroll gets called, and handles the resizing and repositioning of the badges.
     * @param event
     */
    onScroll(event: Event): void{
        this.pagectrl.resizeBadges();                       //handles the repositioning and resizing of the badges
    }

}

