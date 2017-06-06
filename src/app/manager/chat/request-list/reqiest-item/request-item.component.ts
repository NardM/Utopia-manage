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
    constructor(private userService: UserService, private clientService: ClientService) {
    }

    @Input() request: Request;
    user: Client;
    response: Respons[];
    confirmBool: boolean = false;

    ngOnChanges() {
        if (this.request) {
            this.getClient();
            if (this.request.status == 1 || this.request.status == 2) {
                this.getRespons();
            }
            if (this.request.status === 4 || this.request.status === 5 || this.request.status === 6) {
                this.confirmBool = true;
            }
        }
    }

    resetComponent(){
        this.user = undefined;
        this.response = undefined;
        this.confirmBool = false;
    }

    getClient() {
        this.clientService.getClient(this.request.user_id)
            .then(res =>{ this.user = res; })
    }

    getConfirm() {
        this.userService.getServiceRequestConfirm(this.request.confirm.id);
    }

    getRespons() {
        this.userService.getServiceResponse(this.request.id)
            .then(res => {
                this.response = res;
                this.confirmBool = false;
            })
    }


}
