/**
 * Created by nardm on 07.11.16.
 */
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router }            from '@angular/router';

import {CategoryService} from "../http/category.service";
import {UserService} from "../http/user.service";
import {ServiceResponsesInterface} from "../model/service-responses";
import ServiceResponses = ServiceResponsesInterface.Responses;
import Responses= ServiceResponsesInterface.Respons;
import {ClientService} from "../http/client.service";
import RequestConfirm = RequestConfirmInterface.RequestConfirm;
import {RequestConfirmInterface} from "../model/service-request-confirm";
import {Observable} from "rxjs";
import {ServiceRequestInterface} from "../model/service-request";
import {Consts} from "../../const/app-const";
import ServiceRequestData = ServiceRequestDataInterface.ServiceRequestData;
import {ServiceRequestDataInterface} from "../model/service-request-data";
import { BasketRequestInterface } from '../chat/Model/BasketRequest';
import BasketRequest = BasketRequestInterface.BasketRequest;
import Request = BasketRequestInterface.Request;
import Task = BasketRequestInterface.Task;
import { MdDialog, MdDialogConfig, MdSidenav } from '@angular/material';
import { ChatDialogComponent } from '../chat/chat/chat-dialog/chat.component';
import { ChatService } from '../chat/chat/chat.service';
import { ServiceRequestStore } from '../http/request';
import ClientAccount = BasketRequestInterface.ClientAccount;


@Component({
    selector: 'form-request',
    templateUrl: 'form-request.component.html',
    styleUrls: ['form-request.component.scss'],
})
export class FormRequestComponent implements OnInit {

    ngOnInit(): void {
        if (this.numberRequest !== 1) {
            this.onLoad();
        }
    }

    @Input() public request: Request;
    @Input() public numberRequest: number = 0;
    @Output() public deleteRequest = new EventEmitter();
    public categoryName: string;
    public responseCompany: Responses;
    public requestConfirm: RequestConfirm;
    public userPhone: string = "";
    public openRequestData: boolean = false;
    public sidnavBool: boolean = false;
    private chatFlag: boolean;
    private person: ClientAccount;
    @ViewChild('sidenavPerson')
    private sidenav: MdSidenav;

    constructor(private categoryService: CategoryService,
                private userService: UserService,
                private router: Router,
                private dialog: MdDialog,
                private store: ServiceRequestStore,
                private service: ChatService,
                private clientService: ClientService) {
        this.chatFlag = true;
    }

    onLoad(): void {
        // this.getClient(this.request.user_id);
    }

    onSidnav(): void {
        this.sidnavBool = true;
    }

    getClient(userId: number): void {
        this.clientService.getClient(userId).then(res => this.userPhone = res.phone);
    }

    onDeleteRequest(event) {
        this.deleteRequest.emit(event);
    }

    onPerson() {
        if (this.person === undefined) {
            this.store.notDeleteRequest = this.request.id;
            this.service.postRequestTake(this.request.id)
                .then(res => {
                    this.request.request_take = true;
                    this.person = res.data.client_account;
                    this.sidenav.open();
                })
        }
        else {
            this.sidenav.open();
        }
    }

    getServiceRequestConfirm(): void {
        this.userService.getServiceRequestConfirm(this.request.id)
            .then(res => {
                this.requestConfirm = res;
                this.userService.getServiceResponseId(this.request.id, res.response_id)
                    .then(res => this.responseCompany);
            });
    }

    onChat() {
        let self = this;
        if (self.chatFlag) {
            self.store.notDeleteRequest = self.request.id;
            let option: MdDialogConfig = new MdDialogConfig();
            option.disableClose = false;
            option.height = '600px';
            option.width = '500px';
            debugger;
            let chatId: number = self.request.chat_id;
            if (self.request.status === 4 || self.request.status === 5 ||
                self.request.status === 6 || self.request.status === 7) {
                chatId = self.request.confirm.chat_id;
            }
            option.data = chatId;
            self.service.postRequestTake(self.request.id)
                .then(res => {
                    self.request.request_take = true;
                    self.dialog.open(ChatDialogComponent, option);
                });
            self.chatFlag = false;
        }
    }

}


