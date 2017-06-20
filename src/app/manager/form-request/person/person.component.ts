/**
 * Created by nardm on 07.11.16.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { BasketRequestInterface } from '../../chat/Model/BasketRequest';
import ClientAccount = BasketRequestInterface.ClientAccount;
import { ConstService } from '../../../const/http/service-const.service';


@Component({
    selector: 'person',
    templateUrl: 'person.component.html',
    styleUrls: ['person.component.scss'],
})
export class PersonComponent implements OnChanges {

    @Input() private person: ClientAccount;

    constructor(private service: ConstService) {
    }

    ngOnChanges() {
        if (this.person) {
            if (this.person.avatar_hash) {
                this.person = this.getImage(this.person)
            }
        }
    }

    private getImage(person: ClientAccount) {
        let url;
        let self = this;
        url = `manage/v1/skin/${person.skin_id}/icon`;
        self.service.getAvatar(url)
            .subscribe(item => {
                person.logo = item;
            });
        return person;
    }


}


