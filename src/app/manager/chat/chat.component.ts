import {
  ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit,
  ViewChild
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Chat, ChatService, Message} from "./chat/chat.service";
import {RequestManagerHubYou} from "../../../hubs/RequestHubYou";
import {Subscription} from "rxjs/Subscription";
import {ChatHub} from "./chatObs";
import {RequestManagerHub} from "../http/hubs/RequestHub";
import {BasketRequestInterface} from "./Model/BasketRequest";
import BasketRequest = BasketRequestInterface.BasketRequest;
import Request = BasketRequestInterface.Request;
import Task = BasketRequestInterface.Task;
import {CategoryService} from "../http/category.service";
import {Category} from "../model/category";
import {MdSidenav} from "@angular/material";
import {BaThemeSpinner} from "../../service/baThemeSpinner.service";
import { ServiceRequestStore, ServiceTaskStore, StoreAction, StoreItem } from '../http/request';


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
              private cdRef:ChangeDetectorRef,
              private _state: BaThemeSpinner,
              private store: ServiceTaskStore,
              private categoryService: CategoryService,
              private service: ChatService) {
    let self = this;
    self.getCategories();
    this.date = new Date();
    let param_chat = {
      active: true,
    };
    this.store.createObserver()
        .subscribe(res => {
              if (this.selectedRequest) {
                if (this.selectedRequest.id === res.item.request_id) {
                  this.newTask(res.item)
                }
              }
            }
        );
  }

  private chats: Array<Chat> = [];
  private chat: Chat;
  private selectedChatID: number;
  private selectedRequest: Request;
  private notificationsActive: boolean = true;
  private date: Date;
  private subscription: Subscription;
  private categories: Category[];
  private sidenavBool: boolean = false;
  @ViewChild('sidenav')
  private sidenav: MdSidenav;

  private requestsTake: BasketRequest;
  private requests: BasketRequest;
  private inputRequestTake: Request;
  private inputRequestBasket: Request;
  private deleteRequest: Request;
  private selectIndex: number = 0;
  private taskBool: boolean = false;

  private search() {
    if (this.selectIndex === 0) {
      this.searchRequest()
    }
    else {
      this.searchBasket();
    }
  }

  private  searchRequest() {

  }

  private onDeleteTask() {
    if (this.selectedRequest.tasks.length >= 1) {
      this.selectedRequest.tasks.shift();
    }
  }

  private newTask(task: Task) {
    this.selectedRequest.tasks.push(task);
    this.cdRef.detectChanges();
  }

  private onUpdateTask(event: Task[]) {
    this.selectedRequest.tasks = event;
    this.cdRef.detectChanges();
  }

  private searchBasket() {

  }

  private onTaskOpen() {
    this.taskBool = !this.taskBool;
  }

  private  onSelectIndex(event) {
    debugger;
  }

  private  onSelectInputBasket(event: Request): void {
    this.inputRequestBasket = event;
  }

  private onSelectInputTake(event: Request): void {
    this.inputRequestTake = event;
  }

  private onSelectRequest(request: Request): void {
    this.sidenav.close();
    this.selectedChatID = request.chat_id;
    this.selectedRequest = this.onPushCategoryInRequest(request);
  }

  private  getCategories(): void {
    this.categoryService.getCategories()
        .then(res => {
          this.categories = res;
          this._state.hideManager()
        })
  }

  private onOpenRequest(event): void {
    if (event) {
      this.sidenav.open();
    }
    else {
      this.sidenav.close();
    }
  }


  private onPushCategoryInRequest(request: Request): Request {
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
