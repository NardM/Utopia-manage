/**
 * Created by nardm on 19.12.16.
 */
/**
 * Created by nardm on 07.11.16.
 */
import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { Router }            from '@angular/router';
import {UserService} from "../../http/user.service";
import {RequestConfirmInterface} from "../../model/service-request-confirm";
import RequestConfirm = RequestConfirmInterface.RequestConfirm;
import {ServiceRequestInterface} from "../../model/service-request";
import Request = ServiceRequestInterface.Request;


@Component({

  selector: 'item-confirm',
  templateUrl: 'response-confirm.component.html',
  styleUrls: ['response-confirm.component.scss'],
})
export class ItemConfirmComponent implements OnChanges {

  ngOnChanges(): void {
    this.getServiceConfirm();
  }

  public confirm: RequestConfirm;
  @Input() public request: Request;

  constructor(private userService: UserService,
              private router: Router) {
  }


  getServiceConfirm(): void {
    this.userService.getServiceRequestConfirm(this.request.id)
        .then(confirm => {
          this.confirm = confirm
        })
  }

}


