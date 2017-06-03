/**
 * Created by nardm on 24.02.17.
 */
import {Directive, EventEmitter, Input, Output} from "@angular/core";
import {GoogleMapsAPIWrapper} from "angular2-google-maps/core";


declare var google: any;



@Directive({
  selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective {
  @Input() origin:any ;
  @Input() destination:any;
  @Input() originPlaceId:any;
  @Input() destinationPlaceId:any;
  @Input() waypoints:any;
  @Input() directionsDisplay:any;
  @Input() estimatedTime : any;
  @Input() estimatedDistance : any;
  @Output() duration = new EventEmitter<string>();
  @Output() distance = new EventEmitter<string>();
  @Output() path = new EventEmitter<string>();


  constructor (private gmapsApi: GoogleMapsAPIWrapper) {}
  updateDirections(){
    this.gmapsApi.getNativeMap().then(map => {
      if(!this.originPlaceId || !this.destinationPlaceId ){
        return;
      }

      var directionsService = new google.maps.DirectionsService;
      var me = this;
      var latLngA = new google.maps.LatLng( this.origin.latitude, this.origin.longitude );
      var latLngB = new google.maps.LatLng( this.destination.latitude,  this.destination.longitude);
      this.directionsDisplay.setMap(map);
      this.directionsDisplay.setOptions({
        polylineOptions: {
          strokeWeight: 8,
          strokeOpacity: 0.7,
          strokeColor:  '#00468c'
        }
      });
      this.directionsDisplay.setDirections({routes: []});
      debugger;
      directionsService.route({
        origin:latLngA,
        destination: latLngB,
        avoidHighways: true,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
        //travelMode: 'DRIVING'
      }, function(response: any, status: any) {
        if (status === 'OK') {
          me.path.emit(response.routes.overview_polyline);
          map.setZoom(30);
          //console.log(me.getcomputeDistance (latLngA, latLngB));
          var point = response.routes[ 0 ].legs[ 0 ];
          me.estimatedTime = point.duration.text ;
          me.estimatedDistance = point.distance.text;
         /* this.duration.emit(point.duration.text);
          this.distance.emit(point.distance.text);*/
          console.log(me.estimatedTime);
          console.log( 'Estimated travel time: ' + point.duration.text + ' (' + point.distance.text + ')' );

        } else {
          console.log('Directions request failed due to ' + status);
        }
      });
    });

  }

  private getcomputeDistance(latLngA: any , latLngB: any )
  {
    return (google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 1000).toFixed(2);
  }
}
