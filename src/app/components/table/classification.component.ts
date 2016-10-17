import { Component }      from '@angular/core';
import { DataService } from "../../services/data.service";
import {TranslateService} from "ng2-translate";
@Component({
    selector: 'classification-component',
    templateUrl: '../../templates/table/classification.template.html'
})
export class ClassificationComponent{
    /**
     *
     * @param dataservice
     * @param translate
     */
    constructor(private dataservice: DataService, private translate: TranslateService){
    }

    /**
     * all the possible birads scores
     * @type {number[]}
     */
    private biradsscore: Array<number> = [0, 1, 2, 3, 4, 5, 6];
    /**
     * all the possible acr scores
     * @type {(string|string|string|string)[]}
     */
    private acrscore: Array<string> = ['I', 'II', 'III', 'IV'];

    /**
     * the different breast compositions, taken from the translate service
     * @type {(string|string|string|string)[]}
     */
    private composition: Array<string> = [
        "ONE",
        "TWO",
        "THREE",
        "FOUR"
    ];
}



