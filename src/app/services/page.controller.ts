import {Injectable, ElementRef} from "@angular/core";
import {DataService} from "./data.service";
import {TranslateService} from "ng2-translate";
@Injectable()
export class PageController {
    /**
     * Returns the location where we clicked on a side image
     * @returns {{relX: number, relY: number, imagenumber: number}} returns the X and Y coorindate value relative to the upper left corner of the image. and which number image we clicked (0-3)
     */
    get sideclicklocation(): {relX: number; relY: number; imagenumber: number} {
        return this._sideclicklocation;
    }

    /**
     * Sets the clicklocation where we clicked on a side image
     * relX, relY: coordinates relative to the upper left corner of the image
     * imagenumber: which number of image we clicked (0-3)
     * @param value
     */
    set sideclicklocation(value: {relX: number; relY: number; imagenumber: number}) {
        this._sideclicklocation = value;
    }

    /**
     * Returns the location where we clicked on a front image
     * @returns {{relX: number, relY: number, imagenumber: number}} returns the X and Y coorindate value relative to the upper left corner of the image. and which number image we clicked (0-3)
     */
    get frontclicklocation(): {relX: number; relY: number; imagenumber: number} {
        return this._frontclicklocation;
    }
    /**
     * Sets the clicklocation where we clicked on a front image
     * relX, relY: coordinates relative to the upper left corner of the image
     * imagenumber: which number of image we clicked (0-3)
     * @param value
     */
    set frontclicklocation(value: {relX: number; relY: number; imagenumber: number}) {
        this._frontclicklocation = value;
    }

    /**
     * returns the location of our first click
     * @returns {{relX: number, relY: number, imagenumber: number}} returns the X and Y coorindate value relative to the upper left corner of the image. and which number image we clicked (0-3)
     */
    get firstclicklocation(): {relX: number; relY: number; imagenumber: number} {
        return this._firstclicklocation;
    }
    /**
     * Sets the clicklocation where we first clicked on an image
     * relX, relY: coordinates relative to the upper left corner of the image
     * imagenumber: which number of image we clicked (0-3)
     * @param value
     */
    set firstclicklocation(value: {relX: number; relY: number; imagenumber: number}) {
        this._firstclicklocation = value;
    }

    /**
     * returns the calculated distance (not shown in tables anymore)
     * @returns {number}
     */
    get distance(): number {
        return this._distance;
    }

    /**
     * set the distance to a calculated value (not shown in table anymore)
     * @param value
     */
    set distance(value: number) {
        this._distance = value;
    }

    /**
     * Gets all the images, their location and their width and height, store them in an array
     * @returns {{image: any, locX: number, locY: number, width: number, height: number}[]}
     */
    get images(): {image: any; locX: number; locY: number; width: number; height: number}[] {
        return this._images;
    }

