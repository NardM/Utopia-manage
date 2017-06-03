/**
 * Created by nardm on 26.01.17.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Cookie} from "ng2-cookies";
declare var jQuery:any;

@Injectable()
  export class RequestManagerHub {


  public  newOrders: Observable<NewOrder>;

  public  newOrdersQuestion: Observable<NewOrderQuestion>;
  public  newResponse: Observable<NewResponse>;
  public  responseAccepted: Observable<ResponseAccepted>;

  public  responseDenied: Observable<ResponseDenied>;
  public  responseDelete: Observable<ResponseDelete>;

  public  newMessage: Observable<NewMassage>;

  constructor(){
    let connection = jQuery.connection;
    let host="smartapi.ru" ;
    jQuery.connection.hub.url = 'http://' + host+ '/signalr';
    let requestHub = connection.manager;
    let chatHub = connection.chat;

    this.newMessage = Observable.create(observer=>
      requestHub.client.newMessage = ( a => observer.next(a)));


    connection.hub.start()
      .done(function()
      {
        let connect: Connect = <Connect>{
          device_id: Cookie.get('device_id'),
          role: 4,
          app_type: 5,
          token: Cookie.get('login_token')
        };
        connection.request.server.connect(connect).done(res => {
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
class NewOrder{

}
class ResponseAccepted{

}
class NewResponse{

}
class NewMassage{

}
class NewOrderQuestion{

}
class ResponseDenied{


}
class ResponseDelete{


}
export interface Connect{
  device_id: string;
  role: number;
  app_type: number;
  token: string;
}
