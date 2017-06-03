/**
 * Created by nardm on 17.11.16.
 */

import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {UserService} from "../../http/user.service";
import ServiceRequest = ServiceRequestInterface.ServiceRequest;
import {ServiceRequestInterface} from "../../model/service-request";
import Request = ServiceRequestInterface.Request;
import {CategoryService} from "../../http/category.service";
import {Category} from "../../model/category";

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
    categories: Category[];

  constructor(private router: Router,
              private categoryService: CategoryService,
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
            this.requestServices.push(this.onPushCategoryInRequest(item))
        })
      });
  }

    onPushCategoryInRequest(request: Request) {
        let self = this;
        request.category_name = self.categories.find(res => res.id === request.category_id).name;
        return request;
    }

  onScrollDown() {
    // add another 20 items
    if (!this.blockUpload) {
      this.offset += 20;
      this.getServiceRequest();
    }
  }

  ngOnInit() {
      this.categoryService.getCategories()
          .then(res => {
              this.categories = res;
          })
          .then(res => {
              this.userService.getServiceRequest(1 << 3 | 1 << 4, this.offset)
                  .then(requestServices => {
                      requestServices.requests.map(item=>{
                          item = this.onPushCategoryInRequest(item);
                      })
                      this.requestServices = requestServices.requests
                  })
          });
  }
}



