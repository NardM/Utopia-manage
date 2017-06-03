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
import {CategoryService} from "../../http/category.service";
import {Category} from "../../model/category";

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
    categories: Category[];

    constructor(private router: Router,
                private categoryService: CategoryService,
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
        this.userService.getServiceRequest(1 << 5 | 1 << 6, this.offset)
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

    ngOnInit() {
        let self =this;
        self.categoryService.getCategories()
            .then(res => {
                self.categories = res;
            })
            .then(res => {
                self.userService.getServiceRequest(1 << 5 | 1 << 6, this.offset)
                    .then(requestServices => {
                        requestServices.requests.map(item=>{
                            item = self.onPushCategoryInRequest(item);
                        })
                        self.requestServices = requestServices.requests
                    })
            });
    }
}



