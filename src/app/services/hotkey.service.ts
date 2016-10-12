import {Injectable} from "@angular/core";
import {Http, Response} from '@angular/http'

@Injectable()
export class HotkeyService {



    constructor(private http: Http) {
        //when the constructor is called, get hotkeys from a json file

        // this.result = {[]};
        http.get('/assets/hotkeys.json')
            .map((res: Response) => res.json())
            .subscribe(res => {
                this.result = res;
                // this.hotkeys = this.result;
                // console.log(this.hotkeys.sidebar);

                this._hotkeys = {
                    sidebar: {
                        one : this.result["SIDEBAR"]["ONE"].charCodeAt(0),
                        two : this.result["SIDEBAR"]["TWO"].charCodeAt(0),
                        three : this.result["SIDEBAR"]["THREE"].charCodeAt(0),
                        four : this.result["SIDEBAR"]["FOUR"].charCodeAt(0)
                    },
                    modal: {
                        one : this.result["MODAL"]["ONE"].charCodeAt(0),
                        two : this.result["MODAL"]["TWO"].charCodeAt(0),
                        three : this.result["MODAL"]["THREE"].charCodeAt(0),
                        four : this.result["MODAL"]["FOUR"].charCodeAt(0),
                        five : this.result["MODAL"]["FIVE"].charCodeAt(0),
                        six : this.result["MODAL"]["SIX"].charCodeAt(0),
                        seven : this.result["MODAL"]["SEVEN"].charCodeAt(0),
                        eight : this.result["MODAL"]["EIGHT"].charCodeAt(0),
                        nine : this.result["MODAL"]["NINE"].charCodeAt(0),
                        toggle : this.result["MODAL"]["TOGGLE"].charCodeAt(0)
                    }
                };
                console.log(this._hotkeys);
            } );
        // setTimeout(() => {
        //     let x = this.result["SIDEBAR"]["ONE"].charCodeAt(0);
        //     console.log(x);
        // }, 10);



//TODO WORKING HERE ON THE HOTKEYS



    }

    test(): void{
        console.log(`IN HOTKEYS`);
        console.log(this._hotkeys);
        // console.log(this.result);
        let x = this.result["SIDEBAR"]["ONE"].charCodeAt(0);
        console.log(x);
    }
    private result: any;



    private _hotkeys: {
        sidebar: {
            one: number,
            two: number,
            three: number,
            four: number
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
    get hotkeys(): {sidebar: {one: number; two: number; three: number; four: number}; modal: {one: number; two: number; three: number; four: number; five: number; six: number; seven: number; eight: number; nine: number; toggle: number}} {
        return this._hotkeys;
    }


}

