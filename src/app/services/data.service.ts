import {Injectable} from "@angular/core";

/**
 * This service stores all the data entered. All the different method in different tables
 *
 * The DataService is called when we need to find, add, set or get data.
 */
@Injectable()
export class DataService {
    /**
     * Set the reason value of the reason field within the flemish form
     * @param value
     */
    set screeningreason(value: string) {
        this._screeningreason = value;
    }

    /**
     * Get the reason value of the reason field within the flemish form
     * @returns {string}
     */
    get screeningreason(): string {
        return this._screeningreason;
    }

    /**
     * Get all the selection of the flemish form
     * @returns {{R: boolean, L: boolean}[]}
     */
    get screening(): {R: boolean; L: boolean}[] {
        return this._screening;
    }
    /**
     * Get the possible methods.
     * @returns {Array<string>}
     */
    get methods(): Array<string> {
        return this._methods;
    }

    /**
     * Set the ACR and BIRADS score to 0.
     *
     * Initializes empty arrays for every method;
     */
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

        this._screening = [];
        for(let i = 0; i < 19; i++){
            this._screening.push({
                R: false,
                L: false
            });
        }

    }

    /**
     * Holds the acr score.
     */
    private acr: {
        right: number,
        left: number
    };
    /**
     * Holds the birads score.
     */
    private birads: {
        right: number,
        left: number
    };
    /**
     * Holds the breast composition.
     */
    private composition: string;
    /**
     * All the possbile methods.
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
     * Gets the data of the method array.
     * @returns {Array<string>}
     */
    getMainMethods(): Array<string>{
        return this._methods;
    }

    /**
     * Mass structure.
     */
    private mass: {
        size: number;
        distance: number,
        shape: string;
        margin: string;
        density: string;
    }[];
    /**
     * Distortion structure.
     */
    private distortion: {
        distance: number;
        distortion: string;
    }[];
    /**
     * Asymmetry structure.
     */
    private asymmetry: {
        distance: number;
        asymmetry: string;
    }[];
    /**
     * Calcification structure.
     */
    private calcification: {
        distance: number;
        morphology: string;
        distribution: string;
    }[];
    /**
     * Other structure.
     */
    private other: {
        distance: number,
        name: string
    }[];

    /**
     * This array contains all the selections of the flemish form
     */
    private _screening: {
        R: boolean,
        L: boolean
    }[];

    /**
     * This string contains the reason string of the flemish form
     */
    private _screeningreason: string;
    /**
     * Returns the request data structure. mass, distortion, ...
     * @param method    String that contains the wanted data structure
     * @returns {any}   Array that contains the data structure
     */
    getData(method: string): any{
        for(let m of this.methods){     //iterate over all the methods
            if(method == m){            //we found the method we passes to this function
                return this[method];    //return the data of that method
            }
        }
    }

    /**
     * Set the data of a certain method, at a certain index.
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
     * Add a mass entry to the mass array.
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
     * Add a distortion entry to the distortion array.
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
     * Add an asymmetry entry to the asymmetry array.
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
     * Add a calcification entry to the calcification array.
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

    /**
     * Add an 'other' entry to the other array.
     * @param distance
     * @param name
     */
    addOther(distance: number, name: string){
        this.other.push({
            distance: distance,
            name: name
        });
    }
}