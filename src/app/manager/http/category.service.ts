import { Injectable }    from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Category} from "../model/category";
import { Answer, EmptyAnswer } from "./answer";
import {ConstService} from "../../const/http/service-const.service";
import {TokenService} from "./token.serviece";
import {Consts} from "../../const/app-const";
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CategoryService {


  private categoriesUrl = Consts.baseURL + 'v1/category';  // URL to web api
  private categoryLogoUrl = Consts.baseURL + 'manage/v1/category/';  // URL to web api
  private categoryUrl = Consts.baseURL + 'manage/v2/category';  // URL to web api
  private editCategoryUrl = Consts.baseURL + 'manage/v1/category';
  private categorySearchUrl = Consts.baseURL + 'manage/v1/category/search?like=';

  constructor(private http: Http,
              private tokenService: TokenService,
              private constService: ConstService
              ) {
  }

  getCategories2(offset?: number): Promise<Category[]>{
    let url = this.categoryUrl + '?count=20&offset='+offset;
    return this.constService.get<Category[]>(url, "categories");
  }

  getCategories(): Promise<Category[]>{
    return this.constService.get<Category[]>(this.categoriesUrl, "categories");
  }

  getCategory(id: number): Promise<Category> {
    let url = `${Consts.baseURL}v1/category/${id}`;
    return this.constService.get<Category>(url);
  }

  getSubCategory(id: number): Promise<Category[]> {
    return this.constService.get<Category[]>(this.categoriesUrl + '/' + id + '/' + 'subcategories', "categories");
  }

  search(term: string) {
    let url = this.categorySearchUrl + term;
    return this.constService.search<Category>(url, 'categories');
  }




}
