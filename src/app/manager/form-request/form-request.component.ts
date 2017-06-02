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
    this.getCategories();
    // this.getCategoryId(this.requestServices.category_id);
    this.getClient(this.requestServices.user_id);
    if (this.numberRequest == 3) this.getServiceRequestConfirm();
    if (!this.openImage)
      this.getRequestData();
  }

  @Input() requestServices;
  @Input() numberRequest: number;
  @Output() deleteRequest = new EventEmitter();
  categoryName: string;
  buttonOpen: boolean = true;
  editBool: boolean = true;
  categoryArray: Array<{text: string, id: number}> = [];
  responseCompany: Responses;
  requestConfirm: RequestConfirm;
  userPhone: string = "";
  openRequestData: boolean = false;
  requestData: ServiceRequestData[];
  openImage: boolean = false;
  /////
  public myInterval: number = 0;
  public noWrapSlides: boolean = false;
  public slides: any[] = [];

  public addSlide(imageId: number): void {
    if (imageId != 0) {
      this.slides.push({
        image: `//smartapi.ru/api/manage/v1/request/photo/${imageId}`,
      });
    }
  }

  public removeSlide(index: number): void {
    this.slides.splice(index, 1);
  }

  /////

  getPropertyIcon(propertyId: number){
    return Consts.baseURL + '/manage/v1/property/' + propertyId + '/icon';

  }
  getRequestData() {
    this.userService.getServiceRequestData(this.requestServices.id)
      .then(res => {
        let bool: boolean = false;
        res.map(image => {
          if (image.type == 8) {
            if (image.images) {
              for (let i = 0; i < image.images.length; i++) {
                this.addSlide(image.images[i]);
                bool = true;
              }
            }
            res = res.filter(r => r!==image);
          }
          if (image.type ==5){
            image.text = new Date(image.date).toLocaleDateString();
          }
          if (image.type ==6){
            image.text = new Date(image.date_time).toLocaleString('ru');
          }
        });
        if (!bool) {
          this.addSlide(0);
        }
        this.requestData = res;
        this.openImage = true;
      });
  }

  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;
  private boolSelect = false;

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    this.boolSelect = !!value;
    console.log('Selected value is: ', value.id);
  }

  public removed(value: any): void {
    this.boolSelect = false;
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
    this.categoryName = value.text;
    this.requestServices.category_id = value.id;
    console.log(this.value);
  }

  constructor(private categoryService: CategoryService,
              private userService: UserService,
              private router: Router,
              private clientService: ClientService) {
  }

  getCategoryId(id: number) {
    this.categoryService.getCategory(id)
      .then(categoryName => this.categoryName = categoryName.name)
  }

  deleteServiceRequest(requestServices: Request) {
    let bool = confirm('Вы уверены, что хотите удалить заявку?');
    if (bool) {
    this.userService.deleteServiceRequest(requestServices.id);
    this.deleteRequest.emit(requestServices);
  }
  }

  getCategories() {
    this.categoryService.getCategories()
      .then(categories => {
        categories.map(category => {
          this.categoryArray.push({text: category.name, id: category.id});
          if (category.id == this.requestServices.category_id)
            this.categoryName = category.name;
        })
      });
  }

  getClient(userId: number) {
    this.clientService.getClient(userId).then(res => this.userPhone = res.phone);
  }

  putPublishServiceRequest() {
    this.userService.putPublishServiceRequest(this.requestServices.id);
    this.buttonOpen = !this.buttonOpen;
  }

  putServiceRequest() {
    this.userService.putServiceRequest(this.requestServices);
    this.editBool = !this.editBool;
  }

  getServiceRequestConfirm() {
    this.userService.getServiceRequestConfirm(this.requestServices.id)
      .then(res => {
        this.requestConfirm = res;
        this.userService.getServiceResponseId(this.requestServices.id, res.response_id)
          .then(res => this.responseCompany);
      });
  }

}


