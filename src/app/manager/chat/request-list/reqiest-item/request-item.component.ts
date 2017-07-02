import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestManagerHubYou} from "../../../hubs/RequestHubYou";
import {Subscription} from "rxjs/Subscription";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {BasketRequestInterface} from "../../Model/BasketRequest";
import Request = BasketRequestInterface.Request;
import {UserService} from "../../../http/user.service";
import {ClientInterface} from '../../../clients/model/client'
import Client = ClientInterface.Account;
import {ClientService} from "../../../http/client.service";
import {ServiceResponsesInterface} from "../../../model/service-responses";
import Respons = ServiceResponsesInterface.Respons;
import { ChatService, Question, Questions } from '../../chat/chat.service';

@Component({
    selector: 'request-item',
    templateUrl: 'request-item.component.html',
    styleUrls:['request-item.component.scss'],
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
export class RequestItemComponent implements OnChanges {
    constructor(private userService: UserService,
                private chatServiceL: ChatService,
                private clientService: ClientService) {
    }

    @Input() private request: Request;
    @Output() private onOpenRequestBool = new EventEmitter();
    @Output() private onOpenChat = new EventEmitter<number>();
    private user: Client;
    public response: Respons[];
    public questions: Question[];
    private confirmBool: boolean = false;
    private load: boolean = false;
    private openRequestBool: boolean = false;


    ngOnChanges() {
        if (this.request) {
            this.load = true;
            this.resetComponent();
            if (this.request.status == 1 || this.request.status == 2) {
                this.request.active_chat = true;
                this.getRespons();
            }
            if (this.request.status === 4 || this.request.status === 5 || this.request.status === 6) {
                this.request.active_chat = true;
                this.confirmBool = true;
                this.load = false;
            }
            this.getRequestQuestions(this.request.id);
        }
    }

    onOpenRequest(): void {
        this.openRequestBool = !this.openRequestBool;
        this.onOpenRequestBool.emit(this.openRequestBool);
    }


    resetComponent(): void {
        this.user = undefined;
        this.response = undefined;
        this.confirmBool = false;
    }

    getClient(): void {
        this.clientService.getClient(this.request.user_id)
            .then(res => {
                this.user = res;
            })
    }

    getConfirm(): void {
        this.userService.getServiceRequestConfirm(this.request.confirm.id);
    }

    getRespons(): void {
        this.userService.getServiceResponse(this.request.id)
            .then(res => {
                this.response = res;
                this.confirmBool = false;
                this.load = false;
            })
    }

    getRequestQuestions(requestID: number) {
        this.chatServiceL.getRequestQuestions(requestID)
            .then(res => this.questions = res.questions)
    }

    private openChat(chatID: number, typeChat: number, response?: Respons) {
        debugger;
        switch (typeChat) {
            case 0:
                this.onOpenChat.emit(chatID);
                this.request.active_chat = true;
                if (this.request.confirm) {
                    this.request.confirm.active_chat = false;
                }
                this.response.map(res => res.active_chat = false);
                break;
            case 1:
                this.onOpenChat.emit(chatID);
                this.request.active_chat = false;
                this.request.confirm.active_chat = true;
                break;
            case 2:
                this.chatServiceL.createOrderChat(response.company_id, response.request_id)
                    .then(res => {
                        this.onOpenChat.emit(res.data.id);
                        this.request.active_chat = false;
                        this.response.map(res => res.active_chat = false);
                        this.response.find(res => res.id === response.id).active_chat = true;
                    });
                /*if (chatID === undefined|| chatID === null) {
                 this.chatServiceL.createOrderChat(response.company_id, response.id)
                 .then(res => {
                 this.onOpenChat.emit(res.data.id);
                 this.request.active_chat = false;
                 this.response.map(res=> res.active_chat = false);
                 this.response.find(res=> res.id === response.id).active_chat = true;
                 })
                 }
                 else{
                 this.onOpenChat.emit(chatID);
                 this.request.active_chat = false;
                 this.response.map(res=> res.active_chat = false);
                 this.response.find(res=> res.id === response.id).active_chat = true;
                 }*/
                break;
            case 3:
                this.onOpenChat.emit(chatID);
                this.questions.map(res => res.active_chat = false);
                this.request.active_chat = false;
                this.request.confirm.active_chat = false;
                this.response.map(res => res.active_chat = false);
                this.questions.map(res => {
                    if (res.chat_id === chatID) {
                        res.active_chat = true
                    }
                });
                break;
            default:
                break;
        }
    }


}
