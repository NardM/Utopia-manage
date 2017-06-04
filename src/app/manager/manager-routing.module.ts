/**
 * Created by nardm on 19.11.16.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RequestsAcceptedComponent}           from './requests/accepted/requests-accepted.component'
import {RequestsArchiveComponent} from "./requests/archive/requests-archive.component";
import {RequestsNewComponent} from "./requests/new/requests-new.component";
import {RequestsPublishedComponent} from "./requests/published/requests-published.component";
import {RegisterCompanyComponent} from "./register-company/register-company.component";
import {UserComponent} from "./manager.component";
import {FormRequestComponent} from "./form-request/form-request.component";
import {ClientComponent} from "./clients/client.component";
import {FormClientItemComponent} from "./clients/form-client/client/client.component";
import {MapsGoogleRouteDialogComponent} from "../component/dialog-maps-business/dialog-route/route.component";
import {MapsGoogleComponent} from "../component/dialog-maps-business/maps/autoGoogle.component";
import {ChatComponent} from "./chat/chat.component";

const managerRoutes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: '',
                children: [
                  { path: '', component: RequestsNewComponent },
                    { path: 'new-requests', component: RequestsNewComponent },
                    { path: 'chat', component: ChatComponent },
                    { path: 'route', component: MapsGoogleRouteDialogComponent },
                  { path: 'maps', component: MapsGoogleComponent },
                 /* { path: 'users', component: ClientComponent },
                  { path: 'user/:id', component: FormClientItemComponent },
                  { path: 'new-requests', component: RequestsNewComponent },*/
                  { path: 'published-requests', component: RequestsPublishedComponent },
                  { path: 'accepted-requests', component: RequestsAcceptedComponent },
                  { path: 'archive-requests', component: RequestsArchiveComponent },
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(managerRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ManagerRoutingModule {}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
