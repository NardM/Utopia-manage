/**
 * Created by nardm on 17.11.16.
 */
/**
 * Created by nardm on 17.11.16.
 */

import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Router }            from '@angular/router';
import ServiceRequest = ServiceRequestInterface.ServiceRequest;
import {UserService} from "../../http/user.service";
import {ServiceRequestInterface} from "../../model/service-request";
import { BasketRequestInterface } from '../../chat/Model/BasketRequest';
import BasketRequest = BasketRequestInterface.BasketRequest;
import Request = BasketRequestInterface.Request;
import {CategoryService} from "../../http/category.service";
import {Category} from "../../model/category";
import {ConstService} from "../../../const/http/service-const.service";
import {BaThemeSpinner} from "../../../service/baThemeSpinner.service";

@Component({

    selector: 'my-requests-archive',
    templateUrl: 'requests-archive.component.html',
    styleUrls: [ 'requests-archive.component.scss']
})
export class RequestsArchiveComponent implements OnInit {

    public requestServices: Array<Request>;
    private array = [];
    private offset = 0;
    private throttle = 300;
    private scrollDistance = 1;
    private blockUpload: boolean = false;
    private categories: Category[] = [];

    constructor(private router: Router,
                private service: ConstService,
                private categoryService: CategoryService,
                private _state: BaThemeSpinner,
                private userService: UserService) {
    }

    onScrollDown(): void {
        // add another 20 items
        if (!this.blockUpload) {
            this.offset += 20;
            this.getServiceRequest();
        }
    }

    getImage(request: Request): Request {
        let url;
        let self = this;
        url = `v1/manager/order/${request.id}/icon`;
        self.service.getAvatar(url)
            .subscribe(item => {
                request.logo = item;
            });
        return request;
    }

    getServiceRequest(): void {
        this.userService.getServiceRequest(1 << 5 | 1 << 6, this.offset)
            .then(res => {
                if (res.total_count == 0) {
                    this.blockUpload = true;
                    return;
                }
                res.requests.map(item => {
                    if (item.icon_hash) {
                        this.requestServices.push(this.getImage(this.onPushCategoryInRequest(item)));
                    }
                    else {
                        this.requestServices.push(this.onPushCategoryInRequest(item));
                    }
                })
            });
    }

    onPushCategoryInRequest(request: Request): Request {
        let self = this;
        request.category_name = self.categories.find(res => res.id === request.category_id).name;
        return request;
    }

    ngOnInit() {
        let self = this;
        this.categoryService.getCategories()
            .then(res => {
                res.map(item => {
                    if (item.subcategories.length !== 0) {
                        item.subcategories.map(subcategory => {
                            this.categories.push(subcategory)
                        })
                    }
                    else {
                        this.categories.push(item)
                    }
                })
            })
            .then(res => {
                self.userService.getServiceRequest(1 << 5 | 1 << 6, this.offset)
                    .then(requestServices => {
                        requestServices.requests.map(item => {
                            item = self.onPushCategoryInRequest(item);
                        });
                        self.requestServices = requestServices.requests;
                        self._state.hideManager();
                    })
            });
    }
}



