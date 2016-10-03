import {ElementRef, HostListener, Directive, ViewChild} from '@angular/core';

@Directive({
    selector: '[resize]'
})
export class ScreenResize {
    private screenX: number;
    private screenY: number;
    private w: number;
    private h: number;
    private wscale: number;
    private hscale: number;
    constructor( public elementRef: ElementRef){
        setTimeout(() => {
            this.screenX = window.innerWidth;
            this.screenY = window.innerHeight;
            console.log(`screen size: ${this.screenX}, ${this.screenY}`);
        }, 100);

    }
    @HostListener('window:resize',['$event'])
    onResize(event: Event): void{
        //TODO RESIZE, DO THIS LATER
        // this.w = window.innerWidth;
        // this.h = window.innerHeight;
        //
        // this.wscale = this.w/this.screenX;
        // this.hscale = this.h/this.screenY;
        // console.log(`scale: ${this.wscale}, ${this.hscale}`);
        //
        // // console.log(`scale: ${this.wscale}, ${this.hscale}`);
        // this.badge();   //recalculate the locations of the badges
        // this.screenX = window.innerWidth;
        // this.screenY = window.innerHeight;
    }

    badge(){
        let list: any = document.getElementsByClassName('badge');
        list = this.elementRef.nativeElement.parentNode.getElementsByClassName('badge');
        let x, y, xn, yn: number;

        for(let element of list){
            x = element.parentNode.style.left;
            y = element.parentNode.style.top;
            // element.parentNode.style.left = x * this.wscale;

            console.log(`old: ${x}, ${y}`);

            xn = x * this.wscale;
            yn = y * this.hscale;
            console.log(`new: ${xn}, ${yn}`);


            // element.parentNode.style.top = y * this.hscale;
            // element.parentNode.style.left = x * this.wscale;

            // console.log()

        }
        // console.log(list[0].parentNode.style.left);
        // console.log("AAASADAD");
    }
    // rescale(){
    //     let w: number = this.elementRef.nativeElement.width;
    //     let h: number = this.elementRef.nativeElement.height;
    //     let wscale: number =  w / this.imgwidth;
    //     let hscale: number = h / this.imgheight;
    //     let elements: any = this.elementRef.nativeElement.parentNode.getElementsByTagName("area");
    //     for(let i = 0; i < elements.length; i++){
    //         let coords: Array<number> = elements[i].coords.split(',');
    //         for(let j = 0; j < coords.length; j++){
    //             if (j % 2 === 0){
    //                 coords[j] = coords[j] * wscale;
    //             } else {
    //                 coords[j] = coords[j] * hscale;
    //             }
    //         }
    //         this.elementRef.nativeElement.parentNode.getElementsByTagName("area")[i].coords = coords;
    //     }
    //     this.imgwidth = w;
    //     this.imgheight = h;
    // }

}

