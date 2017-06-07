import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestManagerHubYou} from "../../../hubs/RequestHubYou";
import {Subscription} from "rxjs/Subscription";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {BasketRequestInterface} from "../../Model/BasketRequest";
import Request = BasketRequestInterface.Request;


@Component({
    selector: 'request-item-mini',
    templateUrl: 'request-item-mini.component.html',
    styleUrls:['request-item-mini.component.scss'],
    animations: [
        trigger('flyInOut', [
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
export class RequestItemMiniComponent implements OnChanges {
    constructor() {
    }

    @Input() private request: Request;
    @Input() private takeBool: boolean = true;
    @Output() private selectOutput = new EventEmitter<Request>();
    @Output() private selectRequest = new EventEmitter<Request>();
    private expression: string = "#009DDF";
    private deleteRequestBool: boolean = false;
    private active: boolean;

    ngOnChanges() {
        this.active = this.takeBool;
    }

    onChange(event, request: Request): void {
        if (event.checked) {
            if (!this.takeBool) {
                this.deleteRequestBool = true;
                this.selectOutput.emit(request);
            }
            else {

            }
        }
        else {
            if (this.takeBool) {
                this.deleteRequestBool = true;
                this.selectOutput.emit(request);
            }
        }
    }

    onOpenChat(request: Request): void {
        if (this.takeBool) {
            this.selectRequest.emit(request)
        }
    }

    StatusRequest(status: number): string {
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
