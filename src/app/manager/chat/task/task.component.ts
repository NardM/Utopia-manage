import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import { ChatService } from '../chat/chat.service';
import { ServiceRequestStore } from '../../http/request';
import { BasketRequestInterface } from '../Model/BasketRequest';
import Task = BasketRequestInterface.Task;


@Component({
    selector: 'task',
    templateUrl: 'task.component.html',
    styleUrls:['task.component.scss'],

})
export class TaskComponent implements OnChanges {

    @Input() private tasks: Task[];

    constructor(private service: ChatService,
                private store: ServiceRequestStore,) {
    }

    ngOnChanges() {
    }



}
