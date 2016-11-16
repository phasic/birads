import { Component }      from '@angular/core';
import {TranslateService} from "ng2-translate";
/**
 * This component contains a legend that explains the different BIRADS scores.
 *
 *          selector: 'legend-component'
 *          templateUrl: '../../templates/table/legend.template.html'
 */
@Component({
    selector: 'legend-component',
    templateUrl: '../../templates/table/legend.template.html'
})
export class LegendComponent{
    /**
     * The constructor will initialize the following
     * @param translate Translate service
     */
    constructor(private translate: TranslateService){
    }

    /**
     * Array that stores all the different categories, the values are taken from the translate service.
     * These values are placeholder values that correspond with data from the i18n json files.
     * @type {(string|string|string|string|string|string|string)[]}
     */
    private categories: Array<string> = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX'];

}
