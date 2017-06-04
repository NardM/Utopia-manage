import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Chat, ChatService, Message} from "./chat/chat.service";
import {RequestManagerHubYou} from "../../../hubs/RequestHubYou";
import {Subscription} from "rxjs/Subscription";
import {ChatHub} from "./chatObs";
import {RequestManagerHub} from "../http/hubs/RequestHub";
import {BasketRequestInterface} from "./Model/BasketRequest";
import BasketRequest = BasketRequestInterface.BasketRequest;
import Request = BasketRequestInterface.Request;


@Component({
    selector: 'char-list',
    templateUrl: 'chat.component.html',
    styleUrls:['chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute,
              private router: Router,
              private hub: RequestManagerHub,
              private serviceR: ChatHub,
              private service: ChatService) {
    let self = this;

    this.date = new Date();
    let param_chat = {
      active: true,
    };
  }

  chats: Array<Chat> = [];
  chat: Chat;
  selectedChat: Chat;
  notificationsActive: boolean = true;
  date: Date;
  private subscription: Subscription;



  requestsTake: BasketRequest;
  requests: BasketRequest;
  inputRequestTake: Request;
  inputRequestBasket: Request;

  onSelectInputBasket(event: Request){
    this.inputRequestBasket = event;
  }

  onSelectInputTake(event: Request){
    this.inputRequestTake = event;
  }






  ngOnDestroy() {

  }


  ngOnInit() {
    //this.getChats()
  }

}
