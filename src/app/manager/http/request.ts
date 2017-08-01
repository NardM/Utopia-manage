/**
 * Created by nardm on 03.02.17.
 */
/**
 * Created by nardm on 17.11.16.
 */
import {Injectable} from "@angular/core";

import "rxjs/add/operator/toPromise";
import {Observable, Observer} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {RequestManagerHub} from "./hubs/RequestHub";
import { BasketRequestInterface } from '../chat/Model/BasketRequest';
import BasketRequest = BasketRequestInterface.BasketRequest;
import Request = BasketRequestInterface.Request;
import Task = BasketRequestInterface.Task;
import { ChatService } from '../chat/chat/chat.service';



@Injectable()
export class  ServiceRequestStore {

  constructor(private service: ChatService,
              private router: Router,
              private requestManagerHub: RequestManagerHub) {

    this.inited = false;
    this.storeItems = [];
    this.observers = [];
    this.observables = [];
    this.createObserver().subscribe(a => this.storeItems.push(a));
    this.service.getBaskets(1 << 1, 20, -20)
        .then(res => {
          this.storeItems = res.requests.map(item => {
            let storeItem = new StoreItem(item, StoreAction.Inserted, res.total_count);
            this.observers.map(o => o.next(storeItem));
            return storeItem;
          })
        });
  }

  notDeleteRequest: number;

  public newOrder(res: Request): void {
    debugger;
    let self = this;
    self.AddedNew(res);
    self.audioNotification();
  }

  public deleteRequest(res: number) {
    debugger;
    let request: Request = <Request>{
      id: res
    };
    if (this.notDeleteRequest===res) {
      this.notDeleteRequest = undefined;
      return;
    }
    this.Remove(request);
    this.notDeleteRequest = undefined;
  }

  private audioNotification(): void {
    let audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'assets/audio/notification.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
  }

  private Added(request: Request, total_count?: number): void {
    this.observers.map(o => o.next(new StoreItem<Request>(request,
        StoreAction.Inserted, total_count)));
  }

  public Remove(request: Request): void {
    this.observers.map(o => o.next(new StoreItem<Request>(request, StoreAction.Deleted)));
  }

  public AddedNew(request: Request): void {
    this.observers.map(o => o.next(new StoreItem<Request>(request, StoreAction.NewInserted)));
  }

  public Update(request: Request): void {
    this.observers.map(o => o.next(new StoreItem<Request>(request, StoreAction.Update)));
  }

  private inited;

  public createObserver(): Observable<StoreItem<Request>> {
    let observer = Observable.create(r => {
      this.storeItems.map(si => r.next(si));
      this.observers.push(r);
    });
    this.observables.push(observer);
    return observer;
  }

  storeItems: StoreItem<Request>[];
  private observers: Array<Observer<StoreItem<Request>>>;
  public observables: Array<Observable<StoreItem<Request>>>;
}

export class StoreItem<T> {
  constructor(public item: T,
              public action: StoreAction,
              public total_count?: number) {
  }

}


export enum StoreAction{
  Inserted, Update, Deleted,NewInserted
}






/**
 * Created by nardm on 05.02.17.
 */



@Injectable()
export class  ServiceTaskStore {

  constructor(private service: UserService,
              private router: Router,
              private requestManagerHub: RequestManagerHub) {

    this.inited = false;
    this.storeItems = [];
    this.observers = [];
    this.observables = [];
    this.createObserver().subscribe(a => this.storeItems.push(a));
  }



  public newTask(res: Task): void{
    this.audioNotification();
    this.AddedNew(res);
  }


  private audioNotification(): void {
    let audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'assets/audio/notification.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
  }

  public AddedNew(res: Task): void {
    this.observers.map(o => o.next(new StoreItem<Task>(res, StoreAction.NewInserted)));
  }


  private inited;

  public createObserver(): Observable<StoreItem<Task>> {
    let observer = Observable.create(r => {
      this.storeItems.map(si => r.next(si));
      this.observers.push(r);
    });
    this.observables.push(observer);
    return observer;
  }

  storeItems: StoreItem<Task>[];
  private observers: Array<Observer<StoreItem<Task>>>;
  public observables: Array<Observable<StoreItem<Task>>>;
}


