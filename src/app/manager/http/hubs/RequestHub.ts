/**
 * Created by nardm on 26.01.17.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Cookie} from "ng2-cookies";
import { BasketRequestInterface } from '../../chat/Model/BasketRequest';
import BasketRequest = BasketRequestInterface.BasketRequest;
import Request = BasketRequestInterface.Request;
import Task = BasketRequestInterface.Task;
import { Message } from '../../chat/chat/chat.service';
declare var jQuery:any;

@Injectable()
  export class RequestManagerHub {


  public  newBusketRequest: Observable<Request>;
  public  removeFromBasket: Observable<number>;
  public  newTask: Observable<Task>;
  public  newMessage: Observable<Message>;

  constructor(){
    let connection = jQuery.connection;
    let host="smartapi.ru" ;
    jQuery.connection.hub.url = 'http://' + host+ '/signalr';
    let managerHub = connection.manager;
    let chatHub = connection.chat;

    this.newBusketRequest = Observable.create(observer=>
        managerHub.client.newBusketRequest = ( a => observer.next(a)));

    this.newTask = Observable.create(observer=>
        managerHub.client.newTask = ( a => observer.next(a)));

    this.removeFromBasket = Observable.create(observer=>
        managerHub.client.removeFromBasket = ( a => observer.next(a)));

    this.newMessage = Observable.create(observer=>
        chatHub.client.newMessage = ( a => observer.next(a)));


    connection.hub.start()
      .done(function()
      {
        let connect: Connect = <Connect>{
          device_id: Cookie.get('device_id'),
          role: 4,
          user_id: Number(Cookie.get('user_id')),
          app_type: 5,
          token: Cookie.get('login_token')
        };
        connection.manager.server.connect(connect).done(res => {

        });
        connection.chat.server.connect(connect).done(res => {
        });
      })
      .fail(function()
      { debugger;
        console.log('Could not Connect!');
      });
  }
}

export interface Connect{
  device_id: string;
  role: number;
  app_type: number;
  token: string;
}
