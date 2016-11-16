import {Injectable} from "@angular/core";
import {Http, Response} from '@angular/http'
/**
 * The HotkeyService reads the hotkeys.json file, and parses it into an array that can be used in the code to assign keybindings to functionality.
 *
 * When you want to change hotkeys, change the file and reload the page.
 *
 * Structure of the hotkeys array:
 *
 *        private _hotkeys: {
 *                      sidebar: {
 *                          one: number,
 *                          two: number,
 *                          three: number,
 *                          four: number,
 *                          five: number,
 *                          six: number,
 *                          seven: number,
 *                          eight: number,
 *                          nine: number
 *                      },
 *                      modal: {
 *                          one: number,
 *                          two: number,
 *                          three: number,
 *                          four: number,
 *                          five: number,
 *                          six: number,
 *                          seven: number,
 *                          eight: number,
 *                          nine: number,
 *                          toggle: number
 *                      }
 *       };
 *
 *
 * The hotkeys array will contains the keycodes of the hotkeys.
 *
 */
@Injectable()
export class HotkeyService {
    /**
     * Getter that returns the hotkey array.
     * @returns {{sidebar: {one: number, two: number, three: number, four: number, five: number, six: number, seven: number, eight: number, nine: number}, modal: {one: number, two: number, three: number, four: number, five: number, six: number, seven: number, eight: number, nine: number, toggle: number}}}
     */
    get hotkeys(): {sidebar: {one: number; two: number; three: number; four: number; five: number; six: number; seven: number; eight: number; nine: number}; modal: {one: number; two: number; three: number; four: number; five: number; six: number; seven: number; eight: number; nine: number; toggle: number}} {
        return this._hotkeys;
    }

    /**
     * http service gets the hotkeys.json file and maps it to a response. That response will get assigned to the hotkeys array.
     * The hotkeys array contains the keycodes of the hotkeys.
     * @param http used to read the json file
     */
    constructor(private http: Http) {
        http.get('assets/hotkeys.json')                //send a get request to the hotkeys.json file
            .map((res: Response) => res.json())         //get the response, parse it to jason
            .subscribe(res => {                         //makes an observable on res
                this._hotkeys = {                       //bind the hotkeys array
                    sidebar: {                          //sidebar hotkeys
                        one : res["SIDEBAR"]["ONE"].charCodeAt(0),  //1 through 9
                        two : res["SIDEBAR"]["TWO"].charCodeAt(0),  //charcodeat(0) gives the first letter of the returned string and takes the keycode of it
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

    /**
     * Hotkeys array structure.
     */
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

