/**
 * Created by nardm on 19.12.16.
 */
/**
 * Created by nardm on 07.11.16.
 */
import {Component, OnInit, Input} from '@angular/core';
import { Router }            from '@angular/router';

import {UserService} from "../http/user.service";
import ServiceResponses = ServiceResponsesInterface.Responses;
import {ServiceResponsesInterface} from "../model/service-responses";
import Response = ServiceResponsesInterface.Respons;

@Component({

  selector: 'form-response',
  templateUrl: 'form-response.component.html',
  styleUrls: ['form-response.component.scss'],
})
export class FormResponseComponent implements OnInit {
  ngOnInit(): void {
    this.getServiceResponse();
  }

  public selectBool: boolean = true;
  public responses: Response[];
  @Input() public requestId;
  public load: boolean = true;

  constructor(private userService: UserService,
              private router: Router) {
  }


  getServiceResponse(): void {
    this.userService.getServiceResponse(this.requestId)
        .then(response => {
          this.responses = response;
          this.load = false;
        })
  }

}


