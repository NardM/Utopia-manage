/**
 * Created by nardm on 07.11.16.
 */
import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { Router }            from '@angular/router';

import {CategoryService} from "../../manage/category/http/category.service";
import {ServiceResponsesInterface} from "../model/service-responses";
import {ClientService} from "../clients/http/client.service";
import {RequestConfirmInterface} from "../model/service-requests-confirm";
import {ServiceRequestInterface} from "../model/service-requests";
import {Consts} from "../../../const/app-const";
import ServiceRequestData = ServiceRequestDataInterface.ServiceRequestData;
import {ServiceRequestDataInterface} from "../../model/service-request-data";
import {UserService} from "../../http/user.service";



@Component({
    selector: 'data-request',
    templateUrl: 'request-data.component.html',
    styleUrls: ['request-data.component.scss'],
})
export class RequestDataComponent implements OnInit, OnChanges {

  ngOnInit(): void {

  }

  @Input() requestId: number;

  @Input() requestData: ServiceRequestData[];

  ngOnChanges() {
    /*if (this.requestId) {
      this.getRequestData();
    }*/
  }

  convertDateInString(date: number): string {
    let d = new Date(date);
    return d.getDay().toString() + '.' + (d.getMonth()+1).toString() + '.' + d.getFullYear().toString();
  }
  convertDateTimeInString(date: number): string {
    let d = new Date(date);
    let result = d.toLocaleTimeString('ru');
    return result;
  }

  getPropertyIcon(property_id: number) {
    return Consts.baseURL + '/manage/v1/property/' + property_id + '/icon';
  }


  getServicePhoto(requestId: number){
    return 'http://smartapi.ru/v1/manage/requests/photo/'+ requestId;
  }

  getRequestData() {
    this.userService.getServiceRequestData(this.requestId)
      .then(res => {
        let bool: boolean = false;
        res.map(image => {
          if (image.type == 8) {
            res = res.filter(r => r!==image);
          }
          if (image.type ==5){
            image.text = new Date(image.date).toLocaleDateString();
          }
          if (image.type ==6){
            image.text = new Date(image.date_time).toLocaleString('ru');
          }
        });
        this.requestData = res;
      });
  }

  constructor(private router: Router,
              private userService: UserService) {
    if (this.requestData) {
      this.requestData.map(image => {
        if (image.type == 8) {
          this.requestData = this.requestData.filter(r => r !== image);
        }
        if (image.type == 5) {
          image.text = new Date(image.date).toLocaleDateString();
        }
        if (image.type == 6) {
          image.text = new Date(image.date_time).toLocaleString();
        }
      });
    }
  }


}


