import {ElementRef, HostListener, Directive} from '@angular/core';
/**
 * Directive used to rescale the imagemaps when the page is rescaled. So the imagemaps keep corresponding the underlying sector map image.
 *
 *      selector: '[imagemap]'
 *
 */
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
     * The constructor will define the element, the image, when initialized.
     *
     * After 100ms we will get the natural, unscaled, width of the image
     * @param elementRef
     */
    constructor(private elementRef: ElementRef){
        setTimeout(() => {
            this.imgwidth = elementRef.nativeElement.naturalWidth;      //get the width of the image
            this.imgheight = elementRef.nativeElement.naturalHeight;    //get the height of the image
            this.resizeImageMap();                                      //call resizeImageMap
        }, 100);                                                        //wait 100ms before execute previous statements
    }
    /**
     * When we resize the page, this will get called.
     *
     * When we resize, we need to rescale the imagemap, because this isn't inherently responsive unlike the underlying image.
     * @param event The resize event
     */
    @HostListener('window:resize',['$event'])
    onResize(event: Event): void{
        this.resizeImageMap();                                          //resize the image map
    }

    /**
     * When we rescale the page, we need to scale the imagemap with the same proportions as the underlying image.
     *
     * First we get the current width and height of the image, calculate a scale (current width / original width)
     *
     * Once we got a width and height scale, we get the area elements of the imagemap. Get the coords and split them.
     *
     *
     * The even coordinates we'll multiply by the width scale, the odd coordinates by the height scale.
     *
     * Then assign those coordinates again to the corresponding area.
     *
     * At the end set the imgwidth en imgheight to the current width and height. (calculating the scale happens iteratively every time we rescale the page,
     * it's not calculated from the native size, but from the current size en previous size)
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

