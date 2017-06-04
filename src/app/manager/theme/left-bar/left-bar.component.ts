/**
 * Created by nardm on 30.05.17.
 */
/**
 * Created by nardm on 08.12.16.
 */
import { Component } from '@angular/core';
import {UserService} from "../../http/user.service";

@Component({
    selector: 'left-bar',
    templateUrl: 'left-bar.component.html',
     styleUrls: ['left-bar.component.scss']
})
export class LeftBarComponent {

    constructor(private service: UserService) {
    }


    navLinks: { href: string, label: string }[] = [
        {
            href: './chat', label: 'СЧАТ',
        },
        {
            href: './new-requests', label: 'НОВЫЕ ЗАЯВКИ',
        },
        {
            href: './published-requests', label: 'ОПУБЛИКОВАННЫЕ',
        },
        {
            href: './accepted-requests', label: 'ПРИНЯТЫЕ ЗАЯВКИ  ',
        },
        {
            href: './archive-requests', label: 'АРХИВ  ',
        },
    ];
}
