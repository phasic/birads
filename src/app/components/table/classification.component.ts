import { Component }      from '@angular/core';
import { DataService } from "../../services/data.service";
@Component({
    selector: 'classification-component',
    templateUrl: '../../templates/table/classification.template.html'
})
export class ClassificationComponent{
    constructor(private dataservice: DataService){
    }
    private biradsscore: Array<number> = [0, 1, 2, 3, 4, 5, 6];
    private acrscore: Array<string> = ['I', 'II', 'III', 'IV'];
    private composition: Array<string> = [
        'Almost entirely fatty',
        'Scattered areas of fibroglandular density',
        'Heterogeneously dense',
        'Extremely dense'
    ]
}



