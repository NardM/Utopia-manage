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

    requests: BasketRequest;
    @Input() takeBool: boolean;
    @Input() inRequest: Request;
    @Output() selectOutput = new EventEmitter<Request>();
    selectedRequest: Request;
    expression: string = "#009DDF";
    indexDelete: number;

    ngOnChanges() {
        if (this.takeBool !== undefined) {
            if (this.takeBool) {
                this.getRequestsTake()
            }
            else {
                this.getBasketRequests();
            }
        }
        if (this.inRequest) {
            debugger;
            this.requests.requests.unshift(this.inRequest);
        }
    }

    getRequestsTake() {
        this.service.getRequestsTake()
            .then(res => {
                this.requests = res;
            })
    }

    getBasketRequests() {
        this.service.getBaskets()
            .then(res => this.requests = res)
    }


    onChange(event, request: Request, ind: number) {
        debugger;
        if (event.checked) {
            //this.requests.requests = this.requests.requests.filter(res => res !== request);
            this.indexDelete  = ind;
            //this.selectOutput.emit(request)

        }
    }


    onSelectRequest(request: Request, ind: number) {

    }

    StatusRequest(status: number) {
        switch (status) {
            case 0:
                this.expression = "white";
                return "Удаленный";
            case 1:
                this.expression = "#009DDF";
                return "Созданый";
            case 2:
                this.expression = '#009DDF';
                return 'Статус: Предложение отправлено';
            case 3:
                this.expression = '#df1f1c';
                return 'Статус: Предложение отклонено';
            case 4:
                this.expression = '#57A73F';
                return 'Статус: Предложение приянто';
            case 5:
                this.expression = '#009DDF';
                return 'Заполненный';
            case 6:
                this.expression = '#009DDF';
                return 'Рассмотренный';
        }
    }
}
