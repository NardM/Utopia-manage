/**
 * Created by nardm on 19.11.16.
 */


import {
  AfterViewChecked, Component, EventEmitter, Inject, Input, OnInit,
  Output
} from "@angular/core";
import {Router} from "@angular/router";
import {Consts} from "../../../../../const/app-const";
import {DOCUMENT} from "@angular/platform-browser";
import { ChatService, Message, Skin, Skins } from "../../chat.service";
import {ChatHub} from "../../../chatObs";
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ConstService } from '../../../../../const/http/service-const.service';
declare var jQuery:any;

@Component({
  selector: 'chat-item-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})

export class ChatItemDialogComponent implements  OnInit,AfterViewChecked {


  @Input() private chatId: number = 0;
  private userId: number;
  private notificationsActive: boolean = true;
  private chatFlag: boolean = false;
  private date: Date;
  private chatSkins: Skin[] = [];
  private nameSkin: string;
  private skin_id: number;
  @Output() close = new EventEmitter();

  constructor(private router: Router,
              private serviceR: ChatHub,
              private service: ConstService,
              @Inject(DOCUMENT) private document: Document,
              private chatServiceL: ChatService) {
    let self = this;
    self.serviceR.createObserver()
      .subscribe(res => {
          if (res.chat_id === self.chatId)
            self.newMessage(res)
        }
      );
    this.chat = "";
    this.date = new Date();
  }

  private downChatScroll: boolean = false;


  onClose(){
    this.close.emit();
  }

  ngAfterViewChecked(){
    if (this.downChatScroll) {
      let myDiv = document.getElementById('message-list');
      myDiv.scrollTop = myDiv.scrollHeight;
      this.downChatScroll = false;
    }
  }

  newMessage(res: Message): void {
    debugger;
    let self = this;
    if (res.chat_id===self.chatId) {
      res.logo = self.chatSkins.find(item=> item.skin_id === self.skin_id).logo;
      res.date_string = self.dateConvert(res.date);
      res.name = self.chatSkins.filter(item => {
        return res.skin_id === item.skin_id
      })[0].name;
      this.chats.push(res);
      this.audio();
      this.downChatScroll = true;
    }
  }


  audio(): void{
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'assets/audio/3891d40bc61d1c.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
  }

  ngOnInit() {
    if (this.chatId != 0) {
      this.getChat();
    }
  }


  getChat(): void {
    let self = this;
    self.chatServiceL.getChat(self.chatId)
      .then(res => {
        res.messages.map(chat => {
          chat.date_string = self.dateConvert(chat.date);
        });
        if (res.messages_total_count===0){
          self.getChatSkinsEmpty(self.chatId);
        }
        else {
          self.getChatSkins(res.messages, self.chatId)
        }
      });
  }

  getChatSkinsEmpty(chat_id: number) {
    let self = this;
    return self.chatServiceL.getSkin(chat_id)
        .then(value => {
          let skins: Skin[] = Observable.create((observer: Observer<Skin>) => {
            value.map(res => {
              self.service.getAvatar(`manage/v1/skin/${res.skin_id}/icon`)
                  .subscribe(r => {
                    res.logo = r;
                    observer.next(res);
                  });
            });
          });
          skins.forEach(res => {
            self.chatSkins.push(res);
          });
          self.chatFlag = true
        })
  }

  getChatSkins(chat: Message[], chat_id: number): Promise<Message[]> {
    let self = this;
    return self.chatServiceL.getSkin(chat_id)
      .then(value => {
        let skins: Skin[] = Observable.create((observer: Observer<Skin>) => {
          value.map(res => {
            self.service.getAvatar(`manage/v1/skin/${res.skin_id}/icon`)
                .subscribe(r => {
                  res.logo = r;
                  observer.next(res);
                });
          });
        });
        skins.forEach(res => {
          chat.map(item => {
            if (res.skin_id === item.skin_id) {
              item.name = res.name;
              item.logo = res.logo;
            }
          })
        });
        skins.forEach(() => {
          debugger;
          self.chatSkins = value;
          self.chats = chat;
          self.chatFlag = true;
          self.downChatScroll = true
        });
        self.skin_id = skins.find(res=> res.role === 3 ).skin_id;
        return chat;
      })
  }

  dateConvert(date: number): string {
    let date_string = new Date(date);
    if (this.date.getTime() + 720000 > date_string.getTime())
      return date_string.toLocaleTimeString();
    else
      return date_string.toLocaleString();
  }


  onPush(): void {
    debugger;
    let self = this;
    if (self.chat === null || self.chat == undefined || self.chat === "")
      return;
    self.skin_id = self.chatSkins.find(res=> res.role === 3 ).skin_id;
    let d = new Date();
    let name: string = self.chatSkins.filter(res=>{
      return self.skin_id === res.skin_id
    })[0].name;
    debugger;
    let date: number =d.getTime() ;
    let chat: Message = <Message>{
      text: self.chat,
      date: date,
      skin_id: self.skin_id,
      name: name
    };
    self.chatServiceL.postMessages(this.chatId, chat);
    self.chat = "";
    chat.date_string = self.dateConvert(date);
    self.chats.push(chat);
    chat.logo = self.chatSkins.find(res => res.skin_id === self.skin_id).logo;

    self.downChatScroll = true;
  //  this.onMessageListScrollDown();
  }


  onMessageListScrollDown(): void {
    debugger;
    /*jQuery('message-list').scrollTop( jQuery('message-list').scrollHeigh);*/
    let myDiv = document.getElementById('message-list');
    myDiv.scrollTop =myDiv.scrollHeight;
  }


  private chats: Array<Message> = [];

  private chat: string;

}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
