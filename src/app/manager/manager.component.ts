/**
 * Created by nardm on 08.12.16.
 */
import { Component } from '@angular/core';

@Component({
  /*templateUrl: 'manage.component.html',
   styleUrls: ['manage.component.scss']*/
  template: `
        <top-bar></top-bar>
        <main>
            <left-bar>
                <router-outlet></router-outlet>
            </left-bar>
        </main>
     `,
})
export class UserComponent {
}
