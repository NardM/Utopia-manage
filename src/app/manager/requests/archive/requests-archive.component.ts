/**
 * Created by nardm on 17.11.16.
 */
/**
 * Created by nardm on 17.11.16.
 */

import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import ServiceRequest = ServiceRequestInterface.ServiceRequest;
import {UserService} from "../../http/user.service";
import {ServiceRequestInterface} from "../../model/service-request";
import Request = ServiceRequestInterface.Request;

@Component({

    selector: 'my-requests-archive',
    templateUrl: 'requests-archive.component.html',
    styleUrls: [ 'requests-archive.component.scss']
})
export class RequestsArchiveComponent implements OnInit {

  requestServices: Array<Request>;
  array = [];
  offset = 0;
  throttle = 300;
  scrollDistance = 1;
  blockUpload: boolean = false;

  constructor(private router: Router,
              private userService: UserService) {
  }

  onScrollDown() {
    // add another 20 items
    if (!this.blockUpload) {
      this.offset += 20;
      this.getServiceRequest();
    }
  }

  getServiceRequest() {
    this.userService.getServiceRequest(1<<5|1<<6, this.offset)
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

  ngOnInit() {
    this.userService.getServiceRequest(1<<5|1<<6, this.offset)
      .then(requestServices => this.requestServices = requestServices)
  }
}



