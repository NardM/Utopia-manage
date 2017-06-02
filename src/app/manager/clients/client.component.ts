import {Component, OnInit} from '@angular/core';
import { Router }            from '@angular/router';

import {ClientInterface} from "./model/client";
import Clients = ClientInterface.Client;
import Account= ClientInterface.Account;
import {ClientService}     from '../http/client.service';

@Component({

    selector: 'client-app',
    templateUrl: 'client.component.html',
    styleUrls: ['client.component.scss'],
})
export class ClientComponent implements OnInit {

  ngOnInit() {
    this.clientService.getClients(this.offset)
      .then(clients => this.clients = clients)
  }

  clients: Array<Account>;
  array = [];
  offset = 0;
  throttle = 300;
  scrollDistance = 1;
  blockUpload: boolean = false;

  constructor(private clientService: ClientService,
              private router: Router) {
  }

  onScrollDown() {
    // add another 20 items
    if (!this.blockUpload) {
      this.offset += 20;
      this.getClients();
    }
  }

  getClients() {
    this.clientService.getClients(this.offset)
      .then(res => {
        if (res.length == 0) {
          this.blockUpload = true;
          return;
        }
        res.map(item => {
          this.clients.push(item)
        })
      });
  }

}
