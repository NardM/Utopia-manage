import {
    Component, ElementRef, EventEmitter, Input, OnChanges, OnInit,
    Output
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import { BasketRequestInterface } from '../../Model/BasketRequest';
import Task = BasketRequestInterface.Task;
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
    selector: 'task-bookmark',
    template: `
        <md-icon [ngStyle]="{'color': colorBookmark}">bookmark</md-icon>
    `,

})
export class TaskBookmarkComponent implements OnChanges {

    @Input() private task: Task;


    constructor(private _eref: ElementRef) {
    }

    private colorBookmark: string = 'white';


    ngOnChanges() {
        const Urgent: number = 60000 * 6;
        const Waiting: number = 60000 * 4;
        const New: number = 60000 * 2;
        if (this.task !== undefined) {

            let date: Date = new Date();
            let dateManager: Date = new Date(this.task.date_time);
            let dateManagerTime: number = dateManager.getTime() + (date.getTimezoneOffset() * 60000 * (-1));
            debugger;
            let divTime: number = date.getTime() - dateManagerTime;
            if (divTime > Waiting && divTime < Urgent) {
                this.colorBookmark = 'yellow';
            }
            if (divTime > Urgent) {
                this.colorBookmark = 'red';
            }
            if (divTime <= New) {
                this.colorBookmark = 'green';
            }
        }
        if (this.task !== undefined) {
            debugger;
            let time = setInterval(res => {
                if (this.task === undefined) {
                    return;
                }
                let date: Date = new Date();
                let dateManager: Date = new Date(this.task.date_time);
                let dateManagerTime: number = dateManager.getTime() + (date.getTimezoneOffset() * 60000 * (-1));

                let divTime: number = date.getTime() - dateManagerTime;
                if (divTime > Waiting && divTime < Urgent) {
                    this.colorBookmark = 'yellow';
                }
                if (divTime > Urgent) {
                    this.colorBookmark = 'red';
                }
                if (divTime <= New) {
                    this.colorBookmark = 'green';
                }
            }, 1000);
        }
        else {
            this.colorBookmark = 'white';
        }
    }

}

enum priorityTask{
    Urgent, Waiting, New
}