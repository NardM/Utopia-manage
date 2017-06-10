/**
 * Created by nardm on 17.11.16.
 */

import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {UserService} from "../../http/user.service";
import { BasketRequestInterface } from '../../chat/Model/BasketRequest';
import BasketRequest = BasketRequestInterface.BasketRequest;
import Request = BasketRequestInterface.Request;;
import {CategoryService} from "../../http/category.service";
import {Category} from "../../model/category";
import {ConstService} from "../../../const/http/service-const.service";
import {BaThemeSpinner} from "../../../service/baThemeSpinner.service";

@Component({

    selector: 'my-requests-accepted',
    templateUrl: 'requests-accepted.component.html',
    styleUrls: [ 'requests-accepted.component.scss']
})
export class RequestsAcceptedComponent implements OnInit {

    public requestServices: Array<Request>;
    private array = [];
    private offset = 0;
    private throttle = 300;
    private scrollDistance = 1;
    private blockUpload: boolean = false;
    private categories: Category[] = [];

    constructor(private router: Router,
                private service: ConstService,
                private _state: BaThemeSpinner,
                private categoryService: CategoryService,
                private userService: UserService) {
    }

    getImage(request: Request) {
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
        this.userService.getServiceRequest(1 << 4, this.offset)
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

    onScrollDown(): void {
        debugger;
        // add another 20 items
        if (!this.blockUpload) {
            this.offset += 20;
            this.getServiceRequest();
        }
    }

    ngOnInit() {
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
                this.userService.getServiceRequest(1 << 4, this.offset)
                    .then(requestServices => {
                        requestServices.requests.map(item => {
                            item = this.onPushCategoryInRequest(item);
                        });
                        this.requestServices = requestServices.requests;
                        this._state.hideManager();
                    })
            });
    }
}



