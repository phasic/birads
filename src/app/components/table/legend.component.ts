import { Component }      from '@angular/core';
import {TranslateService} from "ng2-translate";

@Component({
    selector: 'legend-component',
    templateUrl: '../../templates/table/legend.template.html'
})
export class LegendComponent{
    constructor(private translate: TranslateService){
    }
    private categories: Array<string> = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX'];

}
