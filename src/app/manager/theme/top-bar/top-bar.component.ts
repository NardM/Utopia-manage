/**
 * Created by nardm on 30.05.17.
 */
/**
 * Created by nardm on 08.12.16.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'top-bar',
    templateUrl: 'top-bar.component.html',
     styleUrls: ['top-bar.component.scss']
})
export class TopBarComponent {

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
