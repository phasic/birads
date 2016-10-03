import {Injectable} from "@angular/core";

@Injectable()
export class DataService {
    private composition: string;
    private mass: {
        size: number;
        sideX: number;
        sideY: number;
        frontX: number;
        frontY: number;
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
    constructor() {
        this.mass = []; // make an emty array so that the get length doesn't throw an error
        this.distortions = [];
        this.asymmetries = [];
        this.calcifications = [];
    }
    setComposition(composition: string): void {
        this.composition = composition;
    }
    getComposition(): string {
        return this.composition;
    }
    setMass(size: number, sx: number, sy: number, fx: number, fy: number, shape: string, margin: string, density: string): void {
        this.mass = [{
            size: size,
            sideX: sx,
            sideY: sy,
            frontX: fx,
            frontY: fy,
            shape: shape,
            margin: margin,
            density: density
        }]
    }
    addMass(size: number, sx: number, sy: number, fx: number, fy: number, shape: string, margin: string, density: string): void {
        if (this.mass == null) {
            this.setMass(size, sx, sy, fx, fy, shape, margin, density)
        }
        else {
            this.mass.push({
                    size: size,
                    sideX: sx,
                    sideY: sy,
                    frontX: fx,
                    frontY: fy,
                    density: density,
                    shape: shape,
                    margin: margin,
                }
            );
        }
    }
    getMass(index?: number): any {
        if (index == null) {
            return this.mass;
        }
        else
            return this.mass[index];
    }
    setDistortions(distortion: Array<string>): void {
        this.distortions = distortion;
    }
    addDistortions(distortion: string): void {
        if (this.distortions == null) {
            this.setDistortions([distortion]);

        }
        else {
            this.distortions.push(distortion);
        }

    }
    getDistortions(index?: number): any {
        if (index == null) {
            return this.distortions;
        }
        else
            return this.distortions[index];
    }
    setAsymmetries(asymmetries: Array<string>): void {
        this.asymmetries = asymmetries;
    }
    addAsymmetries(asymmetry: string): void {
        if (this.asymmetries == null) {
            this.setAsymmetries([asymmetry])

        }
        else {
            this.asymmetries.push(asymmetry);
        }
    }
    getAsymmetries(index?: number): any {
        if (index == null) {
            return this.asymmetries;
        }
        else
            return this.asymmetries[index];
    }
    setCalcifications(morphology: string, distribution: string): void {
        this.calcifications = [{
            morphology: morphology,
            distribution: distribution
        }]
    }
    addCalcifications(morphology: string, distribution: string): void {
        if (this.calcifications == null) {
            this.setCalcifications(morphology, distribution);
        }
        else {
            this.calcifications.push({
                morphology: morphology,
                distribution: distribution
            });
        }
    }
    getCalcifications(index?: number): any {
        if (index == null) {
            return this.calcifications;
        }
        else
            return this.calcifications[index];
    }
}