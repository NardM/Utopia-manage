/**
 * Created by nardm on 17.11.16.
 */
/**
 * Created by nardm on 17.11.16.
 */

import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {UserService} from "../../http/user.service";
import { BasketRequestInterface } from '../../chat/Model/BasketRequest';
import BasketRequest = BasketRequestInterface.BasketRequest;
import Request = BasketRequestInterface.Request;
import {Category} from "../../model/category";
import {CategoryService} from "../../http/category.service";
import {ConstService} from "../../../const/http/service-const.service";
import {BaThemeSpinner} from "../../../service/baThemeSpinner.service";
import { Req } from 'awesome-typescript-loader/dist/checker/protocol';

@Component({

    selector: 'my-requests-published',
    templateUrl: 'requests-published.component.html',
    styleUrls: [ 'requests-published.component.scss']
})
export class RequestsPublishedComponent implements OnInit {

    public requestServices: Array<Request> = [];
    public array = [];
    public offset = -20 ;
    public throttle = 300;
    public scrollDistance = 1;
    public blockUpload: boolean = false;
    public categories: Category[] = [];
    private loading: boolean = false;

    constructor(private router: Router,
                private service: ConstService,
                private _state: BaThemeSpinner,
                private categoryService: CategoryService,
                private userService: UserService) {

    }

    onScrollDown(): void {
        // add another 20 items
        if (!this.blockUpload) {
            this.loading = true;
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
        let self = this;
        this.userService.getServiceRequest(1 << 2, this.offset)
            .then(res => {
                if (res.total_count == 0) {
                    this.blockUpload = true;
                    return;
                }
                res.requests.map(item => {
                    if (item.icon_hash) {
                        self.requestServices.push(self.getImage(self.onPushCategoryInRequest(item)));
                    }
                    else {
                        self.requestServices.push(self.onPushCategoryInRequest(item));
                    }
                })
                self.loading = false;

            });
    }

    onPushCategoryInRequest(request: Request): Request {
        let self = this;
        request.category_name = self.categories.find(res => res.id === request.category_id).name;
        return request;
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
                this.userService.getServiceRequest(1 << 2, this.offset)
                    .then(requestServices => {
                        requestServices.requests.map(item => {
                            item = this.onPushCategoryInRequest(item);
                        });
                        this.requestServices = requestServices.requests;
                        this._state.hideManager();
                    })
            })
    }
}



