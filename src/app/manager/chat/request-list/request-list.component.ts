import {
    ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit,
    Output
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestManagerHubYou} from "../../../hubs/RequestHubYou";
import {Subscription} from "rxjs/Subscription";
import {ChatHub} from "./chatObs";
import {RequestManagerHub} from "../http/hubs/RequestHub";
import {ChatService} from "../chat/chat.service";
import Request = BasketRequestInterface.Request;
import {BasketRequestInterface} from "../Model/BasketRequest";
import BasketRequest = BasketRequestInterface.BasketRequest;
import {animate, state, style, transition, trigger} from "@angular/animations";
import { ServiceRequestStore, ServiceTaskStore, StoreAction, StoreItem } from '../../http/request';


@Component({
    selector: 'request-list',
    templateUrl: 'request-list.component.html',
    styleUrls:['request-list.component.scss'],
    animations: [
        trigger('activeRequest', [
            state('in', style({transform: 'translateX(0)'})),
            transition('void => *', [
                style({transform: 'translateX(-100%)'}),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({transform: 'translateX(100%)'}))
            ])
        ])
    ]
})
export class RequestListComponent implements OnChanges {
    constructor(private route: ActivatedRoute,
                private router: Router,
                private cdRef:ChangeDetectorRef,
                private store: ServiceRequestStore,
                private storeTask: ServiceTaskStore,
                private service: ChatService) {
        this.store.createObserver()
            .subscribe(res => {
                if (this.requests !== undefined) {
                    this.newStoreItem(res)
                }
            });

        this.storeTask.createObserver()
            .subscribe(res => {
                    if (this.requests !== undefined) {
                        for (let i = 0; i < this.requests.requests.length; i++) {
                            if (this.requests.requests[i].id === res.item.request_id) {
                                this.requests.requests[i].tasks.push(res.item);
                                this.requests.requests.unshift(this.requests.requests.splice(i, 1)[0]);
                                break;
                            }
                        }
                    }
                }
            );
    }

    private requests: BasketRequest;
    @Input() private takeBool: boolean;
    @Input() private inRequest: Request;
    @Input() private selectIndex: number;
    @Output() private selectOutput = new EventEmitter<Request>();
    @Output() private selectRequest = new EventEmitter<Request>();
    private selectedRequest: Request;
    private indexDelete: number;
    private requestFlagLoad: boolean = true;
    private flagLoad: boolean = false;


    newStoreItem(res: StoreItem<Request>): void {
        let self = this;
        switch (res.action) {
            case StoreAction.NewInserted:
                debugger;
                if (!self.takeBool && res.item.status !== 1) {
                    self.requests.requests.unshift(res.item);
                    self.cdRef.detectChanges();
                }
                break;
            case StoreAction.Deleted:
                debugger;
                if (!self.takeBool) {
                    let id: number = res.item.id;
                    let arrayEquals: boolean = false;

                    self.requests.requests.map(item => {
                        if (item.id === id) {
                            arrayEquals = true;
                        }
                    });
                    if (arrayEquals) {
                        let indexDelete: number = -1;
                        for (let i = 0; i < self.requests.requests.length; i++) {
                            if (id === self.requests.requests[i].id) {
                                indexDelete = i;
                                break;
                            }
                        }
                        self.requests.requests.splice(indexDelete, 1);
                        self.cdRef.detectChanges();
                    }
                }
                break;
            default:
                break
        }
    }


    ngOnChanges() {
        if (!this.flagLoad) {
            if (this.takeBool !== undefined) {
                if (this.takeBool) {
                    this.getRequestsTake()
                }
                else {
                    this.getBasketRequests();
                }
            }
            this.flagLoad = true;
        }
        if (this.inRequest) {
            this.requests.requests.unshift(this.inRequest);
        }
    }

    search(){
        if (this.selectIndex===0){
            this.searchRequest()
        }
        else{
            this.searchBasket();
        }
    }

    searchRequest(){

    }

    searchBasket(){

    }


    getRequestsTake(): void {
        this.service.getRequestsTake(1<<1,1<<1| 1<<2|1<<3|1<<4)
            .then(res => {
                this.requests = res;
                this.requestFlagLoad = false;
            })
    }

    getBasketRequests(): void {
        this.service.getBaskets(1<<2|1<<3|1<<4, 50,-50)
            .then(res => {
                this.requests = res;
                this.requestFlagLoad = false;
            })
    }


    onSelectOutput(request: Request): void {
        this.requests.requests = this.requests.requests.filter(res => res !== request);
        if (!this.takeBool) {
            this.service.postRequestTake(request.id)
                .then(res => {
                    this.selectOutput.emit(res.data)
                });
        }
        else {
            this.service.deleteRequestInBasket(request.id);
            this.selectOutput.emit(request);
        }
    }

    onSelectRequestOutput(request: Request): void {
        this.requests.requests.map(res => {
            res.active = false;
        });
        this.requests.requests.find(res => res === request).active = true;
        this.selectRequest.emit(request);
    }

}
