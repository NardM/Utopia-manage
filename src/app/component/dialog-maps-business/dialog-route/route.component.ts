import {Component, Inject, OnInit} from "@angular/core";
import {LatLngBoundsLiteral, LatLngLiteral} from "angular2-google-maps/core";
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
declare var google:any;




@Component({
    selector: 'google-maps-route-form-dialog',
    templateUrl: 'route.component.html',
    styleUrls: ['route.component.scss'],
})




export class MapsGoogleRouteDialogComponent implements OnInit {


  public origin: any = {longitude: 4.333, latitude: -1.2222};  // its a example aleatory position
  public destination: any = {longitude: 22.311, latitude: -0.123};  // its a example aleatory position
  public latitude: number;
  public longitude: number;
  public zoom: number;
  duration: string;
  distance: string;
  paths: Array<LatLngLiteral> = [];
  bounds: LatLngBoundsLiteral;
  originText: string ;
  destinationText: string ;

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialogRef: MdDialogRef<MapsGoogleRouteDialogComponent>) {
  }

  onPath(event) {
     this.decode(event);
    //let path = JSON.stringify(google.maps.geometry.encoding.decodePath(event));
    debugger;
    //this.paths = JSON.parse(path);
  }

decode(str) {
  var index = 0,
    lat = 0,
    lng = 0,
    shift = 0,
    result = 0,
    byte = null,
    latitude_change,
    longitude_change,
    factor = Math.pow(10, 5);

  // Coordinates have variable length when encoded, so just keep
  // track of whether we've hit the end of the string. In each
  // loop iteration, a single coordinate is decoded.
  while (index < str.length) {

    // Reset shift, result, and byte
    byte = null;
    shift = 0;
    result = 0;

    do {
      byte = str.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

    shift = result = 0;

    do {
      byte = str.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

    lat += latitude_change;
    lng += longitude_change;

    this.paths.push({lat: lat / factor, lng: lng / factor});
  }
}


  ngOnInit() {
    //set google maps defaults
    debugger;
    this.zoom = 12;
    let self = this;
    if (self.data) {
      self.origin.latitude = self.data.adresses[0].location.lat;
      self.origin.longitude = self.data.adresses[0].location.lng;
      self.destination.latitude = self.data.adresses[1].location.lat;
      self.destination.longitude = self.data.adresses[1].location.lng;
      self.originText = self.data.adresses[0].text;
      self.destinationText = self.data.adresses[1].text;
      self.onPath(self.data.path);
      self.bounds = self.data.bounds;
      self.distance = (Math.ceil(self.data.distance / 1000)).toString() + ' км';
    }
  }

}
