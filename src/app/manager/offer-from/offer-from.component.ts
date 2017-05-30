/**
 * Created by nardm on 19.12.16.
 */
/**
 * Created by nardm on 07.11.16.
 */
import {Component, OnInit, Input} from '@angular/core';
import { Router }            from '@angular/router';

import {UserService} from "../http/user.service";
import {CategoryService} from "../http/category.service";

@Component({

  selector: 'offer-from',
  templateUrl: 'offer-from.component.html',
  styleUrls: ['offer-from.component.scss'],
})
export class OfferFromComponent implements OnInit{
  ngOnInit(): void {
  }


  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private router:Router){}


}


