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
        this.distortion = [];
        this.asymmetry = [];
        this.calcification = [];
        this.palpitation = [];
        this.scar = [];
        this.methods = this.mainmethods.concat(this.othermethods);
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
    private methods: Array<string>;
     private mainmethods: Array<string> = [
        'mass',
        'distortion',
        'asymmetry',
        'calcification'
    ];
    private othermethods: Array<string> = [
        'palpitation',
        'scar'
    ];

    getMethods(): Array<string>{
        return this.methods;
    }
    getMainMethods(): Array<string>{
        return this.mainmethods;
    }
    getOtherMethods(): Array<string>{
        return this.othermethods;
    }

    /*Findings (map) Variables */
    private mass: {
        size: number;
        distance: number,
        shape: string;
        margin: string;
        density: string;
    }[];
    private distortion: {
        distance: number;
        distortion: string;
    }[];
    // private asymmetries: Array<string>;
    private asymmetry: {
        distance: number;
        asymmetry: string;
    }[];
    private calcification: {
        distance: number;
        morphology: string;
        distribution: string;
    }[];
    private palpitation: {
        distance: number
    }[];
    private scar: {
        distance: number
    }[];
    getData(method: string): any{
        for(let m of this.getMethods()){
            if(method == m){
                return this[method];
            }
        }

    }
    setData(method: string, data: any, index: number): void{
        for(let m of this.getMethods()){
            if(method == m){
                this[method][index] = data;
            }
        }
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
    addDistortions(distance: number, distortion: string): void {
        this.distortion.push({
                distance: distance,
                distortion: distortion
            }
        );
    }
    addAsymmetries(distance: number, asymmetry: string): void {
        this.asymmetry.push({
                distance: distance,
                asymmetry: asymmetry
            }
        );
    }
    addCalcifications(distance: number, morphology: string, distribution: string): void {
        this.calcification.push({
            distance: distance,
            morphology: morphology,
            distribution: distribution
        });
    }
    addPalpitations(distance: number): void{
        this.palpitation.push({
            distance: distance
        })
    }
    addScars(distance: number): void{
        this.scar.push({
            distance: distance
        })
    }
}