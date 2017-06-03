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
import {Category} from "../../model/category";
import {ServiceRequestStore, StoreAction, StoreItem} from "../../http/request";
import {ConstService} from "../../../const/http/service-const.service";
import {Req} from "awesome-typescript-loader/dist/checker/protocol";

@Component({

    selector: 'my-requests-new',
    templateUrl: 'requests-new.component.html',
    styleUrls: [ 'requests-new.component.scss']
})
export class RequestsNewComponent implements OnInit {

    constructor(private router: Router,
                private userService: UserService,
                private hub: RequestManagerHub,
                private service: ConstService,
                private store: ServiceRequestStore,
                private categoryService: CategoryService) {
        this.categoryService.getCategories()
            .then(res => {
                this.categories = res;
            })
            .then(r=>{
                this.store.createObserver()
                    .subscribe(res =>
                        this.newStoreItem(res));
            })
        }

    array = [];
    offset = 20;
    throttle = 300;
    scrollDistance = 1;
    requests: Array<Request> = [];
    blockUpload: boolean = false;
    requestList: boolean = false;
    requestFlag: boolean = false;
    noRequest: boolean = true;
    blockLoadFlag: boolean = false;
    totalCount: number = 0;
    countScroll: number = 1;
    categories: Category[];

    newStoreItem(res: StoreItem<Request>) {
        let self = this;
        switch (res.action) {
            case StoreAction.Inserted:
                if (res.total_count) {
                    self.totalCount = res.total_count;
                }
                self.requests.push(self.getImage(self.onPushCategoryInRequest(res.item)));
                self.requestFlag = true;
                self.noRequest = false;
                //this.requests.push(res.item);
                break;
            case StoreAction.NewInserted:
                self.totalCount++;
                self.requests.unshift(self.getImage(self.onPushCategoryInRequest(res.item)));
                self.requestFlag = true;
                self.noRequest = false;
                break;
            case StoreAction.Deleted:
                debugger;
                let indexDelete: number = -1;
                for (let i = 0; i < self.requests.length; i++) {
                    if (res.item.id === self.requests[i].id) {
                        indexDelete = i;
                        break;
                    }
                }
                self.requests.splice(indexDelete, 1);
                break;
        }
    }

    onScrollDown() {
        // add another 20 items
        if (!this.blockUpload && !this.blockLoadFlag) {
            if (this.totalCount >= (this.offset + 20)) {
                debugger;
                this.offset += 20;
                this.blockLoadFlag = true;
                this.countScroll++;
                this.getRequest();
            }
            else if (this.totalCount > this.offset) {
                this.offset += this.totalCount - this.offset;
                this.blockLoadFlag = true;
                this.countScroll++;
                this.getRequest();
            }
        }
    }

    getImage(request: Request) {
        let url;
        let self = this;
        url = `manage/v1/request/${request.id}/photo`;
        self.service.getAvatar(url)
            .subscribe(item => {
                request.logo = item;
            });
        return request;
    }


    getRequest() {
        let self = this;
        self.userService.getServiceRequest(1 << 1 | 1 << 2 | 1 << 3 | 1 << 4,
            self.totalCount - self.offset)
            .then(res => {
                if (res.total_count === 0) {
                    self.blockUpload = true;
                    return;
                }
                self.totalCount = res.total_count;
                res.requests.map(item => {
                    self.requests.push(self.getImage(self.onPushCategoryInRequest(item)))
                });
                self.blockLoadFlag = false;
            });
    }


    getCategories() {
        this.categoryService.getCategories()
            .then(res => {
                this.categories = res;
            })
    }


    onPushCategoryInRequest(request: Request) {
        let self = this;
            request.category_name = self.categories.find(res => res.id === request.category_id).name;
            return request;
    }


    ngOnInit() {
    }


}



