/**
 * Created by nardm on 18.04.17.
 */
import {Component, Inject, OnInit} from "@angular/core";
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {ChatService} from "../chat.service";


@Component({
  selector: 'char-dialog',
  template: `
  <chat-item *ngIf="chatId" [orderId]="orderId"  [chatId]="chatId"></chat-item>
  `,
  styles:[ `` ]
})
export class ChatDialogComponent implements OnInit {
  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialogRef: MdDialogRef<ChatDialogComponent>,
              public service: ChatService) {
  }

  chatId: number;
  orderId: number;

  ngOnInit() {
    let self = this;
    debugger;
    self.orderId = self.data.id;
    debugger;
    if (self.data.chat_id === null || self.data.chat_id === 0 ||
      self.data.chat_id === undefined) {
      self.service.createChat(self.data.id)
        .then(res => {
          self.chatId = res.data.id;
        })
    }
    else {
      self.chatId = self.data.chat_id;
    }
  }

}
