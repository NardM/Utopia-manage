import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
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
                private service: ChatService) {
    }

    private requests: BasketRequest;
    @Input() private takeBool: boolean;
    @Input() private inRequest: Request;
    @Output() private selectOutput = new EventEmitter<Request>();
    @Output() private selectRequest = new EventEmitter<Request>();
    private selectedRequest: Request;
    private indexDelete: number;
    private requestFlagLoad: boolean = true;
    private flagLoad: boolean = false;

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

    getRequestsTake(): void {
        this.service.getRequestsTake()
            .then(res => {
                this.requests = res;
                this.requestFlagLoad = false;
            })
    }

    getBasketRequests(): void {
        this.service.getBaskets()
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
            this.service.deleteRequestInBasket(request.id)
            this.selectOutput.emit(request)
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
