/**
 * Created by nardm on 19.11.16.
 */


import {AfterViewChecked, Component, Inject, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Consts} from "../../../../../const/app-const";
import {DOCUMENT} from "@angular/platform-browser";
import {ChatService, Message, Skins} from "../../chat.service";
import {ChatHub} from "../../../chatObs";
import {RequestManagerHub} from "../../../../http/hubs/RequestHub";
declare var jQuery:any;

@Component({
  selector: 'chat-business-item',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})

export class ChatItemDialogComponent implements  OnInit,AfterViewChecked {


  @Input() chatId: number = 0;
  @Input() orderId: number;
  userId: number;
  notificationsActive: boolean = true;
  chatFlag: boolean = false;
  date: Date;
  chatSkins: Skins;
  nameSkin: string;


  constructor(private router: Router,
              private hub: RequestManagerHub,
              private serviceR: ChatHub,
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

  downChatScroll: boolean = false;

  ngAfterViewChecked(){
    if (this.downChatScroll) {
      let myDiv = document.getElementById('message-list');
      myDiv.scrollTop = myDiv.scrollHeight;
      this.downChatScroll = false;
    }
  }

  newMessage(res: any) {
    debugger;
    let self = this;
    if (res.chat_id===self.chatId) {
      res.date_string = self.dateConvert(res.date);
      res.name = self.chatSkins.skins.filter(item => {
        return res.skin_id === item.skin_id
      })[0].name;
      this.chats.push(res);
      this.audio();
      this.downChatScroll = true;
    }
  }

  backStep() {
  }

  audio(){
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'assets/audio/3891d40bc61d1c.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
  }

  ngOnInit() {
    if (this.chatId != 0) {
      debugger;
      this.getChat();
    }
  }


  getChat() {
    let self = this;
    self.chatServiceL.getMessages(self.chatId)
      .then(res => {
        res.map(chat => {
          chat.date_string = self.dateConvert(chat.date);
        });
        if (res.length===0){
          self.getChatSkinsEmpty(self.chatId);
          self.chatFlag = true;
        }
        else {
          self.getChatSkins(res, self.chatId)
            .then(value => {
              self.chats = value;
              self.chatFlag = true;
              self.downChatScroll = true;
            })
        }
      });
  }

  getChatSkinsEmpty(chat_id: number){
    let self = this;
     self.chatServiceL.getChatsSkins(chat_id)
      .then(value => {
        self.chatSkins = value;
      })
  }

  getChatSkins(chat: Message[], chat_id: number): Promise<Message[]> {
    let self = this;
    return self.chatServiceL.getChatsSkins(chat_id)
      .then(value => {
        self.chatSkins = value;
        value.skins.map(res => {
          chat.map(item => {
            if (res.skin_id === item.skin_id)
              item.name = res.name;
          })
        });
        return chat;
      })
  }

  dateConvert(date: number): string {
    date+=(this.date.getTimezoneOffset()*-1)*60000;
    let date_string = new Date(date);
    if (this.date.getTime() + 720000 > date_string.getTime())
      return date_string.toLocaleTimeString()
    else
      return date_string.toLocaleString();
  }

  onKeydownChat(event) {
    debugger;
  }

  onPush() {
    debugger;
    let self = this;
    if (self.chat === null || self.chat == undefined || self.chat === "")
      return;
    let d = new Date();
    let skin_id: number = Number(localStorage['skin_id_business']);
    let name: string = self.chatSkins.skins.filter(res=>{
      return skin_id === res.skin_id
    })[0].name;
    debugger;
    let date: number =d.getTime() + (d.getTimezoneOffset()*60000);
    let chat: Message = <Message>{
      text: self.chat,
      date: date,
      skin_id: skin_id,
      name: name
    };
    self.chatServiceL.postMessages(this.chatId, chat);
    self.chat = "";
    chat.date_string = self.dateConvert(date);
    self.chats.push(chat);
    self.downChatScroll = true;
  //  this.onMessageListScrollDown();
  }


  onMessageListScrollDown() {
    debugger;
    /*jQuery('message-list').scrollTop( jQuery('message-list').scrollHeigh);*/
    let myDiv = document.getElementById('message-list');
    myDiv.scrollTop =myDiv.scrollHeight;
  }


  getAvatar(skin_id) {
    return Consts.baseURL + 'v1/account/' + skin_id + '/icon';
  }

  chats: Array<Message> = [];

  chat: string;


  onDetail() {
    this.router.navigate(['/home'])
  }
}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
