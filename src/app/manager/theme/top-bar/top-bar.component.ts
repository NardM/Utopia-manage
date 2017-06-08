/**
 * Created by nardm on 30.05.17.
 */
/**
 * Created by nardm on 08.12.16.
 */
import { Component } from '@angular/core';
import {GlobalState} from "../../global.state";
import {ClientService} from "../../http/client.service";
import {ClientInterface} from "../../clients/model/client";
import Account = ClientInterface.Account;
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    selector: 'top-bar',
    templateUrl: 'top-bar.component.html',
     styleUrls: ['top-bar.component.scss']
})
export class TopBarComponent {

    public isMenuCollapsed: boolean = false;
    public account: Account;

    constructor(private _state: GlobalState,
                private service: ClientService) {
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
        this.service.getAccount()
            .then(res => {
                this.account = res;
                Cookie.set('user_id', res.id.toString());
                localStorage.setItem('skin_id', res.skin_id.toString())
            })
    }

    public onCollapse(): boolean {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
        return false;
    }
}
