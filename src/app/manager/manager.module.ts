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
import { ClientService } from './http/client.service';
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
import {LeftBarComponent} from "./theme/left-bar/left-bar.component";
import {CarouselModule, Ng2BootstrapModule} from "ngx-bootstrap";
import {SelectModule} from 'ng2-select'
import {TopBarComponent} from "./theme/top-bar/top-bar.component";
import { ServiceRequestStore, ServiceTaskStore } from "./http/request";
import {MapsGoogleRouteDialogComponent} from "../component/dialog-maps-business/dialog-route/route.component";
import {MapsGoogleComponent} from "../component/dialog-maps-business/maps/autoGoogle.component";
import {AgmCoreModule} from "angular2-google-maps/core";
import {ImagePopupModule} from "../component/angular2-image-popup/angular2-image-popup.modal";
import {ItemConfirmComponent} from "./form-response/response-confirm/response-confirm.component";
import {ChatService} from "./chat/chat/chat.service";
import {ChatItemComponent} from "./chat/chat/chat.component";
import {ChatComponent} from "./chat/chat.component";
import {ChatHub} from "./chat/chatObs";
import {RequestListComponent} from "./chat/request-list/request-list.component";
import {GlobalState} from "./global.state";
import {RequestItemMiniComponent} from "./chat/request-list/request-item-mini/request-item-mini.component";
import {RequestItemComponent} from "./chat/request-list/reqiest-item/request-item.component";
import {BaThemeSpinner} from "../service/baThemeSpinner.service";
import {CoolInfiniteGridComponent} from "../component/infinity-scroll/infinite-grid.component";
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { LoadScrollComponent } from '../component/load-scroll/load-scroll.component';
import { ChatDialogComponent } from './chat/chat/chat-dialog/chat.component';
import { ChatItemDialogComponent } from './chat/chat/chat-dialog/chat-dialog/chat-dialog.component';
import { TaskComponent } from './chat/task/task.component';
import { TaskBookmarkComponent } from './chat/task/task-bookmark/task-bookmark.component';
import { PersonComponent } from './form-request/person/person.component';


@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule,
    CommonModule,
      SelectModule,
    Ng2BootstrapModule.forRoot(),
    ManagerRoutingModule,
      CarouselModule,
    ImagePopupModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCxiuwoUIExQq3LaN5Kj-vNBDeyus6-t7U",
      libraries: ["geometry","places"],
      region: 'ru'
    }),
    InfiniteScrollModule,
    MaterialModule,
    VirtualScrollModule
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
    FormResponseComponent,
    LeftBarComponent,
    TopBarComponent,
    MapsGoogleRouteDialogComponent,
    MapsGoogleComponent,
    ItemConfirmComponent,
    ChatItemComponent,
    ChatItemDialogComponent,
    ChatDialogComponent,
    ChatComponent,
    RequestListComponent,
    RequestItemMiniComponent,
    RequestItemComponent,
    CoolInfiniteGridComponent,
    LoadScrollComponent,
    TaskComponent,
    TaskBookmarkComponent,
    PersonComponent

  ],
  entryComponents: [
    DialogClient
  ],
  providers: [
    ClientService,
    UserService,
    CategoryService,
    ServiceRequestStore,
    ChatService,
    ChatHub,
    GlobalState,
    BaThemeSpinner,
    ServiceTaskStore
  ],
  exports: []

})
export class ManagerModule {}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
