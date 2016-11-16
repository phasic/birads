import { Component }      from '@angular/core';
import { DataService } from "../../services/data.service";
import {TranslateService} from "ng2-translate";
/**
 * This component contains the BIRADS and ACR scores.
 *
 *
 *      selector: 'classification-component'
 *      templateUrl: '../../templates/table/classification.template.html'
 */
@Component({
    selector: 'classification-component',
    templateUrl: '../../templates/table/classification.template.html'
})
export class ClassificationComponent{
    /**
     * * The constructor will initialize the following
     *
     * @param dataservice   This service stores all the data
     * @param translate     Translate service
     */
    constructor(private dataservice: DataService, private translate: TranslateService){
    }

    /**
     * All the possible birads scores.
     * @type {number[]}
     */
    private biradsscore: Array<number> = [0, 1, 2, 3, 4, 5, 6];
    /**
     * All the possible acr scores.
     * @type {(string|string|string|string)[]}
     */
    private acrscore: Array<string> = ['I', 'II', 'III', 'IV'];

    /**
     * The different breast compositions, taken from the translate service.
     * These values are placeholder values that correspond with data from the i18n json files.
     * @type {(string|string|string|string)[]}
     */
    private composition: Array<string> = [
        "ONE",
        "TWO",
        "THREE",
        "FOUR"
    ];
}



