/**
 * Created by nardm on 03.01.17.
 */


import { Injectable }    from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import {TokenService} from "../../manager/http/token.serviece";
import {PropertyInterface} from "../../manager/model/property";
import Property = PropertyInterface.Property;
import {EmptyAnswer} from "../../manager/http/answer";


@Injectable()
export class ConstService {

  constructor(private http: Http,
              private tokenService: TokenService) {
  }

  typeReturn(type, jsonRes) {
    switch (type) {
      case "categories":
        return jsonRes.data.categories;
      case "properties":
        return jsonRes.data.properties;
      case "responses":
        return jsonRes.data.responses;
      case "requests":
        return jsonRes.data.requests;
      case "reviews":
        return jsonRes.data.reviews;
      case "values":
        return jsonRes.data.values;
      case "forms":
        return jsonRes.data.forms;
      case "companies":
        return jsonRes.data.companies;
      case "services":
        return jsonRes.data.services;
      case "accounts":
        return jsonRes.data.accounts;
      case "cities":
        return jsonRes.data.cities;
      case "chats":
        return jsonRes.data.chats;
      case "users":
        return jsonRes.data.users;
      default:
        return jsonRes.data;
    }
  }

  search<T>(url: string,  type?: string): Observable<T[]> {
    return this.tokenService.token()
      .map(token => new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }))
      .mergeMap(headers => this.http
        .get(url,
          {headers: headers})
        .map(res => {
          let jsonRes = res.json();
          return this.typeReturn(type, jsonRes);
        }))
  }

  get<T>(url: string,type?: string): Promise<T> {
    return this.tokenService.token()
      .map(token => new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }))
      .mergeMap(headers => this.http
        .get(url, {headers: headers})
        .map(res => {
          let jsonRes = res.json();
          return this.typeReturn(type, jsonRes);
        }))
      .toPromise()
      .catch(this.handleError);
  }


  getId<T>(url: string, id: number | string, type?: string): Promise<T> {
    return this.tokenService.token()
      .map(token => new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }))
      .mergeMap(headers => this.http
        .get(url, {headers: headers})
        .map(res => {
          return this.typeReturn(type, res.json())
            .find(item => item.id === Number(id));
        }))
      .toPromise()
      .catch(this.handleError);
  }


  post<T>(url: string, item: T): Promise<T> {
    return this.tokenService.token()
      .map(token => new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }))
      .mergeMap(headers => this.http.post(url,
        item,
        {headers: headers})
        .map(a => a.json()))
      .toPromise()
      .catch(this.handleError);
  }

  postAnswer<T>(url: string, item: T|Property): Promise<EmptyAnswer> {
    return this.tokenService.token()
      .map(token => new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }))
      .mergeMap(headers => this.http.post(url,
        item,
        {headers: headers})
        .map(a => a.json()))
      .toPromise()
      .catch(this.handleError);
  }

  put<T>(url: string, item: T): Promise<T> {
    return this.tokenService.token()
      .map(token => new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }))
      .mergeMap(headers =>
        this.http.put(url,
          item,
          {headers: headers})
          .map(a => a.json()))
      .toPromise()
      .catch(this.handleError);
  }

  postSingle(url: string) {
    return this.tokenService.token()
      .map(token => new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }))
      .mergeMap(headers => this.http
        .post(url, null,
          {headers: headers})
        .map(a => a.json()))
      .toPromise()
      .catch(this.handleError);
  }

  delete(url: string) {
    return this.tokenService.token()
      .map(token => new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }))
      .mergeMap(headers => this.http
        .delete(url, {headers: headers})
        .map(a => a.json()))
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }
}

