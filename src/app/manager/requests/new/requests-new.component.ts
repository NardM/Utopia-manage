/**
 * Created by nardm on 17.11.16.
 */
/**
 * Created by nardm on 17.11.16.
 */

import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {UserService} from "../../http/user.service";
import ServiceRequest = ServiceRequestInterface.ServiceRequest;
import {ServiceRequestInterface} from "../../model/service-request";
import Request = ServiceRequestInterface.Request;
import {RequestManagerHub} from "../../http/hubs/RequestHub";
import {CategoryService} from "../../http/category.service";

@Component({

    selector: 'my-requests-new',
    templateUrl: 'requests-new.component.html',
    styleUrls: [ 'requests-new.component.scss']
})
export class RequestsNewComponent implements OnInit {

  requestServices: Array<Request>;
  selectedRequest: Request;

  constructor(private router: Router,
              private userService: UserService,
              private hub: RequestManagerHub,
              private categoryService: CategoryService) {
  }

  array = [];
  offset = 0;
  throttle = 300;
  scrollDistance = 1;
  blockUpload: boolean = false;

  onScrollDown() {
    // add another 20 items
    if (!this.blockUpload) {
      this.offset += 20;
      this.getServiceRequest();
    }
  }

  getServiceRequest() {
    this.userService.getServiceRequest(1<<1, this.offset)
      .then(res => {
        if (res.length == 0) {
          this.blockUpload = true;
          return;
        }
        res.map(item => {
          this.requestServices.push(item)
        })
      });
  }


  deleteRequest(requestServices: Request){
    this.requestServices = this.requestServices.filter(h => h!==requestServices);
    if (this.selectedRequest === requestServices) { this.selectedRequest = null;}

  }

  ngOnInit() {
    this.userService.getServiceRequest(4, this.offset)
      .then(requestServices => this.requestServices = requestServices)
  }
}



