import {Injectable} from "@angular/core";

@Injectable()
export class DataService {
    /**
     * get the possible methods
     * @returns {Array<string>}
     */
    get methods(): Array<string> {
        return this._methods;
    }
    constructor() {
        this.acr = {        //initialize the ACR scores on zero
            right : 0,
            left: 0
        };
        this.birads = {     //initialize the birads scores on zero
            right: 0,
            left: 0
        };
        this.mass = []; // initialize all the data with empty arrays
        this.distortion = [];
        this.asymmetry = [];
        this.calcification = [];
        this.other = [];
        // this._methods = this.mainmethods;
    }

    /**
     * holds the acr score
     */
    private acr: {
        right: number,
        left: number
    };
    /**
     * holds the birads score
     */
    private birads: {
        right: number,
        left: number
    };
    /**
     * holds the breast composition
     */
    private composition: string;


    /**
     * methods contains all the possible methods. mainmethods and othermethods combined
     */
    /**
     * all the methods wo are not in a submenu in the sidebar
     * @type {(string|string|string|string)[]}
     */
     private _methods: Array<string> = [
        'mass',
        'distortion',
        'asymmetry',
        'calcification',
        'other'
    ];
    /**
     * gets the data of the main method array
     * @returns {Array<string>}
     */
    getMainMethods(): Array<string>{
        return this._methods;
    }

    /**
     * mass structure
     */
    private mass: {
        size: number;
        distance: number,
        shape: string;
        margin: string;
        density: string;
    }[];
    /**
     * distortion structure
     */
    private distortion: {
        distance: number;
        distortion: string;
    }[];
    /**
     * asymmetry structure
     */
    private asymmetry: {
        distance: number;
        asymmetry: string;
    }[];
    /**
     * calcification structure
     */
    private calcification: {
        distance: number;
        morphology: string;
        distribution: string;
    }[];
    /**
     * other structure
     */
    private other: {
        distance: number,
        name: string
    }[];
    /**
     * returns the request data structure. mass, distortion, ...
     * @param method    string that contains the wanted data structure
     * @returns {any}   array that contains the data structure
     */
    getData(method: string): any{
        for(let m of this.methods){     //iterate over all the methods
            if(method == m){            //we found the method we passes to this function
                return this[method];    //return the data of that method
            }
        }
    }

    /**
     * set the data of a certain method, at a certain index
     * @param method    mass, distortion,...
     * @param data      the data to bind
     * @param index     the index of the array where to bind it
     */
    setData(method: string, data: any, index: number): void{
        for(let m of this.methods){         //iterate over all the methods
            if(method == m){                //we found our method
                this[method][index] = data; //bind at the index of the method array
            }
        }
    }

    /**
     * add a mass entry to the mass array
     * @param size
     * @param distance
     * @param shape
     * @param margin
     * @param density
     */
    addMass(size: number, distance: number , shape: string, margin: string, density: string): void {
        this.mass.push({
                size: size,
                distance: distance,
                shape: shape,
                density: density,
                margin: margin,
            }
        );
    }

    /**
     * ass a distortion entry to the distortion array
     * @param distance
     * @param distortion
     */
    addDistortions(distance: number, distortion: string): void {
        this.distortion.push({
                distance: distance,
                distortion: distortion
            }
        );
    }

    /**
     * add an asymmtry entry to the asymmetry array
     * @param distance
     * @param asymmetry
     */
    addAsymmetries(distance: number, asymmetry: string): void {
        this.asymmetry.push({
                distance: distance,
                asymmetry: asymmetry
            }
        );
    }

    /**
     * add a calcification entry to the calcification array
     * @param distance
     * @param morphology
     * @param distribution
     */
    addCalcifications(distance: number, morphology: string, distribution: string): void {
        this.calcification.push({
            distance: distance,
            morphology: morphology,
            distribution: distribution
        });
    }

    addOther(distance: number, name: string){
        this.other.push({
            distance: distance,
            name: name
        });
    }
}