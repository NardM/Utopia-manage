/**
 * Created by nardm on 30.05.17.
 */
/**
 * Created by nardm on 08.12.16.
 */
import { Component } from '@angular/core';
import {GlobalState} from "../../global.state";

@Component({
    selector: 'top-bar',
    templateUrl: 'top-bar.component.html',
     styleUrls: ['top-bar.component.scss']
})
export class TopBarComponent {

    public isMenuCollapsed:boolean = false;

    constructor(private _state: GlobalState) {
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    public onCollapse() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
        return false;
    }
}
