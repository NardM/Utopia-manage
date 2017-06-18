/**
 * Created by nardm on 17.11.16.
 */
import { Injectable }    from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Consts } from '../../const/app-const'
import { Observable } from "rxjs/Observable";
import {TokenService} from "../../tokenstore/token.serviece";
import {Answer} from "../../http/answer";
import ServiceRequest = ServiceRequestInterface.ServiceRequest;
import Request = ServiceRequestInterface.Request;
import {ServiceRequestInterface} from "../model/service-request";
import {ServiceResponsesInterface} from "../model/service-responses";
import ServiceResponses = ServiceResponsesInterface.Respons;
import Responses= ServiceResponsesInterface.Respons;
import RequestConfirm = RequestConfirmInterface.RequestConfirm;
import {RequestConfirmInterface} from "../model/service-request-confirm";
import {ConstService} from "../../const/http/service-const.service";
import Property = PropertyInterface.Property;
import ServiceRequestData = ServiceRequestDataInterface.ServiceRequestData;
import {ServiceRequestDataInterface} from "../model/service-request-data";
import {PropertyInterface} from "../model/property";
import { Req } from 'awesome-typescript-loader/dist/checker/protocol';
import { EmptyAnswer } from './answer';
import { BasketRequestInterface } from '../chat/Model/BasketRequest';
import BasketRequest = BasketRequestInterface.BasketRequest;
import RequestI = BasketRequestInterface.Request;
import Task = BasketRequestInterface.Task;


@Injectable()
export class UserService {

  private requestUrl = Consts.baseURL + 'manage/v1/requests';
  private serviceRequestUrl = Consts.baseURL + 'manage/v1/service/request';

  constructor(private constService: ConstService) {
  }

  getServiceRequest(id: number, offset?: number): Promise<BasketRequest> {
      let url = this.serviceRequestUrl + '?count=20&offset=' + offset + '&status_filter=' + id;
      return this.constService.get<BasketRequest>(url);
  }


 getServiceRequestChat(offset?: number): Promise<Request[]> {
    let url = this.serviceRequestUrl +'?count=20&offset=' + offset;
    return this.constService.get<Request[]>(url, 'requests');
  }

  getServiceRequestUser(id: number, status?: number): Promise<Request> {
    let url = this.serviceRequestUrl + '?user_id/' + id;
    if (status)
       url = this.serviceRequestUrl + '&status_filter' + status + '&user_id=' + id;
    return this.constService.get<Request>(url, 'requests');
  }

  getServiceResponse(id: number): Promise<Responses[]> {
    let url = this.serviceRequestUrl + '/' + id + '/response';
    return this.constService.get<Responses[]>(url, 'responses');
  }

  getServiceRequestId(id: number): Promise<Request> {
    let url = this.serviceRequestUrl + '/' + id;
    return this.constService.get<Request>(url);
  }

  getServiceRequestData(id: number): Promise<ServiceRequestData[]> {
    let url = this.serviceRequestUrl + '/' + id +'/property';
    return this.constService.get<ServiceRequestData[]>(url, 'properties');
  }

  getServiceResponseId(requestId: number, responseId: number): Promise<Responses> {
    let url = this.serviceRequestUrl + '/' + requestId + '/response/' + responseId;
    return this.constService.get<Responses>(url);
  }

  putPublishServiceRequest(serviceRequest: number): Promise<Request> {
    let url = this.serviceRequestUrl + '/' + serviceRequest + '/publish';
    return this.constService.put(url, null);
  }

  putBlockServiceRequest(serviceRequest: number): Promise<Request> {
    let url = this.serviceRequestUrl + '/' + serviceRequest + '/block';
    return this.constService.put(url, null);
  }

  putServiceRequest(serviceRequest: Request): Promise<Request> {
    let url = this.serviceRequestUrl + '/' + serviceRequest.id;
    return this.constService.put<Request>(url, serviceRequest);
  }

  postServiceRequest(serviceRequest: ServiceRequest): Promise<ServiceRequest> {
    let url = this.serviceRequestUrl;
    return this.constService.post<ServiceRequest, ServiceRequest>(url, serviceRequest);
  }

  getServiceRequestConfirm(requestId: number): Promise<RequestConfirm> {
    let url = this.serviceRequestUrl + '/' + requestId + '/confirm';
    return this.constService.get<RequestConfirm>(url);
  }

  deleteServiceRequest(serviceRequest: number): Promise<EmptyAnswer> {
    let url = this.serviceRequestUrl + '/' + serviceRequest;
    return this.constService.delete(url);
  }

}
