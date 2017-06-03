/**
 * Created by nardm on 07.11.16.
 */
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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
import Request = ServiceRequestInterface.Request;
import ServiceRequest = ServiceRequestInterface.ServiceRequest;
import {Consts} from "../../const/app-const";
import ServiceRequestData = ServiceRequestDataInterface.ServiceRequestData;
import {ServiceRequestDataInterface} from "../model/service-request-data";



@Component({
    selector: 'form-request',
    templateUrl: 'form-request.component.html',
    styleUrls: ['form-request.component.scss'],
})
export class FormRequestComponent implements OnInit {

  ngOnInit(): void {
    this.onLoad();

  }

  @Input() request: Request;
  @Input() numberRequest: number;
  @Output() deleteRequest = new EventEmitter();
  categoryName: string;
  responseCompany: Responses;
  requestConfirm: RequestConfirm;
  userPhone: string = "";
  openRequestData: boolean = false;
  sidnavBool: boolean = false;

  constructor(private categoryService: CategoryService,
              private userService: UserService,
              private router: Router,
              private clientService: ClientService) {
  }

  onLoad() {
    this.getClient(this.request.user_id);
  }

  onSidnav(){
      this.sidnavBool = true;
  }

  getClient(userId: number) {
    this.clientService.getClient(userId).then(res => this.userPhone = res.phone);
  }


  getServiceRequestConfirm() {
    this.userService.getServiceRequestConfirm(this.request.id)
        .then(res => {
          this.requestConfirm = res;
          this.userService.getServiceResponseId(this.request.id, res.response_id)
              .then(res => this.responseCompany);
        });
  }

}


