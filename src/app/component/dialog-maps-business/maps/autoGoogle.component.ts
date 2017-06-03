import {Component, Directive, Inject, OnInit} from "@angular/core";
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {GoogleMapsAPIWrapper} from "angular2-google-maps/core";
declare var google:any;
declare var jQuery:any;




@Component({
    selector: 'google-maps-form',
    templateUrl: 'autoGoogle.component.html',
    styleUrls: ['autoGoogle.component.scss'],
    providers : [ GoogleMapsAPIWrapper ]
})


@Directive({
  selector: 'sebm-google-map-directions'
})

export class MapsGoogleComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public zoom: number;
  public iconurl: string;
  markerText: string;
  route: boolean = false;

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialogRef: MdDialogRef<MapsGoogleComponent>) {
  }



  ngOnInit() {
    //set google maps defaults
    debugger;
    let self = this;
    self.zoom = 12;
    self.latitude = self.data.location.lat;
    self.longitude = self.data.location.lng;
    self.markerText = self.data.text;
  }


}
