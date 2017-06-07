/**
 * Created by nardm on 03.02.17.
 */
/**
 * Created by nardm on 17.11.16.
 */
import {Injectable} from "@angular/core";

import "rxjs/add/operator/toPromise";
import {Observable, Observer} from "rxjs";
import {ServiceRequestService} from "../../for-you/http/services/service-requests-service";
import {RequestGetInterface, RequestInterface} from "../../models/Request";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {RequestManagerHubYou} from "../../hubs/RequestHubYou";
import {ResponseService} from "../../for-you/http/services/response.service";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {RequestManagerHub} from "./hubs/RequestHub";
import {ServiceRequestInterface} from '../model/service-request'
import Request = ServiceRequestInterface.Request;

@Injectable()
export class  ServiceRequestStore {

  constructor(private service: UserService,
              public snackBar: MdSnackBar,
              private router: Router,
              private requestManagerHub: RequestManagerHub) {

    this.inited = false;
    this.storeItems = [];
    this.observers = [];
    this.observables = [];
    // this.requestManagerHub.newResponse.subscribe(res => this.newOrder(res));
    this.createObserver().subscribe(a => this.storeItems.push(a));
    this.service.getServiceRequest(1 << 1 | 1 << 2 | 1 << 3 | 1 << 4, 0)
        .then(res => {
          this.storeItems = res.requests.map(item => {
            let storeItem = new StoreItem(item, StoreAction.Inserted, res.total_count);
            this.observers.map(o => o.next(storeItem));
            return storeItem;
          })
        });
  }


  newOrder(res: any): void {
    debugger;
    let self = this;
    let message: string = 'Вам пришло новое предложение по заявке ' + res.id;
    let action: string = "Открыть";
    let option: MdSnackBarConfig = new MdSnackBarConfig();
    option.duration = 10000;
    let snackBarRef = self.snackBar.open(message, action, option);
    self.audioNotification();
    snackBarRef.onAction().subscribe(() => {
      self.router.navigate(['for-you', 'request', res.request_id, 'response', res.id])
    });
  }

  audioNotification(): void {
    let audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'assets/audio/notification.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
  }


  /* UpdatePut(requestId: number, propertyId: number,item: Item): Promise<RequestI> {
   let post = this.service.putRequest(requestId, propertyId, item);
   post.then(a => this.Added(a));
   return post;
   }*/


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
