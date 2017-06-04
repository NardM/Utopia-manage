/**
 * Created by nardm on 19.12.16.
 */
/**
 * Created by nardm on 07.11.16.
 */
import {Component, OnInit, Input} from '@angular/core';
import { Router }            from '@angular/router';
import {UserService} from "../../http/user.service";
import {RequestConfirmInterface} from "../../model/service-request-confirm";
import RequestConfirm = RequestConfirmInterface.RequestConfirm;


@Component({

  selector: 'item-confirm',
  templateUrl: 'response-confirm.component.html',
  styleUrls: ['response-confirm.component.scss'],
})
export class ItemConfirmComponent implements OnInit{
  ngOnInit(): void {
    this.getServiceConfirm();
  }

  confirm: RequestConfirm;
  @Input() requestId;

  constructor(
    private userService: UserService,
    private router:Router){}


    getServiceConfirm(){
      this.userService.getServiceRequestConfirm(this.requestId )
        .then(confirm=> this.confirm = confirm)
    }

}

