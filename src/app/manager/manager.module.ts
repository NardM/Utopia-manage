/**
 * Created by nardm on 19.11.16.
 */
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import {ManagerRoutingModule}     from './manager-routing.module'
import {UserComponent} from "./manager.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JsonpModule, HttpModule} from "@angular/http";
import {RequestsAcceptedComponent}           from './requests/accepted/requests-accepted.component'
import {RequestsArchiveComponent} from "./requests/archive/requests-archive.component";
import {RequestsNewComponent} from "./requests/new/requests-new.component";
import {RequestsPublishedComponent} from "./requests/published/requests-published.component";
import { ClientService } from './clients/http/client.service';
import {FormRequestComponent} from "./form-request/form-request.component";
import {ClientComponent} from "./clients/client.component";
import {FormClientComponent} from "./clients/form-client/form-client.component";
import {UserService} from "./http/user.service";
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import {RequestDataComponent} from "./form-request/request-data/request-data.component";
import {FormClientItemComponent, DialogClient} from "./clients/form-client/client/client.component";
import {MaterialModule} from "@angular/material";
import {FormResponseComponent} from "./form-response/form-response.component";
import {CategoryService} from "./http/category.service";

@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule,
    CommonModule,
    ManagerRoutingModule,
    InfiniteScrollModule,
    MaterialModule,
  ],
  declarations: [
    DialogClient,
    UserComponent,
    RequestsAcceptedComponent,
    RequestsArchiveComponent,
    RequestsNewComponent,
    RequestsPublishedComponent,
    FormRequestComponent,
    ClientComponent,
    FormClientComponent,
    RequestDataComponent,
    FormClientItemComponent,
    FormResponseComponent

  ],
  entryComponents: [
    DialogClient
  ],
  providers: [ClientService,
    UserService,
    CategoryService],
  exports: []

})
export class ManagerModule {}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
