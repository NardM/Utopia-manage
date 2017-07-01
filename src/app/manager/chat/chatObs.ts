/**
 * Created by nardm on 03.02.17.
 */
/**
 * Created by nardm on 17.11.16.
 */
import {Injectable} from "@angular/core";

import "rxjs/add/operator/toPromise";
import {Observable, Observer} from "rxjs";
import {RequestGetInterface, RequestInterface} from "../../models/Request";
import {MdDialog, MdDialogConfig, MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {Message} from "./chat/chat.service";
import {RequestManagerHub} from "../http/hubs/RequestHub";
import {ChatDialogComponent} from "./chat/chat-dialog/chat.component";


@Injectable()
export class ChatHub{

  constructor(
              public snackBar: MdSnackBar,
              public dialog: MdDialog,
              private requestManagerHub: RequestManagerHub) {
    this.storeItems = [];
    this.observers = [];
    this.observables = [];
    this.requestManagerHub.newMessage.subscribe(res => this.newMessage(res));
    this.createObserver().subscribe(a => this.storeItems.push(a));
  }

  newMessage(res: Message): void {
    let self = this;
    debugger;
    if (res.skin_id===1){
      return;
    }
    self.observers.map(o => o.next(new StoreItem<Message>(res, StoreAction.Inserted)));
      /*let message: string = 'Вам пришло новое сообщение';
      let action: string = "Открыть";
      let option: MdSnackBarConfig = new MdSnackBarConfig();
      option.duration = 10000;
      let snackBarRef = self.snackBar.open(message, action, option);
      snackBarRef.afterOpened().subscribe(() => {
        let options: MdDialogConfig = new MdDialogConfig();
        options.disableClose = false;
        options.height = '600px';
        options.width = '500px';
        options.data = res.chat_id;
        let dialogRef = self.dialog.open(ChatDialogComponent, option);
      });*/
  }

  private Added(message: Message): void {
    this.observers.map(o => o.next(new StoreItem<Message>(message, StoreAction.Inserted)));
  }

  public createObserver(){
    let observer = Observable.create(r => {
      this.storeItems.map(si => r.next(si));
      this.observers.push(r);
    });
    this.observables.push(observer);
    return observer;
  }

  private storeItems: StoreItem<Message>[];
  private observers: Array<Observer<StoreItem<Message>>>;
  private observables: Array<Observable<StoreItem<Message>>>;
}

export class StoreItem<T>{
  constructor(public item:T,public action:StoreAction){

  }

}


export enum StoreAction{
  Inserted, Update, Deleted
}
/**
 * Created by nardm on 05.02.17.
 */
