import {Injectable} from "@angular/core";

@Injectable()
export class DataService {
    //TODO THE CLICK LOCATION OF EVERY FINDING NEEDS TO BE SAVED TOO
    private composition: string;
    private mass: {
        size: number;
        shape: string;
        margin: string;
        density: string;
    }[];
    private distortions: Array<string>;
    private asymmetries: Array<string>;
    private calcifications: {
        morphology: string;
        distribution: string;
    }[];


    private method: string; // mass, distortion, asymmetries or calcifications.

    constructor() {
    }

    setComposition(composition: string): void{
        this.composition = composition;
    }
    getComposition(): string{
        return this.composition;
    }
    setMass(size: number, shape: string, margin: string, density: string): void{
        this.mass = [{
            size: size,
            shape: shape,
            margin: margin,
            density: density
        }]
    }
    addMass(size: number, shape: string, margin: string, density: string): void{
        if(this.mass == null){
            this.setMass(size, shape, margin, density)
        }
        else {
            this.mass.push({
                    size: size,
                    density: density,
                    shape: shape,
                    margin: margin,
                }
            );
        }
    }
    getMass(index? : number): any{
        if(index == null){
            return this.mass;
        }
        else
            return this.mass[index];
    }
    setDistortions(distortion: Array<string>): void{
        this.distortions = distortion;
    }
    addDistortions(distortion: string): void{
        if(this.distortions == null){
            this.setDistortions([distortion]);

        }
        else {
            this.distortions.push(distortion);
        }

    }
    getDistortions(index? : number): any{
        if(index == null){
            return this.distortions;
        }
        else
            return this.distortions[index];
    }
    setAsymmetries(asymmetries: Array<string>): void{
        this.asymmetries = asymmetries;
    }
    addAsymmetries(asymmetry: string): void{
        if(this.asymmetries == null){
            this.setAsymmetries([asymmetry])

        }
        else {
            this.asymmetries.push(asymmetry);
        }
    }
    getAsymmetries(index? : number): any{
        if(index == null){
            return this.asymmetries;
        }
        else
            return this.asymmetries[index];
    }
    setCalcifications(morphology: string, distribution: string): void{
        this.calcifications = [{
            morphology: morphology,
            distribution: distribution
        }]
    }
    addCalcifications(morphology: string, distribution: string): void{
        if(this.calcifications == null){
            this.setCalcifications(morphology, distribution);
        }
        else {
            this.calcifications.push({
                morphology: morphology,
                distribution: distribution
            });
        }
    }
    getCalcifications(index? : number): any{
        if(index == null){
            return this.calcifications;
        }
        else
            return this.calcifications[index];
    }
    setMethod(method: string): void{
        this.method = method;
    }
    getMethod(): string{
        return this.method;
    }
}
