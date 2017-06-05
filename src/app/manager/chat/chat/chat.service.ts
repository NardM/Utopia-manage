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
import {RequestManagerHub} from "../../http/hubs/RequestHub";
import {ServiceRequestInterface} from "../../model/service-request";
import Request = ServiceRequestInterface.Request;
import {BasketRequestInterface} from "../Model/BasketRequest";
import BasketRequest = BasketRequestInterface.BasketRequest;
import RequestI = BasketRequestInterface.Request;
import {EmptyAnswer} from "../../model/Answer";

@Injectable()
export class ChatService {

  constructor(private constService: ConstService,
              public snackBar: MdSnackBar,
              private router: Router,
              public dialog: MdDialog,
              private hub: RequestManagerHub) {
  }


  getBaskets() {
    let url = `${Consts.baseURL}v1/manager/basket/request`;
    return this.constService.get<BasketRequest>(url);
  }

  postRequestTake(requestID: number) {
    let url = `${Consts.baseURL}v1/manager/request/${requestID}`;
    return this.constService.postSingle<EmptyAnswer>(url);
  }

  getRequestTake(requestID: number) {
    let url = `${Consts.baseURL}v1/manager/request/${requestID}`;
    return this.constService.get<BasketRequest>(url);
  }

  getRequestsTake() {
    let url = `${Consts.baseURL}v1/manager/request`;
    return this.constService.get<BasketRequest>(url);
  }

  getChatMessage(chatID: number, count: number, offset: number) {
    let url = `${Consts.baseURL}/manage/v1/chat/${chatID}/message`;
    return this.constService.get<Message[]>(url);
  }

  getChat(chatID: number) {
    let url = `${Consts.baseURL}/manage/v1/chat/${chatID}`;
    return this.constService.get<Chat>(url);
  }

  postMessages(chatID: number, message: Message): Promise<Message> {
    let url = `${Consts.baseURL}/manage/v1/chat/${chatID}/message`;
    return this.constService.post<Message>(url, message);
  }

  getSkin(skinID: number) {
    let url = `${Consts.baseURL}/manage/v1/skin/${skinID}`;
    return this.constService.get<Skins>(url);
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
}
export interface Chat {
  request_id: number;
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
  id: number;
  icon_hash: number;
  name: string;
  type: number;
}

export interface Skins {
  skins: Skin[];
}


