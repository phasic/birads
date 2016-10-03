import {Component}      from '@angular/core';
import {PageController} from "../../services/page.controller";
@Component({
    selector: 'map-component',
    templateUrl: '../../templates/map/map.template.html'
})
export class MapComponent {
    constructor(private pagectrl: PageController) {
        this.pagectrl = pagectrl;
    }
    clickHandler(event): void {
        if(!this.pagectrl.isMenuShown()) {
            this.pagectrl.setMouseLocation(event.clientX, event.clientY);
        }
        switch (this.pagectrl.getMethod()) { //is set by the sidebar
            case 'mass':
                this.pagectrl.setShowmenu('mass');
                break;
            case 'distortion':
                this.pagectrl.setShowmenu('distortion');
                break;
            case 'asymmetries':
                this.pagectrl.setShowmenu('asymmetries');
                break;
            case 'calcifications':
                this.pagectrl.setShowmenu('calcifications');
                break;
            default:
        }
    }
    test(event){
        console.log("HUEHEUHEUHEUHEU");
        event.preventDefault();
        event.stopPropagation();
    }
}


