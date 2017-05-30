/**
 * Created by nardm on 21.01.17.
 */
/**
 * Created by nardm on 17.12.16.
 */
import {Component, OnInit, Input, OnDestroy} from '@angular/core'
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import Account = ClientInterface.Account;
import {ClientInterface} from "../../model/client";
import {ClientService} from "../../http/client.service";
import {MdDialog, MdDialogRef} from "@angular/material";
import {UserService} from "../../../http/user.service";
import ServiceRequest = ServiceRequestInterface.ServiceRequest;
import {ServiceRequestInterface} from "../../../model/service-request";

@Component({

  selector: 'client-item',
  templateUrl: 'client.component.html',
  styleUrls: ['client.component.scss'],
})
export class FormClientItemComponent implements OnInit, OnDestroy {
  ngOnInit() {
  }

  client: Account;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private clientService: ClientService,
              private userService: UserService,
              public dialog: MdDialog) {
    this.routeSubscription = route.params.subscribe(params =>
      this.clientService.getClient(params['id'])
        .then(client => {
          this.client = client;
          this.getServiceRequest(client.id)
        //  this.getBlockAccount();
        }));
  }

  private routeSubscription: Subscription;
  selectedOption: string ="";
  historyAppBool: boolean = false;
  historyUser: ServiceRequest;


  getServiceRequest(clientId: number) {
    this.userService.getServiceRequestUser(clientId)
      .then(res => this.historyUser = res)
  }


  openDialog() {
    let dialogRef = this.dialog.open(DialogClient);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (result){
        debugger;
        this.blockAccount(result)
      }
    });
  }

  UserOnBlock(){

  }

  blockAccount(result: string) {
    this.clientService.blockAccount(this.client.id, '{"rezon":' +'"'+ result + '"'+'}');
  }

  getBlockAccount() {
    this.clientService.getBlockAccount(this.client.id)
      .then(res => {
        if (res.rezon)
        this.selectedOption = res.rezon
      });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}

@Component({
  selector: 'client-dialog',
  templateUrl: 'client-dialog.html',
  styleUrls: ['client.component.scss'],
})
export class DialogClient {
  constructor(public dialogRef: MdDialogRef<DialogClient>,
              public clientService: ClientService) {
  }

  rezon: string = "";


}

export interface UserBlock {
  manager_id: number;
  id: number;
  userId: number;
  date: number;
  rezon: string;
}
