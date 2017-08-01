/**
 * Created by nardm on 08.12.16.
 */
import { Component } from '@angular/core';
import { RequestManagerHub } from './http/hubs/RequestHub';
import { ChatHub } from './chat/chatObs';
import { ServiceRequestStore, ServiceTaskStore } from './http/request';

@Component({
  /*templateUrl: 'manage.component.html',
   styleUrls: ['manage.component.scss']*/
  template: `
      <div>
        <top-bar style="    position: fixed;
    display: block;
    width: 100%;
    min-height: 50px;"></top-bar>
        <main STYLE="position: fixed;
    display: block;
    width: 100%;
    margin-top: 50px;"> 
            <left-bar>
                <router-outlet></router-outlet>
            </left-bar>
        </main>
      </div>
     `,
  styles: [`::-webkit-scrollbar {
      width: 5px;
      height: 5px;
  }

  ::-webkit-scrollbar-button {
      width: 14px;
      height: 14px;
  }
  ::-webkit-scrollbar-thumb {
      background: #e1e1e1;
      border: 21px none #ffffff;
      border-radius: 50px;
  }
  ::-webkit-scrollbar-thumb:hover {
      background: #ffffff;
  }
  ::-webkit-scrollbar-thumb:active {
      background: #ffffff;
  }
  ::-webkit-scrollbar-track {
      background: #727272;
      border: 19px none #ffffff;
      border-radius: 67px;
  }
  ::-webkit-scrollbar-track:hover {
      background: #727272;
  }
  ::-webkit-scrollbar-track:active {
      background: #727272;
  }
  ::-webkit-scrollbar-corner {
      background: transparent;
  }`]

})
export class UserComponent {
  constructor(private requestManagerHub: RequestManagerHub,
              private requestStore: ServiceRequestStore,
              private taskStore: ServiceTaskStore,
              private store: ChatHub) {
    this.requestManagerHub.newMessage
        .subscribe(res => {
          debugger;
          this.store.newMessage(res)
        });
    this.requestManagerHub.newBusketRequest
        .subscribe(res => this.requestStore.newOrder(res));
    this.requestManagerHub.removeFromBasket
        .subscribe(res => this.requestStore.deleteRequest(res));
    this.requestManagerHub.newTask
        .subscribe(res => this.taskStore.newTask(res));

  }
}
