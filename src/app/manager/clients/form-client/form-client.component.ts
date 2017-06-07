/**
 * Created by nardm on 17.12.16.
 */
import {Component, OnInit, Input} from '@angular/core'
import {Router} from "@angular/router";
import Client = ClientInterface.Client;
import {ClientInterface} from "../model/client";
import {ClientService} from "../../http/client.service";
import ServiceRequest = ServiceRequestInterface.ServiceRequest;
import {ServiceRequestInterface} from "../../model/service-request";
import Request = ServiceRequestInterface.Request;
import {UserService} from "../../http/user.service";
import Account = ClientInterface.Account;


@Component({

  selector: 'form-client',
  templateUrl: 'form-client.component.html',
  styleUrls: ['form-client.component.scss']
})
export class FormClientComponent implements OnInit {
  ngOnInit() {
    this.getServiceRequest();
  }

  public historyAppBool: boolean = false;
  public historyUser: Request;

  constructor(private router: Router,
              private clientService: ClientService,
              private userService: UserService) {
  }

  onDetail(clientId: number): void {
    this.router.navigate(['client', 'user', clientId]);
  }

  @Input() public client;

  getServiceRequest(): void {
    this.userService.getServiceRequestUser(this.client.id)
        .then(res => this.historyUser = res)
  }

}
