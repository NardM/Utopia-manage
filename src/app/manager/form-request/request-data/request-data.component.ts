/**
 * Created by nardm on 07.11.16.
 */
import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { Router }            from '@angular/router';

import {CategoryService} from "../../manage/category/http/category.service";
import {ServiceResponsesInterface} from "../model/service-responses";
import {ClientService} from "../clients/http/client.service";
import {RequestConfirmInterface} from "../model/service-requests-confirm";
import {ServiceRequestInterface} from "../model/service-requests";
import {Consts} from "../../../const/app-const";
import ServiceRequestData = ServiceRequestDataInterface.ServiceRequestData;
import {ServiceRequestDataInterface} from "../../model/service-request-data";
import {UserService} from "../../http/user.service";
import {PropertyInterface} from "../../model/property";
import Property = PropertyInterface.Property;
import {MdDialog, MdDialogConfig} from "@angular/material";
import {ConstService} from "../../../const/http/service-const.service";
import {MapsGoogleRouteDialogComponent} from "../../../component/dialog-maps-business/dialog-route/route.component";
import {MapsGoogleComponent} from "../../../component/dialog-maps-business/maps/autoGoogle.component";
import { ChatService } from '../../chat/chat/chat.service';



@Component({
    selector: 'data-request',
    templateUrl: 'request-data.component.html',
    styleUrls: ['request-data.component.scss'],
})
export class RequestDataComponent implements OnInit, OnChanges {

  constructor(private router: Router,
              private serviceConst: ConstService,
              public dialog: MdDialog,
              private chatService: ChatService,
              private userService: UserService) {
  this.date = new Date();
  }


  ngOnInit(): void {

  }

  @Input() public requestId: number;
  @Input() public numberRequest: number = 0;
  @Input() public chatBool: boolean = false;
  @Output() public deleteRequest = new EventEmitter();
  public orderData: ServiceRequestData[];
  public orderDetailFlag: boolean = false;
  public chat_id: number = 0;
  public openImage: boolean = false;
  public errorPostResponse: boolean = false;
  public date: Date;
  public dateAccess: number;
  public dateAccessDate: number;

  ngOnChanges() {
    if (this.requestId) {
      this.getOrderData();
    }
  }

  private onPublishRequest(): void {
    this.chatService.postRequestTake(this.requestId)
        .then(item=>{
          this.userService.putPublishServiceRequest(item.data.id)
              .then(res => this.deleteRequest.emit(this.requestId))
        });
  }

  private onDeniedRequest(): void {
    this.chatService.postRequestTake(this.requestId)
        .then(item=> {
          this.userService.putBlockServiceRequest(item.data.id)
              .then(res => this.deleteRequest.emit(this.requestId))
        });
  }

  private convertDateInString(date: number): string {
    let d = new Date(date);
    return d.toLocaleDateString();
  }

  private convertDateTimeInString(date: number): string {
    let d = new Date(date);
    let result = d.toLocaleString('ru');
    return result;
  }

  private getPropertyIcon(property_id: number): string {
    return Consts.baseURL + '/v1/property/' + property_id + '/icon';
  }

  public openModalWindow: boolean = false;
  public imagePointer: number;
  public images: Array<{ thumb: string, img: string, description: string }> = [];

  private  OpenImageModel(ind: number): void {
    //alert('OpenImages');
    this.imagePointer = ind;
    this.openModalWindow = true; ///TODO из-за чата баг
  }


  private cancelImageModel(): void {
    this.openModalWindow = false;
  }

  ///


  public selectSlide(index: number): void {
    this.activeSlideIndex = index;
  }

  public removeSlide(index?: number): void {
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
  }

  public myInterval: number = 5000;
  public noWrapSlides: boolean = false;
  public slides: any[] = [];
  public activeSlideIndex: number;
  private imageFlag: boolean = false;

  public addSlide(imageId: number): void {
    if (imageId != 0)
      this.serviceConst.getAvatar("manage/v1/request/photo/" + imageId)
          .subscribe(res => {
            this.slides.push({
              image: res,
            });
            this.images.push(
                {
                  thumb: res,
                  img: res,
                  description: 'image'
                }
            )
          });
  }

  private getOrderData(): void {
    let options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    let optionsTime = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    this.userService.getServiceRequestData(this.requestId)
        .then(res => {
          this.orderData = res;
          let bool: boolean = false;
          res.map(image => {
            if (image.type == 2) {
              image.text = image.bool ? "Да" : "Нет";
            }
            if (image.type == 5) {
              image.text = new Date(image.date + ((this.date.getTimezoneOffset() * 60000) * -1))
                  .toLocaleDateString('ru', options);
            }
            if (image.type == 6) {
              image.text = new Date(image.date_time + ((this.date.getTimezoneOffset() * 60000) * -1))
                  .toLocaleString('ru', optionsTime);
            }
            if (image.type == 8) {
              if (image.images) {
                this.imageFlag = true;
                for (let i = 0; i < image.images.length; i++) {
                  this.addSlide(image.images[i]);
                  bool = true;
                }
              }
            }
            if (image.type == 9) {
              image.text = "";
              image.selected.map(item => {
                image.text += (item.value + ", ")
              });
              image.text = image.text.substr(0, image.text.length - 2);
            }
            if (image.type == 10) {
              image.text = (Math.ceil(image.route.distance / 1000)).toString() + ' км';
            }
          });
          if (!bool) {
            this.addSlide(0);
          }
          this.openImage = true;
          this.orderDetailFlag = true;
        });
  }

  public postOrderBool: boolean = false;


  private onMaps(address): void {
    let option: MdDialogConfig = new MdDialogConfig();
    option.disableClose = false;
    option.height = '450px';
    option.width = '700px';
    option.data = address;
    debugger;
    let dialogRef = this.dialog.open(MapsGoogleComponent, option);
  }


  private onRoute(route): void {
    let option: MdDialogConfig = new MdDialogConfig();
    option.disableClose = false;
    option.height = '600px';
    option.width = '700px';
    option.data = route;
    let dialogRef = this.dialog.open(MapsGoogleRouteDialogComponent, option);
  }


  private getServicePhoto(requestId: number): string {
    return 'http://smartapi.ru/v1/manage/requests/photo/' + requestId;
  }


}


