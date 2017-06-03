/**
 * Created by nardm on 12.03.17.
 */
/**
 * Created by nardm on 12.01.17.
 */
/**
 * Created by nardm on 19.11.16.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {JsonpModule, HttpModule} from "@angular/http";
import {ImageModal} from "./image-modal-popup";


@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [
    ImageModal,
  ],

  providers: [
  ],
  exports: [ImageModal,
  ]
})
export class ImagePopupModule {}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
