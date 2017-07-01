/**
 * Created by nardm on 19.11.16.
 */


import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import {Router} from "@angular/router";
import {Chat, ChatService, Message, Skin, Skins} from "./chat.service";
import {DOCUMENT} from "@angular/platform-browser";
import {Consts} from "../../../const/app-const";
import {ChatHub} from "../chatObs";
import { ConstService } from '../../../const/http/service-const.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'chat-item',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss']
})

export class ChatItemComponent implements  OnInit,
OnChanges,AfterContentChecked, AfterViewChecked, AfterViewInit {


  @Input() private chatID: number;
  private chat: Chat;
  private skin_id: number;
  private skin: Skin[] = [];
  private message: string;
  private date: Date;
  private totalCount: number = 0;
  private chatFlag: boolean = false;

  constructor(private router: Router,
              @Inject(DOCUMENT) private document: Document,
              private serviceR: ChatHub,
              private service: ConstService,
              private chatServiceL: ChatService) {
    let self = this;
    self.serviceR.createObserver()
        .subscribe(res => {
              self.newMessage(res.item)
            }
        );
    this.message = "";
    this.date = new Date();
  }

  @ViewChild("message_list")
  private message_list: ElementRef;

  ngOnInit() {
  }



  getSkin(chat: Chat, chatID: number): Promise<any> {
    let self = this;
    self.skin = [];
    return self.chatServiceL.getSkin(chatID)
        .then((value: Skin[]) => {
          let skins = Observable.create((observer: Observer<Skin>) => {
            self.skin_id = value.find(res=> res.role === 3).skin_id;
            value.map(res => {
              if (res.icon_hash) {
                self.service.getAvatar(`manage/v1/skin/${res.skin_id}/icon`)
                    .subscribe(r => {
                      res.logo = r;
                      observer.next(res);
                    });
              }
              else {
                observer.next(res);
              }
            });
          });
          skins.forEach(res => {
            chat.messages.map(item => {
              if (res.skin_id === item.skin_id) {
                item.name = res.name;
                item.logo = res.logo;
              }
            });
          });
          skins.forEach(res => {
            self.skin = value;
            self.chat = chat;
            self.chatFlag = true;
          })
        })
  }

  getChat(chatID: number): void {
    let self = this;
    self.chatServiceL.getChat(chatID)
        .then(res => {
          self.totalCount = res.messages_total_count;
          if (res.messages_total_count > 0) {
            res.messages.map(item => {
              item.date_string = self.dateConvert(item.date);
            });
            self.getSkin(res, chatID);
          }
          else {
            self.skin = [];
            self.chatServiceL.getSkin(chatID)
                .then((value: Skin[]) => {
                  let skins: Skin[] = Observable.create((observer: Observer<Skin>) => {
                    value.map(res => {
                      if (res.icon_hash){
                        self.service.getAvatar(`manage/v1/skin/${res.skin_id}/icon`)
                            .subscribe(r => {
                              res.logo = r;
                              observer.next(res);
                            });
                      }
                      else{
                        observer.next(res);
                      }

                    });
                  });
                  skins.forEach(res => {
                    self.skin.push(res);
                  });
                  self.skin_id = skins.find(res=> res.role === 3 ).skin_id;
                });
            self.chat = res;
            self.chatFlag = true;
          }
          self.downChatScroll = true;
        })
  }


  getMessages(): void {
    let self = this;
    self.chatServiceL.getChatMessage(self.chatID, 20, 20)
  }


  ngOnChanges() {
    let self = this;
    if (self.chatID) {
      self.chat = undefined;
      self.chatFlag = false;
      self.getChat(self.chatID);
    }
    if (self.message_list) {
      //let myDiv = document.getElementById('message-list');
      self.message_list.nativeElement.scrollTop = 99999999;
    }
  }

  onPush(): void {
    debugger;
    if (this.message === null || this.message == undefined || this.message === "")
      return;
    let self = this;
    let d = new Date();
    self.skin_id = self.skin.find(res=> res.role === 3 ).skin_id;
    let name: string = self.skin.filter(res => {
      return self.skin_id === res.skin_id
    })[0].name;
    let date: number = d.getTime();
    let chat: Message = <Message>{
      chat_id: self.chatID,
      text: self.message,
      date: date,
      skin_id: self.skin_id,
      name: name
    };
    chat.logo = self.skin.find(res => res.skin_id === self.skin_id).logo;
    chat.date_string = self.dateConvert(date);
    self.message = "";
    self.chatServiceL.postMessages(self.chatID, chat)
        .then(res => {
          self.chat.messages.push(chat);
          self.downChatScroll = true;
        });
  }


  newMessage(res: Message): void {
    debugger;
    let self = this;
    if (res.chat_id === self.chatID) {
      res.date_string = self.dateConvert(res.date);
      res.name = self.skin.filter(item => {
        return res.skin_id === item.skin_id
      })[0].name;
      res.logo = self.skin.find(item=> item.skin_id ===res.skin_id).logo;
      self.chat.messages.push(res);
      self.audioNotification();
      self.downChatScroll = true;
    }
  }

  dateConvert(date: number): string {
    let date_string = new Date(date);
    if (this.date.getTime() + 720000 > date_string.getTime())
      return date_string.toLocaleTimeString();
    else
      return date_string.toLocaleString();
  }


  getAvatar(skin_id): string {
    return Consts.baseURL + 'v1/account/' + skin_id + '/icon';
  }

  private downChatScroll: boolean = false;

  audioNotification(): void {
    let audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'assets/audio/newMessage.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
  }

  ngAfterViewInit() {

  }

  ngAfterViewChecked() {
    let self = this;
    if (this.downChatScroll) {
      if (self.message_list) {
        self.message_list.nativeElement.scrollTop = self.message_list.nativeElement.scrollHeight;
        self.downChatScroll = false;
      }
    }
  }

  ngAfterContentChecked() {

  }

  onDetail(): void {
    this.router.navigate(['/home'])
  }
}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
