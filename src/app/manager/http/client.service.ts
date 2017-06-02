/**
 * Created by nardm on 07.11.16.
 */
import { Observable } from "rxjs/Observable";
import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {ClientInterface} from "../clients/model/client";
import Clients = ClientInterface.Client;
import Account= ClientInterface.Account;
import {Consts} from "../../const/app-const";
import {ConstService} from "../../const/http/service-const.service";
import {UserBlock} from "../clients/form-client/client/client.component";

@Injectable()
export class ClientService {


  private clientsUrl = Consts.baseURL + 'manage/v1/account';  // URL to web api
  private clientUrl = Consts.baseURL + 'manage/v1/account/';  // URL to web api

  constructor(private constService: ConstService) {
  }

  getClients(offset?: number) {
    let url = this.clientsUrl+'?count=100&offset='+offset;
    return this.constService.get<Account[]>(url, 'accounts');
  }


  getClient(id: number) {
    let url = this.clientsUrl + '/' + id;
    return this.constService.get<Account>(url);
  }

  blockAccount(userId: number, rezon: string) {
    let url = this.clientsUrl + '/' + userId +'/block';
    return this.constService.post(url, rezon);
  }

  getBlockAccount(userId: number) {
    let url = this.clientsUrl + '/' + userId +'/block';
    return this.constService.get<UserBlock>(url);
  }

  OnblockAccount(userId: number, rezon: string) {
    let url = this.clientsUrl + '/' + userId +'/block';
    return this.constService.delete(url);
  }

}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
