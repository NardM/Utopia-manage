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


@Component({
    selector: 'request-list',
    templateUrl: 'request-list.component.html',
    styleUrls:['request-list.component.scss']
})
export class RequestListComponent implements OnChanges {
    constructor(private route: ActivatedRoute,
                private router: Router,
                private service: ChatService) {
    }

    requests: BasketRequest;
    @Input() takeBool: boolean;
    @Output() selectOutput = new EventEmitter<Request>();
    selectedRequest: Request;
    expression: string = "#009DDF";

    ngOnChanges() {
        if (this.takeBool !== undefined) {
            if (this.takeBool) {
                this.getRequestsTake()
            }
            else {
                this.getBasketRequests();
            }
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


    onSelectRequest(request: Request, ind: number) {
        this.selectOutput.emit(request)
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
