/**
 * Created by nardm on 26.01.17.
 */
import { Injectable } from '@angular/core';
import {Cookie} from "ng2-cookies";
import { BasketRequestInterface } from '../../chat/Model/BasketRequest';
import BasketRequest = BasketRequestInterface.BasketRequest;
import Request = BasketRequestInterface.Request;
import Task = BasketRequestInterface.Task;
import { Message } from '../../chat/chat/chat.service';
import { Observable } from 'rxjs/Observable';
declare var jQuery:any;

@Injectable()
  export class RequestManagerHub {


  public  newBusketRequest: Observable<Request>;
  public  removeFromBasket: Observable<number>;
  public  newTask: Observable<Task>;
  public  newMessage: Observable<Message>;
  private connection: any;

  constructor() {
    let self = this;
    self.connection = jQuery.connection;
    let host = "smartapi.ru";
    jQuery.connection.hub.url = 'http://' + host + '/signalr';
    let managerHub = self.connection.manager;
    let chatHub = self.connection.chat;

    self.newBusketRequest = Observable.create(observer =>
        managerHub.client.newBusketRequest = ( a => observer.next(a)));

    self.newTask = Observable.create(observer =>
        managerHub.client.newTask = ( a => observer.next(a)));

    self.removeFromBasket = Observable.create(observer =>
        managerHub.client.removeFromBasket = ( a => observer.next(a)));

    self.newMessage = Observable.create(observer =>
        chatHub.client.newMessage = ( a => observer.next(a)));

    chatHub.client.reconnect = ( () => self.onReconnect());
    self.hubStart();
  }

  private hubStart(): void {
    let self = this;
    self.connection.hub.start()
        .done(() => self.hubConnect())
        .fail(function () {
          debugger;
          setTimeout(() =>
              self.hubStart(), 5000); // Restart connection after 5 seconds.
          console.log('Could not Connect!');
        });
  }

  private hubConnect(): void {
    let self = this;
    let connect: Connect = <Connect>{
      device_id: Cookie.get('device_id'),
      role: 8,
      user_id: Number(Cookie.get('user_id')),
      app_type: 6,
      token: Cookie.get('login_token')
    };
    self.connection.request.server.connect(connect).done(res => {
    });
    self.connection.chat.server.connect(connect).done(res => {
    });
    self.connection.hub.disconnected(function () {
      setTimeout(() =>
          self.hubStart(), 5000) // Restart connection after 5 seconds.
    });
  }

  private onReconnect() {
    let self = this;
    let connect: Connect = <Connect>{
      device_id: Cookie.get('device_id'),
      role: 8,
      user_id: Number(Cookie.get('user_id')),
      app_type: 6,
      token: Cookie.get('login_token')
    };
    self.connection.request.server.connect(connect).done(res => {
    });
    self.connection.chat.server.connect(connect).done(res => {
    });
    self.connection.hub.disconnected(function () {
      setTimeout(() =>
          self.hubStart(), 5000) // Restart connection after 5 seconds.
    });
  }

}

export interface Connect{
  device_id: string;
  role: number;
  app_type: number;
  user_id: number;
  token: string;
}
