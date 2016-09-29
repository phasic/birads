import { Directive, ElementRef, Renderer, OnDestroy, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
    selector: '[draggable]',
    host: {
        '(dragstart)': 'onDragStart($event)',
        '(dragend)': 'onDragEnd($event)',
        '(drag)': 'onDrag($event)'
    }
})
export class Draggable implements OnDestroy, OnInit {
    private dx: number = 0;
    private dy: number = 0;
    // private mustBePosition: Array<string> = ['absolute', 'fixed', 'relative'];
    constructor(
        private el: ElementRef, private renderer: Renderer
    ) {
        // try {
        //     if (this.mustBePosition.indexOf(this.el.nativeElement.style.position) === -1) {
        //         console.warn(this.el.nativeElement, 'Must be having position attribute set to ' + this.mustBePosition.join('|'));
        //     }
        // } catch (ex) {
        //     console.error(ex);
        // }
    }
    public ngOnInit(): void {
        this.renderer.setElementAttribute(this.el.nativeElement, 'draggable', 'true');
    }
    onDragStart(event: MouseEvent) {
        this.dx = event.x - this.el.nativeElement.offsetLeft;
        this.dy = event.y - this.el.nativeElement.offsetTop;
    }
    onDrag(event: MouseEvent) {
        this.doTranslation(event.x, event.y);
    }
    onDragEnd(event: MouseEvent) {
        this.dx = 0;
        this.dy = 0;
    }
    doTranslation(x: number, y: number) {
        if (!x || !y) return;
        this.renderer.setElementStyle(this.el.nativeElement, 'top', (y - this.dy) + 'px');
        this.renderer.setElementStyle(this.el.nativeElement, 'left', (x - this.dx) + 'px');
    }
    public ngOnDestroy(): void {
        this.renderer.setElementAttribute(this.el.nativeElement, 'draggable', 'false');
    }

}

const DRAGGABLE_DIRECTIVES: any[] = [Draggable];

@NgModule({
    imports: [CommonModule],
    exports: DRAGGABLE_DIRECTIVES,
    declarations: DRAGGABLE_DIRECTIVES
})
export class DraggableModule { }