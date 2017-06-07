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

  private chatId: number;
  private orderId: number;

  ngOnInit() {
    let self = this;
    debugger;
    self.orderId = self.data.id;
  }

}
