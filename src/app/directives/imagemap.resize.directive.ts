import {ElementRef, HostListener, Directive} from '@angular/core';

@Directive({
    selector: '[imagemap]'
})
export class ImageMapResize {
    private imgwidth: number;
    private imgheight: number;
    constructor(private elementRef: ElementRef){
        setTimeout(() => {
            this.imgwidth = elementRef.nativeElement.naturalWidth;
            this.imgheight = elementRef.nativeElement.naturalHeight;
            this.resizeImageMap();
        }, 100);
    }
    @HostListener('window:resize',['$event'])
    onResize(event: Event): void{
        this.resizeImageMap();
    }

    resizeImageMap(): void{
        let w: number = this.elementRef.nativeElement.width;
        let h: number = this.elementRef.nativeElement.height;
        let wscale: number =  w / this.imgwidth;
        let hscale: number = h / this.imgheight;
        let elements: any = this.elementRef.nativeElement.parentNode.getElementsByTagName("area");
        for(let i = 0; i < elements.length; i++){
            let coords: Array<number> = elements[i].coords.split(',');
            for(let j = 0; j < coords.length; j++){
                if (j % 2 === 0){
                    coords[j] = coords[j] * wscale;
                } else {
                    coords[j] = coords[j] * hscale;
                }
            }
            this.elementRef.nativeElement.parentNode.getElementsByTagName("area")[i].coords = coords;
        }
        this.imgwidth = w;
        this.imgheight = h;
    }
}

