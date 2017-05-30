/**
 * Created by nardm on 30.05.17.
 */
/**
 * Created by nardm on 08.12.16.
 */
import { Component } from '@angular/core';

@Component({
    templateUrl: 'left-bar.component.html',
     styleUrls: ['left-bar.component.scss']
})
export class LeftBarComponent {

    constructor() {
    }


    navLinks: { href: string, label: string }[] = [
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
