/**
 * Created by nardm on 17.11.16.
 */

import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {UserService} from "../../http/user.service";
import ServiceRequest = ServiceRequestInterface.ServiceRequest;
import {ServiceRequestInterface} from "../../model/service-request";
import Request = ServiceRequestInterface.Request;

@Component({

    selector: 'my-requests-accepted',
    templateUrl: 'requests-accepted.component.html',
    styleUrls: [ 'requests-accepted.component.scss']
})
export class RequestsAcceptedComponent implements OnInit {

  requestServices: Array<Request>;
  array = [];
  offset = 0;
  throttle = 300;
  scrollDistance = 1;
  blockUpload: boolean = false;

  constructor(private router: Router,
              private userService: UserService) {
  }

  getServiceRequest() {
    this.userService.getServiceRequest(1<<3|1<<4, this.offset)
      .then(res => {
        if (res.total_count == 0) {
          this.blockUpload = true;
          return;
        }
        res.requests.map(item => {
          this.requestServices.push(item)
        })
      });
  }

  onScrollDown() {
    // add another 20 items
    if (!this.blockUpload) {
      this.offset += 20;
      this.getServiceRequest();
    }
  }

  ngOnInit() {
    this.userService.getServiceRequest(1<<3|1<<4, this.offset)
      .then(requestServices => this.requestServices = requestServices.requests)
  }
}



