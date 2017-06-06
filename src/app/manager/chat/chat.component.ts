import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Chat, ChatService, Message} from "./chat/chat.service";
import {RequestManagerHubYou} from "../../../hubs/RequestHubYou";
import {Subscription} from "rxjs/Subscription";
import {ChatHub} from "./chatObs";
import {RequestManagerHub} from "../http/hubs/RequestHub";
import {BasketRequestInterface} from "./Model/BasketRequest";
import BasketRequest = BasketRequestInterface.BasketRequest;
import Request = BasketRequestInterface.Request;
import {CategoryService} from "../http/category.service";
import {Category} from "../model/category";
import {MdSidenav} from "@angular/material";


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
              private categoryService: CategoryService,
              private service: ChatService) {
    let self = this;
    self.getCategories();
    this.date = new Date();
    let param_chat = {
      active: true,
    };
  }

  chats: Array<Chat> = [];
  chat: Chat;
  selectedChatID: number;
  selectedRequest: Request;
  notificationsActive: boolean = true;
  date: Date;
  private subscription: Subscription;
  categories: Category[];
  sidenavBool: boolean = false;
  @ViewChild('sidenav')
  sidenav: MdSidenav;

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

  onSelectRequest(request: Request) {
    this.selectedChatID = request.chat_id;
    this.selectedRequest = this.onPushCategoryInRequest(request);
  }

  getCategories() {
    this.categoryService.getCategories()
        .then(res => {
          this.categories = res;
        })
  }

  onOpenRequest(event){
    if (event){
      this.sidenav.open();
    }
    else{
      this.sidenav.close();
    }
  }


  onPushCategoryInRequest(request: Request) {
    let self = this;
    request.category_name = self.categories.find(res => res.id === request.category_id).name;
    return request;
  }


  ngOnDestroy() {

  }


  ngOnInit() {
    //this.getChats()
  }

}
