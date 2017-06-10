/**
 * Created by nardm on 17.11.16.
 */
/**
 * Created by nardm on 17.11.16.
 */

import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {UserService} from "../../http/user.service";
import {RequestManagerHub} from "../../http/hubs/RequestHub";
import {CategoryService} from "../../http/category.service";
import {Category} from "../../model/category";
import {ServiceRequestStore, StoreAction, StoreItem} from "../../http/request";
import {ConstService} from "../../../const/http/service-const.service";
import {Req} from "awesome-typescript-loader/dist/checker/protocol";
import {BaThemeSpinner} from "../../../service/baThemeSpinner.service";
import { BasketRequestInterface } from '../../chat/Model/BasketRequest';
import BasketRequest = BasketRequestInterface.BasketRequest;
import Request = BasketRequestInterface.Request;


@Component({

    selector: 'my-requests-new',
    templateUrl: 'requests-new.component.html',
    styleUrls: [ 'requests-new.component.scss']
})
export class RequestsNewComponent  {

    constructor(private router: Router,
                private userService: UserService,
                private hub: RequestManagerHub,
                private _state: BaThemeSpinner,

                private service: ConstService,
                private store: ServiceRequestStore,
                private categoryService: CategoryService) {
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
                    this._state.hideManager();
                })
            })
            .then(r => {
                this.store.createObserver()
                    .subscribe(res =>
                        this.newStoreItem(res));
            })
    }

    private array = [];
    private offset = 20;
    private throttle = 300;
    private scrollDistance = 1;
    public requests: Array<Request> = [];
    private blockUpload: boolean = false;
    private requestList: boolean = false;
    private requestFlag: boolean = false;
    private noRequest: boolean = true;
    private blockLoadFlag: boolean = false;
    private totalCount: number = 0;
    private countScroll: number = 1;
    private categories: Category[] = [];
    private loading: boolean = false;

    newStoreItem(res: StoreItem<Request>): void {
        let self = this;
        switch (res.action) {
            case StoreAction.Inserted:
                if (res.total_count) {
                    self.totalCount = res.total_count;
                }
                if (res.item.icon_hash) {
                    self.requests.push(self.getImage(self.onPushCategoryInRequest(res.item)));
                }
                else {
                    self.requests.push(self.onPushCategoryInRequest(res.item));
                }
                self.requestFlag = true;
                self.noRequest = false;
                //this.requests.push(res.item);
                break;
            case StoreAction.NewInserted:
                debugger;
                self.totalCount++;
                self.requests.unshift(self.getImage(self.onPushCategoryInRequest(res.item)));
                self.requestFlag = true;
                self.noRequest = false;
                break;
            case StoreAction.Deleted:
                debugger;
                let id: number = res.item.id;
                let arrayEquals: boolean = false;

                self.requests.map(item => {
                    if (item.id === id) {
                        arrayEquals = true;
                    }
                });
                if (arrayEquals) {
                    let indexDelete: number = -1;
                    for (let i = 0; i < self.requests.length; i++) {
                        if (id === self.requests[i].id) {
                            indexDelete = i;
                            break;
                        }
                    }
                    self.requests.splice(indexDelete, 1);
                }
                break;
            default:
                break
        }
    }

    onScrollDown(): void {
        // add another 20 items
        debugger;
        if (!this.blockUpload && !this.blockLoadFlag) {
            this.loading = true;
            if (this.totalCount >= (this.offset + 20)) {
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


    getRequest(): void {
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
                self.loading = false;
            });
    }


    getCategories(): void {
        this.categoryService.getCategories()
            .then(res => {
                this.categories = res;
            })
    }


    onPushCategoryInRequest(request: Request): Request {
        let self = this;
        request.category_name = self.categories.find(res => res.id === request.category_id).name;
        return request;
    }



}



