/**
 * Created by nardm on 15.02.17.
 */
/**
 * Created by nardm on 13.01.17.
 */
import {Injectable} from "@angular/core";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import {MdDialog, MdSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {ConstService} from "../../../const/http/service-const.service";
import {Consts} from "../../../const/app-const";
import {ServiceRequestInterface} from "../../model/service-request";
import Request = ServiceRequestInterface.Request;
import {BasketRequestInterface} from "../Model/BasketRequest";
import BasketRequest = BasketRequestInterface.BasketRequest;
import RequestI = BasketRequestInterface.Request;
import {EmptyAnswer} from "../../model/Answer";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {

  constructor(private constService: ConstService,
              public snackBar: MdSnackBar,
              private router: Router,
              public dialog: MdDialog) {
  }


  getBaskets(taskType: number, count: number, offset: number): Promise<BasketRequest> {
    let url = `${Consts.baseURL}v1/manager/basket/request?count=${count}&offset=${offset}&task_type_filter=${taskType}`;
    return this.constService.get<BasketRequest>(url);
  }

  postRequestTake(requestID: number): Promise<EmptyAnswer> {
    let url = `${Consts.baseURL}v1/manager/request/${requestID}`;
    return this.constService.postSingle<EmptyAnswer>(url);
  }

  postTaskComplete(requestID: number, taskID: number): Promise<EmptyAnswer> {
    let url = `${Consts.baseURL}v1/manager/request/${requestID}/task/${taskID}/complete`;
    return this.constService.postSingle<EmptyAnswer>(url);
  }

  createOrderChat(companyID: number, orderID: number): Promise<EmptyAnswer> {
    let url = `${Consts.baseURL}v1/manager/company/${companyID}/service/order/${orderID}/chat`;
    return this.constService.postSingle<EmptyAnswer>(url);
  }

  deleteRequestInBasket(requestID: number): Promise<EmptyAnswer> {
    let url = `${Consts.baseURL}v1/manager/basket/request/${requestID}`;
    return this.constService.postSingle<EmptyAnswer>(url);
  }

  getRequestTake(requestID: number): Promise<BasketRequest> {
    let url = `${Consts.baseURL}v1/manager/request/${requestID}`;
    return this.constService.get<BasketRequest>(url);
  }

  getRequestsTake(taskStatus: number, taskType, status_filter?: number): Promise<BasketRequest> {
    let url;
    url = `${Consts.baseURL}v1/manager/request?task_status_filter=${taskStatus}&task_type_filter=${taskType}`;
    if (status_filter){
      url = `${Consts.baseURL}v1/manager/request?status_filter=${status_filter}&task_status_filter=${taskStatus}&task_type_filter=${taskType}`;
    }
    return this.constService.get<BasketRequest>(url);
  }

  getChatMessage(chatID: number, count: number, offset: number): Promise<Message[]> {
    let url = `${Consts.baseURL}manage/v1/chat/${chatID}/message`;
    return this.constService.get<Message[]>(url);
  }

  getChat(chatID: number): Promise<Chat> {
    let url = `${Consts.baseURL}manage/v1/chat/${chatID}`;
    return this.constService.get<Chat>(url);
  }

  postMessages(chatID: number, message: Message): Promise<Message> {
    let url = `${Consts.baseURL}manage/v1/chat/${chatID}/message`;
    return this.constService.post<Message, Message>(url, message);
  }

  getSkin(chatID: number): Promise<Skin[]> {
    let url = `${Consts.baseURL}v1/chat/${chatID}/skin`;
    return this.constService.get<Skin[]>(url, 'skins');
  }

  createChat(companyID: number, orderID: number): Promise<Chat> {
    let url = `${Consts.baseURL}v1/manager/company/${companyID}/service/order/${orderID}`;
    return this.constService.postSingle<Chat>(url);
  }


  getRequestQuestions(requestID: number): Promise<Questions>{
    let url = `${Consts.baseURL}v1/manager/request/${requestID}/questions`;
    return this.constService.get<Questions>(url);
    }

}

export interface Message {
  id: number;
  skin_id: number;
  chat_id: number;
  text: string;
  name: string;
  date_string: string;
  date: number;
  logo: string;
}

export interface Chat {
  messages: Message[];
  messages_total_count: number;
  skins: Skins;
  id: number;
  active: boolean;
  name: string;
  status: number;
}

export interface Chats {
  total_count: number;
  chats: Chat[];
}

export interface Skin {
  role: number;
  icon_hash: string;
  skin_id: number;
  name: string;
  logo: string;
}

export interface Skins {
  skins: Skin[];
}


export interface Question {
  id: number;
  request_id: number;
  chat_id: number;
  company_id: number;
  company_name: string;
  active_chat: boolean;
}

export interface Questions {
  questions: Question[];
}
