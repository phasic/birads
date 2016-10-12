import {Injectable} from "@angular/core";

@Injectable()
export class DataService {


    constructor() {
        this.acr = {
            right : 0,
            left: 0
        };
        this.birads = {
            right: 0,
            left: 0
        };
        this.mass = []; // make an emty array so that the get length doesn't throw an error
        this.distortions = [];
        this.asymmetries = [];
        this.calcifications = [];
    }
    /* Classifications Variables*/
    private acr: {
        right: number,
        left: number
    };
    private birads: {
        right: number,
        left: number
    };
    private composition: string;

    setAcr(left: number | string, right: number) : void{
        if( typeof left === 'string'){
            if(left == 'left'){
                this.acr.left = right;
            }
            else if(left == 'right'){
                this.acr.right = right;
            }
        }
        else if(typeof  left === 'number'){
            this.acr = {
                left: left,
                right: right
            };
        }
    }
    getAcr(side?: string): any{
        if(side == null){
            return this.acr;
        }
        else if(side == 'left'){
            return this.acr.left;
        }
        else if(side == 'right'){
            return this.acr.right;
        }
    }
    setBirads(left: number | string, right: number) : void{
        if( typeof left === 'string'){
            if(left == 'left'){
                this.birads.left = right;
            }
            else if(left == 'right'){
                this.birads.right = right;
            }
        }
        else if(typeof  left === 'number'){
            this.birads = {
                left: left,
                right: right
            };
        }
    }
    getBirads(side?: string): any{
        if(side == null){
            return this.birads;
        }
        else if(side == 'left'){
            return this.birads.left;
        }
        else if(side == 'right'){
            return this.birads.right;
        }
    }
    setComposition(composition: string): void {
        this.composition = composition;
    }
    getComposition(): string {
        return this.composition;
    }


    /* Sidebar Variables */
    private methods: Array<string> = [
        'mass',
        'distortion',
        'asymmetry',
        'calcification'
    ];

    getMethods(): Array<string>{
        return this.methods;
    }

    /*Findings (map) Variables */
    private mass: {
        size: number;
        distance: number,
        shape: string;
        margin: string;
        density: string;
    }[];
    private distortions: {
        distance: number;
        distortion: string;
    }[];
    // private asymmetries: Array<string>;
    private asymmetries: {
        distance: number;
        asymmetry: string;
    }[];
    private calcifications: {
        distance: number;
        morphology: string;
        distribution: string;
    }[];
    setMass(mass: any, index: number): void{
        this.mass[index] = mass;
    }
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
    getMass(index?: number): any {
        if (index == null) {
            return this.mass;
        }
        else
            return this.mass[index];
    }
    setDistortions(distortion: any, index: number): void {
        this.distortions[index] = distortion;
    }
    addDistortions(distance: number, distortion: string): void {
        this.distortions.push({
                distance: distance,
                distortion: distortion
            }
        );
    }
    getDistortions(index?: number): any {
        if (index == null) {
            return this.distortions;
        }
        else
            return this.distortions[index];
    }
    setAsymmetries(asymmetry: any, index: number): void {
        this.asymmetries[index] = asymmetry;
    }
    addAsymmetries(distance: number, asymmetry: string): void {
        this.asymmetries.push({
                distance: distance,
                asymmetry: asymmetry
            }
        );
    }
    getAsymmetries(index?: number): any {
        if (index == null) {
            return this.asymmetries;
        }
        else
            return this.asymmetries[index];
    }
    setCalcifications(calcification: any, index: number): void {
        this.calcifications[index] = calcification;
    }
    addCalcifications(distance: number, morphology: string, distribution: string): void {
        this.calcifications.push({
            distance: distance,
            morphology: morphology,
            distribution: distribution
        });

    }
    getCalcifications(index?: number): any {
        if (index == null) {
            return this.calcifications;
        }
        else
            return this.calcifications[index];
    }
}