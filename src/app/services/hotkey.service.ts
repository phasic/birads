import {Injectable} from "@angular/core";
import {Http, Response} from '@angular/http'

@Injectable()
export class HotkeyService {
    get hotkeys(): {sidebar: {one: number; two: number; three: number; four: number; five: number; six: number; seven: number; eight: number; nine: number}; modal: {one: number; two: number; three: number; four: number; five: number; six: number; seven: number; eight: number; nine: number; toggle: number}} {
        return this._hotkeys;
    }
    constructor(private http: Http) {
        http.get('/assets/hotkeys.json')
            .map((res: Response) => res.json())
            .subscribe(res => {
                this._hotkeys = {
                    sidebar: {
                        one : res["SIDEBAR"]["ONE"].charCodeAt(0),
                        two : res["SIDEBAR"]["TWO"].charCodeAt(0),
                        three : res["SIDEBAR"]["THREE"].charCodeAt(0),
                        four : res["SIDEBAR"]["FOUR"].charCodeAt(0),
                        five : res["SIDEBAR"]["FIVE"].charCodeAt(0),
                        six : res["SIDEBAR"]["SIX"].charCodeAt(0),
                        seven : res["SIDEBAR"]["SEVEN"].charCodeAt(0),
                        eight : res["SIDEBAR"]["EIGHT"].charCodeAt(0),
                        nine : res["SIDEBAR"]["NINE"].charCodeAt(0)
                    },
                    modal: {
                        one : res["MODAL"]["ONE"].charCodeAt(0),
                        two : res["MODAL"]["TWO"].charCodeAt(0),
                        three : res["MODAL"]["THREE"].charCodeAt(0),
                        four : res["MODAL"]["FOUR"].charCodeAt(0),
                        five : res["MODAL"]["FIVE"].charCodeAt(0),
                        six : res["MODAL"]["SIX"].charCodeAt(0),
                        seven : res["MODAL"]["SEVEN"].charCodeAt(0),
                        eight : res["MODAL"]["EIGHT"].charCodeAt(0),
                        nine : res["MODAL"]["NINE"].charCodeAt(0),
                        toggle : res["MODAL"]["TOGGLE"].charCodeAt(0)
                    }
                };
            } );
    }
    private _hotkeys: {
        sidebar: {
            one: number,
            two: number,
            three: number,
            four: number,
            five: number,
            six: number,
            seven: number,
            eight: number,
            nine: number
        },
        modal: {
            one: number,
            two: number,
            three: number,
            four: number,
            five: number,
            six: number,
            seven: number,
            eight: number,
            nine: number,
            toggle: number
        }
    };



}

