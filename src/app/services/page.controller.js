"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var PageController = (function () {
    function PageController(dataservice) {
        this.dataservice = dataservice;
        this.method = '';
        this.showmenu = '';
        this.numberofclicks = 0;
        this.badgelocations = {
            mass: [],
            distortion: [],
            asymmetry: [],
            calcification: [],
            palpitation: [],
            scar: []
        };
    }
    Object.defineProperty(PageController.prototype, "sideclicklocation", {
        get: function () {
            return this._sideclicklocation;
        },
        set: function (value) {
            this._sideclicklocation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageController.prototype, "frontclicklocation", {
        get: function () {
            return this._frontclicklocation;
        },
        set: function (value) {
            this._frontclicklocation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageController.prototype, "firstclicklocation", {
        get: function () {
            return this._firstclicklocation;
        },
        set: function (value) {
            this._firstclicklocation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageController.prototype, "distance", {
        get: function () {
            return this._distance;
        },
        set: function (value) {
            this._distance = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageController.prototype, "images", {
        get: function () {
            return this._images;
        },
        enumerable: true,
        configurable: true
    });
    PageController.prototype.setMethod = function (method) {
        this.method = method;
    };
    PageController.prototype.getMethod = function () {
        return this.method;
    };
    PageController.prototype.setShowmenu = function (showmenu) {
        this.showmenu = showmenu;
    };
    PageController.prototype.getShowmenu = function () {
        return this.showmenu;
    };
    PageController.prototype.isMenuShown = function () {
        return (this.showmenu !== '');
    };
    PageController.prototype.setNumberOfClicks = function (numberofclicks) {
        this.numberofclicks = numberofclicks;
    };
    PageController.prototype.getNumberOfClicks = function () {
        return this.numberofclicks;
    };
    PageController.prototype.setMenuActive = function (value) {
        this.menuactive = value;
    };
    PageController.prototype.getMenuActive = function () {
        return this.menuactive;
    };
    PageController.prototype.setImages = function () {
        var imageelements;
        imageelements = document.getElementsByClassName("map-image");
        this._images = [];
        for (var _i = 0, imageelements_1 = imageelements; _i < imageelements_1.length; _i++) {
            var element_1 = imageelements_1[_i];
            this._images.push({
                image: element_1,
                locX: element_1.getBoundingClientRect().left,
                locY: element_1.getBoundingClientRect().top,
                width: element_1.width,
                height: element_1.height
            });
        }
    };
    PageController.prototype.setClickLocation = function (target, event, first) {
        var image = target.parentNode.previousElementSibling; //convert the clicked map to the corresponding image
        var index = 0;
        var imagenumber;
        for (var _i = 0, _a = this.images; _i < _a.length; _i++) {
            var argument = _a[_i];
            if (argument.image.id === target.id + 'img') {
                imagenumber = index;
                break;
            }
            index++;
        }
        var relX = (event.clientX - image.getBoundingClientRect().left) / image.width;
        var relY = (event.clientY - image.getBoundingClientRect().top) / image.height;
        if (first) {
            this.firstclicklocation = { relX: relX, relY: relY, imagenumber: imagenumber };
        }
        if (image.id.slice(1, 2) === 'F') {
            this.frontclicklocation = { relX: relX, relY: relY, imagenumber: imagenumber };
        }
        else if (image.id.slice(1, 2) === 'S') {
            this.sideclicklocation = { relX: relX, relY: relY, imagenumber: imagenumber };
        }
    };
    PageController.prototype.calculateDistance = function () {
        var frontimage = this.images[this.frontclicklocation.imagenumber].image;
        var sideimage = this.images[this.sideclicklocation.imagenumber].image;
        var originX;
        var originY = frontimage.height * 0.5;
        var originZ = sideimage.width * 0.483;
        var distanceX;
        var distanceY;
        var distanceZ;
        if (frontimage.id.slice(0, 1) == 'R') {
            originX = frontimage.width * 0.516; //DONT CHANGE THIS NUMBER!!!!
            distanceX = (this.frontclicklocation.relX - originX) / originX;
            distanceY = -(this.frontclicklocation.relY - originY) / originY;
        }
        else if (frontimage.id.slice(0, 1) == 'L') {
            originX = frontimage.width * 0.468;
            distanceX = (this.frontclicklocation.relX - originX) / originX;
            distanceY = -(this.frontclicklocation.relY - originY) / originY;
        }
        this.distance = parseFloat((Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2)) / Math.sqrt(2)).toFixed(2));
    };
    PageController.prototype.renderBadge = function (elementref) {
        var argument;
        var index;
        for (var _i = 0, _a = this.dataservice.methods; _i < _a.length; _i++) {
            var method = _a[_i];
            if (this.getMethod() == method) {
                index = this.dataservice.getData(method).length;
                argument = method;
                break;
            }
        }
        var firstclick = this.firstclicklocation;
        var firstimage = this.images[firstclick.imagenumber];
        var frontclick = this.frontclicklocation;
        var frontimage = this.images[frontclick.imagenumber];
        var sideclick = this.sideclicklocation;
        var sideimage = this.images[sideclick.imagenumber];
        var badgefrontX = frontimage.locX + (frontclick.relX * frontimage.width);
        var badgesideX = sideimage.locX + (sideclick.relX * sideimage.width);
        var badgeY = firstimage.locY + (firstclick.relY * firstimage.height);
        var idside;
        var idfront;
        var tmp;
        tmp = document.createElement('div');
        tmp.innerHTML = "<div class='circle-finding'>" + argument.slice(0, 1).toLocaleUpperCase() + index + "</div>";
        tmp.style = "position: fixed; top:" + badgeY + "; left:" + badgesideX;
        idside = argument + index + 's';
        tmp.id = idside;
        elementref.nativeElement.appendChild(tmp);
        tmp = document.createElement('div');
        tmp.innerHTML = "<div class='circle-finding'>" + argument.slice(0, 1).toLocaleUpperCase() + index + "</div>";
        tmp.style = "position: fixed; top:" + badgeY + "; left:" + badgefrontX;
        idfront = argument + index + 'f';
        tmp.id = idfront;
        elementref.nativeElement.appendChild(tmp);
        this.saveBadgeLocation(argument, sideclick.relX, firstclick.relY, sideclick.imagenumber, idside, frontclick.relX, firstclick.relY, frontclick.imagenumber, idfront);
    };
    PageController.prototype.saveBadgeLocation = function (method, sideX, sideY, sideN, idside, frontX, frontY, frontN, idfront) {
        var badgecoordinates = {
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
        for (var _i = 0, _a = this.dataservice.methods; _i < _a.length; _i++) {
            var m = _a[_i];
            if (method == m) {
                this.badgelocations[method].push(badgecoordinates);
                break;
            }
        }
    };
    PageController.prototype.removeLocation = function (method, index) {
        this.getBadgeLocation(method).splice(index, 1);
    };
    PageController.prototype.getBadgeLocation = function (method) {
        for (var _i = 0, _a = this.dataservice.methods; _i < _a.length; _i++) {
            var m = _a[_i];
            if (method == m) {
                return this.badgelocations[method];
            }
        }
    };
    PageController.prototype.resizeBadges = function () {
        this.setImages(); //update the images
        var element;
        var locX;
        var locY;
        var image;
        for (var _i = 0, _a = this.dataservice.methods; _i < _a.length; _i++) {
            var method = _a[_i];
            for (var _b = 0, _c = this.badgelocations[method]; _b < _c.length; _b++) {
                var entry = _c[_b];
                //side
                locX = this.images[entry.side.imagenumber].locX + (entry.side.relX * this.images[entry.side.imagenumber].width);
                locY = this.images[entry.side.imagenumber].locY + (entry.side.relY * this.images[entry.side.imagenumber].height);
                element = document.getElementById(entry.side.id);
                element.style = "position: fixed; top:" + locY + "; left:" + locX;
                //front
                locX = this.images[entry.front.imagenumber].locX + (entry.front.relX * this.images[entry.front.imagenumber].width);
                locY = this.images[entry.front.imagenumber].locY + (entry.front.relY * this.images[entry.front.imagenumber].height);
                element = document.getElementById(entry.front.id);
                element.style = "position: fixed; top:" + locY + "; left:" + locX;
            }
        }
        if ((element = document.getElementById('firstlocation')) !== null) {
            image = this.images[this.firstclicklocation.imagenumber];
            locX = image.locX + (image.width * this.firstclicklocation.relX);
            locY = image.locY + (image.height * this.firstclicklocation.relY);
            element.style = "position: fixed; top:" + locY + "; left:" + locX;
        }
    };
    PageController = __decorate([
        core_1.Injectable()
    ], PageController);
    return PageController;
}());
exports.PageController = PageController;
