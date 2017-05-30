/**
 * Created by nardm on 08.12.16.
 */
import { Component } from '@angular/core';

@Component({
  /*templateUrl: 'manage.component.html',
   styleUrls: ['manage.component.scss']*/
  template: `
        <router-outlet></router-outlet>`,

  styles: [`
nav {
  overflow: auto;
  font-size: 23px;
  text-align: center;
  vertical-align: middle;
  padding: 0.5em;
}
 nav a {
    text-decoration: none;
    color: #fff;
    padding-left: 1em;
    border: none;
    text-align: center;
    border-radius: 2px;
  }

 nav a:visited, a:link {
    color: #fff;
    text-decoration: none;
  }

 nav a:hover {
    background-color: #91cfed;
    border-color: #91cfed;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
    color: #fff;
    text-decoration: underline;
  }

 nav a.active {
    text-decoration: underline;
  }


.vacuumLine{
  width: 100%;
  height: 6px;
}

.category {
  background: #2086c8;
  width: 100%;
  height: 50px;
  letter-spacing: 1px;
  padding: 0; margin: 0;
  box-shadow: 0 5px 10px rgba(0,0,0,.3);
  text-align: center;
  font-size: 23px;
  color: #FFFFFF;
}`]
})
export class UserComponent {
}