    /**
     * The selected method (mass, distortion, ...)
     */
    private method: string;
    /**
     * variable string that stores which menu is shown, its empty if none is shown, used to trigger menu popup
     */
    private showmenu: string;
    /**
     * boolean that's true when a menu is active
     */
    private menuactive: boolean;
    /**
     * stores the number of clicks on an image. to keep track of the first click, and check if the second click is a 'legal' click
     */
    private numberofclicks: number;
    /**
     * variable that stores a calculated distance (not shown in the table anymore)
     */
    private _distance: number;
    /**
     * Stores the location of our first click, the relative coordinates on the image, and which imagenumber
     */
    private _firstclicklocation: {
        relX: number,
        relY: number,
        imagenumber: number
    };
    /**
     * stores the clicklocation on a front image, the relative coordinates on the image, and which imagenumber
     */
    private _frontclicklocation: {
        relX: number,
        relY: number,
        imagenumber: number
    };
    /**
     * stores the clicllocation on a sideimage, the relative coordinates on the image, and which imagenumber
     */
    private _sideclicklocation: {
        relX: number,
        relY: number,
        imagenumber: number
    };
    /**
     * Array that stores all the images. the image element itself, the location on the page, the width and the height
     */
    private _images: {
        image: any,
        locX: number,
        locY: number,
        width: number,
        height: number
    }[];
    /**
     * Structure that stores arrays for every method, with their badges (used for resizing the screen, to recalculate their locations
     */
    private badgelocations: {
        mass: {
            side: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            },
            front: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            }
        }[],
        distortion: {
            side: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            },
            front: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            }
        }[],
        asymmetry: {
            side: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            },
            front: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            }
        }[],
        calcification: {
            side: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            },
            front: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            }
        }[],
        palpitation: {
            side: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            },
            front: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            }
        }[],
        scar: {
            side: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            },
            front: {
                relX: number,
                relY: number,
                imagenumber: number,
                id: string
            }
        }[]
    };

    /**
     * Constructor of pagecontroller
     * @param dataservice
     * @param translate
     */
    constructor( private dataservice: DataService, private translate: TranslateService) {
        this.method = '';               //initialize our set method to an empty string , no method selected
        this.showmenu = '';             //empty string to indicate that no menu is shown
        this.numberofclicks = 0;        //we didn't click the images yet
        this.badgelocations = {         //no badges exist yet
            mass: [],
            distortion: [],
            asymmetry: [],
            calcification: [],
            palpitation: [],
            scar: []
        };

    }

    /**
     * sets the method we want to use (mass, distortion, asymmetry,...). This value is set by the sidebar
     * @param method
     */
    setMethod(method: string): void {
        this.method = method;
    }

    /**
     * Returns the set method, when we pop up the menu, we need to show the correct menu corresponding to the right method
     * @returns {string}
     */
    getMethod(): string {
        return this.method;
    }

    /**
     * sets a value to showmenu, so the modal event onchange listeners will trigger, and will show the correct menu
     * @param showmenu
     */
    setShowmenu(showmenu: string): void {
        this.showmenu = showmenu;
    }

    /**
     * returns the showmenu variable
     * @returns {string}
     */
    getShowmenu(): string {
        return this.showmenu;
    }

    /**
     * returns true if there is a menu shown
     * @returns {boolean}
     */
    isMenuShown(): boolean {
        return (this.showmenu !== '');      //if the string is not empty, then a menu is shown
    }

    /**
     * Set the amount of times we clicked on the images
     * @param numberofclicks
     */
    setNumberOfClicks(numberofclicks: number): void{
        this.numberofclicks = numberofclicks;
    }

    /**
     * returns the amount of clicks we did on the images
     * @returns {number}
     */
    getNumberOfClicks(): number{
        return this.numberofclicks;
    }

    /**
     * used by the sidebar to check is a menu is active, if it is, block all sidebar functionality
     * @param value
     */
    setMenuActive(value: boolean): void{
        this.menuactive = value;
    }

    /**
     * check if there is an active menu
     * @returns {boolean}
     */
    getMenuActive(): boolean{
        return this.menuactive;
    }

    /**
     * gets the breast images, and stores the correct variables to the images structure
     */
    setImages(){
        let imageelements: any;
        imageelements = document.getElementsByClassName("map-image");       //get all the images with classname map-image from the page
        this._images = [];                                                  //make an empty array
        for(let element of imageelements){                                  //iterate over all the found images
            this._images.push({                                             //add them to the empty array
                image: element,                                             //add the image element itself
                locX: element.getBoundingClientRect().left,                 //the x coorcinate on the page
                locY: element.getBoundingClientRect().top,                  //the y coordinate on the page
                width: element.width,                                       //the width of the image
                height: element.height                                      //the height of the image
            })
        }

    }

    /**
     * when we clicked an image, we save that clicked location, so know where to render a badge later on
     * @param target    the clicked image
     * @param event     the click event itself, so we can get the clicklocation
     * @param first     boolean to indicate if this is our first click or not
     */
    setClickLocation(target: any, event: any, first?: boolean): void{
        let image: any = target.parentNode.previousElementSibling;    //convert the clicked map to the corresponding image
        let index: number = 0;
        let imagenumber: number;
        for(let argument of this.images){                            //iterate over the stored images
            if(argument.image.id === target.id + 'img'){            //if we found an id that corresponds with the clicked location image
                imagenumber = index;                                //save the imagenumber we clicked
                break;
            }
            index++;
        }
        let relX: number = (event.clientX - image.getBoundingClientRect().left) / image.width;  //calculate the relative click location
        let relY: number = (event.clientY - image.getBoundingClientRect().top) / image.height;  //calculate the relative click location
        if(first){
            this.firstclicklocation = { relX: relX, relY: relY, imagenumber: imagenumber};      //save it if it's the first click
        }
        if(image.id.slice(1,2) === 'F') {
            this.frontclicklocation = { relX: relX, relY: relY, imagenumber: imagenumber};      //if we clicked a front image
        }
        else if(image.id.slice(1,2) === 'S'){
            this.sideclicklocation = { relX: relX, relY: relY, imagenumber: imagenumber};       //if we clicked a side image
        }
    }

    /**
     * calculate the distance from the nipple, dont change the integer variables, those are specific to this image aspect ratio
     */
    calculateDistance(): void{
        let frontimage: any = this.images[this.frontclicklocation.imagenumber].image;   //gets the clicked front image
        let sideimage: any = this.images[this.sideclicklocation.imagenumber].image;     //gets the clicked side image
        let originX: number;                                                            //used to store the nipple X location
        let originY: number = frontimage.height * 0.5;                                  //used to store the nipple Y location, which is in the middle of the front image
        let originZ: number = sideimage.width * 0.483;                                  //used to store the nipple Z location, which is approx the middle of the sideimage
        let distanceX: number;                                                          //calculated X distance
        let distanceY: number;                                                          //calculated Y distance
        let distanceZ: number;                                                          //calcultated Z distance
        if(frontimage.id.slice(0,1) == 'R') {                                           //if we clicked the right side
            originX = frontimage.width * 0.516;  //DONT CHANGE THIS NUMBER!!!!          //the nipple X coordinate is a bit over the half of the image
            distanceX = (this.frontclicklocation.relX  - originX) / originX;            //calculate the normalized X distance (0-1)
            distanceY = -(this.frontclicklocation.relY - originY) / originY;            //calculate the normalized Y distance (0-1)
            distanceZ = parseFloat(((this.sideclicklocation.relX - originZ) / originZ).toFixed(2));  //the more clicked to the right, the higher the distance, normalized
        }
        else if(frontimage.id.slice(0,1) == 'L'){                                       //we clicked the left image
            originX = frontimage.width * 0.468;                                         //the nipple X coordinate is a bit under the half of the image
            distanceX = (this.frontclicklocation.relX  - originX) / originX;            //calculate the normalized X distance
            distanceY = -(this.frontclicklocation.relY - originY) / originY;            //calculate the normalized Y distance
            distanceZ = parseFloat((-(this.sideclicklocation.relX - originZ) / originZ).toFixed(2));   //the more clicked to the left, the higher the disntace, normalized
        }
        this.distance = parseFloat((Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY,2) + Math.pow(distanceZ,2))/Math.sqrt(2)).toFixed(2));    //calculate the 3D distance from the nipple
    }

    /**
     * once we entered all the data via the menu's, we render a badge on the original click locations
     * @param elementref renders a badge on the invisible div, which also holds the menus
     */
    renderBadge(elementref: ElementRef): void {
        let argument: string;
        let index: number;
        for(let method of this.dataservice.methods){                //iterate over all the possible methods
            if(this.getMethod() == method){                         //if we found our selected method
                index = this.dataservice.getData(method).length;    //save how many entries of that method we already have
                argument = method;                                  //save the selected method
                break;
            }
        }
        let firstclick: any = this.firstclicklocation;              //get the first clicked location
        let firstimage: any = this.images[firstclick.imagenumber];  //get the first clicked image
        let frontclick: any = this.frontclicklocation;              //get the front clicked location
        let frontimage: any = this.images[frontclick.imagenumber];  //get the front clicked image
        let sideclick: any = this.sideclicklocation;                //get the side clicked location
        let sideimage: any = this.images[sideclick.imagenumber];    //get the side clickedi mage

        let badgefrontX: number = frontimage.locX + (frontclick.relX * frontimage.width);   //calculate the location where to render the badge on the front image
        let badgesideX: number = sideimage.locX + (sideclick.relX * sideimage.width);       //calculate the location where to render the badge on the side image
        let badgeY: number = firstimage.locY + (firstclick.relY * firstimage.height);       //calculate the Y coordinate, this depends on the first click height


        let idside: string;                                         //stores the id of the side badge
        let idfront: string;                                        //stores the id of the front badge
        let tmp: any;                                               //used to render the div (badge)
        let translation: any = this.translate.get("SIDEBAR." + argument.toLocaleUpperCase());   //translate the argument, used to dispaly the correct letter in the badge
        tmp = document.createElement('div');                        //create an enmpty div
        tmp.innerHTML = `<div class='circle-finding'>${translation.value.slice(0,1).toLocaleUpperCase()}${index}</div>`;    //add a badge to the newly created div
        tmp.style = `position: fixed; top:${badgeY}; left:${badgesideX}`;       //the location is the previously calculated location
        idside = argument + index + 's';                                        //set the id of the badge
        tmp.id = idside;
        elementref.nativeElement.appendChild(tmp);                  //add it to the elementref
        tmp = document.createElement('div');                        //make a new div, now for the front image
        tmp.innerHTML = `<div class='circle-finding'>${translation.value.slice(0,1).toLocaleUpperCase()}${index}</div>`; //add a badge to the newly created div
        tmp.style = `position: fixed; top:${badgeY}; left:${badgefrontX}`;  //the location is the previously calculated location
        idfront = argument + index + 'f';                           //set the id of the badge
        tmp.id = idfront;
        elementref.nativeElement.appendChild(tmp);                  //add it to the elementref

        this.saveBadgeLocation(argument, sideclick.relX, firstclick.relY, sideclick.imagenumber, idside ,
            frontclick.relX, firstclick.relY, frontclick.imagenumber, idfront);     //save the badge location in the badgelocation structure, so we can later access it to move them
    }

    /**
     * adds a pair of badges to the badgelocation structure
     * @param method    the selected method
     * @param sideX     X coordinate of the side badge
     * @param sideY     Y coordinate of the side badge
     * @param sideN     which image clicked (side)
     * @param idside    id of the side badge
     * @param frontX    X coordinate of the front badge
     * @param frontY    Y coordinate of the front badge
     * @param frontN    which image clicked (side)
     * @param idfront   id of the front badge
     */
    saveBadgeLocation(method: string, sideX: number, sideY: number, sideN: number, idside: string,
                      frontX: number, frontY: number, frontN: number, idfront: string){

        let badgecoordinates: any = {   //set a structure readt to add it to the badgelocations
            side: {
                relX: sideX,
                relY: sideY,
                imagenumber: sideN,
                id: idside
            },
            front: {
                relX: frontX,
                relY: frontY,
                imagenumber: frontN,
                id: idfront
            }
        };
        for(let m of this.dataservice.methods){             //run over all the possible methods
            if(method == m){                                //if we found the correct method
                this.badgelocations[method].push(badgecoordinates); //add it to that array
                break;
            }
        }
    }

    /**
     * removes a badgelocation out of the badgelocations struture, used to remove an entry
     * @param method    which method
     * @param index     what index of the array
     */
    removeLocation(method: string, index: number): void{
        this.getBadgeLocation(method).splice(index,1);  //get the badgelocation array of a certain method, remove 1 entry at the location 'index'
    }

    /**
     * get the badgelocation array of a certain method
     * we can shorten this, but I prefer to keep the for loop as an extra check to look if the method really exists
     * @param method    the selected method
     * @returns {any}   array containing the badgelocations of that method
     */
    getBadgeLocation(method: string): any{
        for(let m of this.dataservice.methods){     //run over all the possible methods
            if(method == m){                        //if we found our method
                return this.badgelocations[method]; //return that array
            }
        }
    }

    /**
     * when the screen is resized, or we scroll. recalculate the location of all the badges
     */
    resizeBadges(){
        this.setImages(); //update the images
        let element: any;
        let locX: number;
        let locY: number;
        let image: any;


        for(let method of this.dataservice.methods){        //run over all the possible methods
            for(let entry of this.badgelocations[method]){  //run over all the badgelocation of the current method
                //side
                locX = this.images[entry.side.imagenumber].locX + (entry.side.relX * this.images[entry.side.imagenumber].width);    //recalculate the location, we know the location of the the clicked image, and the relative location to that image
                locY = this.images[entry.side.imagenumber].locY + (entry.side.relY * this.images[entry.side.imagenumber].height);   //recalculate the location
                element = document.getElementById(entry.side.id);                                       //get the correct badge
                element.style = `position: fixed; top:${locY}; left:${locX}`;                           //update the location to the newly calculated location
                //front
                locX = this.images[entry.front.imagenumber].locX + (entry.front.relX * this.images[entry.front.imagenumber].width); //recalculate the location
                locY = this.images[entry.front.imagenumber].locY + (entry.front.relY * this.images[entry.front.imagenumber].height);//recalculate the location
                element = document.getElementById(entry.front.id);                                      //get the correct badge
                element.style = `position: fixed; top:${locY}; left:${locX}`;                           //update the location to the newly calculated location
            }
        }

        if((element = document.getElementById('firstlocation')) !== null) {                             //if a firstclick badge exists
            image = this.images[this.firstclicklocation.imagenumber];                                   //get the first clicked image
            locX = image.locX + (image.width * this.firstclicklocation.relX);                           //recalculate the location
            locY = image.locY + (image.height * this.firstclicklocation.relY);                          //recalculate the location
            element.style = `position: fixed; top:${locY}; left:${locX}`;                               //update the location to the newly calculated location
        }
    }
}