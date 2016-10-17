import { Component }      from '@angular/core';
import {TranslateService} from "ng2-translate";

@Component({
    selector: 'legend-component',
    templateUrl: '../../templates/table/legend.template.html'
})
export class LegendComponent{
    /**
     *
     * @param translate
     */
    constructor(private translate: TranslateService){
    }

    /**
     * array that stores all the different categories, the values are taken from the translate service
     * @type {(string|string|string|string|string|string|string)[]}
     */
    private categories: Array<string> = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX'];

}
