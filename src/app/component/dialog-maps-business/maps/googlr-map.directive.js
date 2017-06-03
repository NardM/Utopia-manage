"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by nardm on 24.02.17.
 */
var core_1 = require("@angular/core");
var DirectionsMapDirective = (function () {
    function DirectionsMapDirective(gmapsApi) {
        this.gmapsApi = gmapsApi;
        this.duration = new core_1.EventEmitter();
        this.distance = new core_1.EventEmitter();
        this.path = new core_1.EventEmitter();
    }
    DirectionsMapDirective.prototype.updateDirections = function () {
        var _this = this;
        this.gmapsApi.getNativeMap().then(function (map) {
            if (!_this.originPlaceId || !_this.destinationPlaceId) {
                return;
            }
            var directionsService = new google.maps.DirectionsService;
            var me = _this;
            var latLngA = new google.maps.LatLng(_this.origin.latitude, _this.origin.longitude);
            var latLngB = new google.maps.LatLng(_this.destination.latitude, _this.destination.longitude);
            _this.directionsDisplay.setMap(map);
            _this.directionsDisplay.setOptions({
                polylineOptions: {
                    strokeWeight: 8,
                    strokeOpacity: 0.7,
                    strokeColor: '#00468c'
                }
            });
            _this.directionsDisplay.setDirections({ routes: [] });
            debugger;
            directionsService.route({
                origin: latLngA,
                destination: latLngB,
                avoidHighways: true,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            }, function (response, status) {
                if (status === 'OK') {
                    me.path.emit(response.routes.overview_polyline);
                    map.setZoom(30);
                    //console.log(me.getcomputeDistance (latLngA, latLngB));
                    var point = response.routes[0].legs[0];
                    me.estimatedTime = point.duration.text;
                    me.estimatedDistance = point.distance.text;
                    /* this.duration.emit(point.duration.text);
                     this.distance.emit(point.distance.text);*/
                    console.log(me.estimatedTime);
                    console.log('Estimated travel time: ' + point.duration.text + ' (' + point.distance.text + ')');
                }
                else {
                    console.log('Directions request failed due to ' + status);
                }
            });
        });
    };
    DirectionsMapDirective.prototype.getcomputeDistance = function (latLngA, latLngB) {
        return (google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 1000).toFixed(2);
    };
    return DirectionsMapDirective;
}());
__decorate([
    core_1.Input()
], DirectionsMapDirective.prototype, "origin", void 0);
__decorate([
    core_1.Input()
], DirectionsMapDirective.prototype, "destination", void 0);
__decorate([
    core_1.Input()
], DirectionsMapDirective.prototype, "originPlaceId", void 0);
__decorate([
    core_1.Input()
], DirectionsMapDirective.prototype, "destinationPlaceId", void 0);
__decorate([
    core_1.Input()
], DirectionsMapDirective.prototype, "waypoints", void 0);
__decorate([
    core_1.Input()
], DirectionsMapDirective.prototype, "directionsDisplay", void 0);
__decorate([
    core_1.Input()
], DirectionsMapDirective.prototype, "estimatedTime", void 0);
__decorate([
    core_1.Input()
], DirectionsMapDirective.prototype, "estimatedDistance", void 0);
__decorate([
    core_1.Output()
], DirectionsMapDirective.prototype, "duration", void 0);
__decorate([
    core_1.Output()
], DirectionsMapDirective.prototype, "distance", void 0);
__decorate([
    core_1.Output()
], DirectionsMapDirective.prototype, "path", void 0);
DirectionsMapDirective = __decorate([
    core_1.Directive({
        selector: 'sebm-google-map-directions'
    })
], DirectionsMapDirective);
exports.DirectionsMapDirective = DirectionsMapDirective;
