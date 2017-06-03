/**
 * Created by nardm on 08.12.16.
 */
import { Component } from '@angular/core';

@Component({
  /*templateUrl: 'manage.component.html',
   styleUrls: ['manage.component.scss']*/
  template: `
        <top-bar style="    position: fixed;
    display: block;
    width: 100%;
    min-height: 50px;"></top-bar>
        <main STYLE="position: fixed;
    display: block;
    width: 100%;
    margin-top: 50px;"> 
            <left-bar>
                <router-outlet></router-outlet>
            </left-bar>
        </main>
     `,
})
export class UserComponent {
}
