import {ElementRef, HostListener, Directive} from '@angular/core';

@Directive({
    selector: '[imagemap]'
})
export class ImageMapResize {
    /**
     * width of the image which corresponds with the image map
     */
    private imgwidth: number;
    /**
     * height of the image which corresponds with the image map
     */
    private imgheight: number;

    /**
     *
     * @param elementRef the image with an image map
     */
    constructor(private elementRef: ElementRef){
        setTimeout(() => {
            this.imgwidth = elementRef.nativeElement.naturalWidth;      //get the width of the image
            this.imgheight = elementRef.nativeElement.naturalHeight;    //get the height of the image
            this.resizeImageMap();                                      //call resizeImageMap
        }, 100);                                                        //wait 100ms before execute previous statements
    }
    @HostListener('window:resize',['$event'])
    /**
     * when the screen is resized call this fuction
     * @param event     resize event
     */
    onResize(event: Event): void{
        this.resizeImageMap();                                          //resize the image map
    }

    /**
     * this function is used to keep the size of the image map the same as the size of the corresponding image
     */
    resizeImageMap(): void{
        let w: number = this.elementRef.nativeElement.width;            //get the current width of the image
        let h: number = this.elementRef.nativeElement.height;           //get the current height of th image
        let wscale: number =  w / this.imgwidth;                        //calculate the width scale
        let hscale: number = h / this.imgheight;                        //calculate the height scale
        let elements: any = this.elementRef.nativeElement.parentNode.getElementsByTagName("area");  //get all the elements with the name area that are children of the image div
        for(let i = 0; i < elements.length; i++){                       //loop over all those areas
            let coords: Array<number> = elements[i].coords.split(',');  //split the coordinates
            for(let j = 0; j < coords.length; j++){                     //run over all the coordinates of every area
                if (j % 2 === 0){                                       //if its an even nuber, were dealing with the width
                    coords[j] = coords[j] * wscale;                     //scale it with the width
                } else {                                                //else its an odd number, and were dealing with the height
                    coords[j] = coords[j] * hscale;                     //scale it with the height
                }
            }
            this.elementRef.nativeElement.parentNode.getElementsByTagName("area")[i].coords = coords;   //bind the new calculated coorinates to the area
        }
        this.imgwidth = w;                                              //set the new width
        this.imgheight = h;                                             //set the new height
    }
}

