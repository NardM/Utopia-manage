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

@Injectable()
export class UserService {

    private requestUrl = Consts.baseURL + 'manage/v1/request';

    constructor(private constService: ConstService) {
    }




}
