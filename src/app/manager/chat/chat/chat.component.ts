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
import {Chat, ChatService, Message} from "./chat.service";
import {DOCUMENT} from "@angular/platform-browser";
import {Consts} from "../../../const/app-const";

@Component({
  selector: 'chat-item',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss']
})

export class ChatItemComponent implements  OnInit,
OnChanges,AfterContentChecked, AfterViewChecked, AfterViewInit {


  @Input() chatMessage: Chat;
  @Output() chatMessageOutput = new EventEmitter<Message>();
  skin_id: number;
  chat_id: number=0;
  date: Date;

  constructor(private router: Router,
              @Inject(DOCUMENT) private document: Document,
              private chatServiceL: ChatService) {
    this.skin_id = Number(localStorage['skin_id_business']);
    this.chat = "";
    this.date = new Date();
  }

  @ViewChild("message_list")
  message_list: ElementRef;

  ngOnInit() {
    debugger;
  }

  ngOnChanges() {
    let self = this;
    if (self.message_list) {
      //let myDiv = document.getElementById('message-list');
      self.message_list.nativeElement.scrollTop = 99999999;
    }
  }

  onPush() {
    debugger;
    if (this.chat === null || this.chat == undefined || this.chat === "")
      return;
    let self = this;
    let d = new Date();
    let skin_id: number = Number(localStorage['skin_id_business']);
    let name: string = self.chatMessage.skins.skins.filter(res=>{
      return skin_id === res.skin_id
    })[0].name;
    let date: number =d.getTime() + (d.getTimezoneOffset()*60000);
    let chat: Message = <Message>{
      chat_id: self.chatMessage.id,
      text: self.chat,
      date: date,
      skin_id: self.skin_id,
      name: name
    };
    self.chatServiceL.postMessages(self.chatMessage.id, chat);
    chat.date_string = self.dateConvert(date);
    self.chat = "";
    self.chatMessageOutput.emit(chat);
    self.downChatScroll = true;
  }

  dateConvert(date: number): string {
    date+=(this.date.getTimezoneOffset()*-1)*60000;
    let date_string = new Date(date);
    if (this.date.getTime() + 720000 > date_string.getTime())
      return date_string.toLocaleTimeString();
    else
      return date_string.toLocaleString();
  }


  getAvatar(skin_id) {
    return Consts.baseURL + 'v1/account/' + skin_id + '/icon';
  }

  downChatScroll: boolean = false;

  chat: string;

  ngAfterViewInit() {

  }

  ngAfterViewChecked() {
    let self = this;
    if (this.downChatScroll) {
      if (self.message_list) {
        self.message_list.nativeElement.scrollTop = self.message_list.nativeElement.scrollHeight;
      }
    }
  }

  ngAfterContentChecked() {

  }

  onDetail() {
    this.router.navigate(['/home'])
  }
}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
