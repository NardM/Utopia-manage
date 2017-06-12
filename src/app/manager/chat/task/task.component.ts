import {
    Component, ElementRef, EventEmitter, Input, OnChanges, OnInit,
    Output
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import { ChatService } from '../chat/chat.service';
import { ServiceRequestStore } from '../../http/request';
import { BasketRequestInterface } from '../Model/BasketRequest';
import Task = BasketRequestInterface.Task;
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
    selector: 'task',
    templateUrl: 'task.component.html',
    styleUrls:['task.component.scss'],
    animations: [
        trigger('cardnotifications', [
            state('*', style({
                '-ms-transform': 'translate3D(0px, 0px, 0px)',
                '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                '-moz-transform': 'translate3D(0px, 0px, 0px)',
                '-o-transform':'translate3D(0px, 0px, 0px)',
                transform:'translate3D(0px, 0px, 0px)',
                opacity: 1})),
            transition('void => *', [
                style({opacity: 0,
                    '-ms-transform': 'translate3D(0px, 150px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                    '-moz-transform': 'translate3D(0px, 150px, 0px)',
                    '-o-transform':'translate3D(0px, 150px, 0px)',
                    transform:'translate3D(0px, 150px, 0px)',
                }),
                animate('0.3s 0s ease-out')
            ]),
            transition('* => void', [
                style({opacity: 1,
                    '-ms-transform': 'translate3D(0px, 0px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                    '-moz-transform': 'translate3D(0px, 0px, 0px)',
                    '-o-transform':'translate3D(0px, 0px, 0px)',
                    transform:'translate3D(0px, 0px, 0px)',
                }),
                animate('0.3s 0s ease-out')
            ])
        ])
    ],
    host: {
        '(document:click)': 'onClick($event)',
    },


})
export class TaskComponent implements OnChanges {

    @Input() private tasks: Task[];
    @Output() close = new EventEmitter();
    @Output() updateTask = new EventEmitter<Task[]>();


    constructor(private service: ChatService,
                private _eref: ElementRef,
                private store: ServiceRequestStore,) {
    }

    ngOnChanges() {
    }


    private onDeleteTask(task: Task) {
        if (this.tasks.length >= 1) {
            this.service.postTaskComplete(task.request_id, task.id)
                .then(res => {
                    this.tasks.shift();
                    this.updateTask.emit(this.tasks);
                });
        }
    }

    onClick(event) {
        let self = this;
        if (event.target.offsetParent.offsetParent === null) {
            self.close.emit();
            return
        }
        if (self._eref.nativeElement.offsetParent.className
            !== event.target.offsetParent.offsetParent.className) {
            self.close.emit();
        }
    }

}
