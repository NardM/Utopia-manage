import { Injectable }    from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Category} from "../model/category";
import {Answer} from "./answer";
import {ConstService} from "../../const/http/service-const.service";
import {TokenService} from "./token.serviece";
import {Consts} from "../../const/app-const";


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

  getCategories2(offset?: number){
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

  getSubCategory(id: number) {
    return this.constService.get<Category[]>(this.categoriesUrl + '/' + id + '/' + 'subcategories', "categories");
  }

  search(term: string) {
    let url = this.categorySearchUrl + term;
    return this.constService.search<Category>(url, 'categories');
  }

  postCreateCategory(createCategory: Category) {
    let url = this.editCategoryUrl;
    return this.constService.post<Category>(url, createCategory);
  }

  postCreateCategoryAnswer(createCategory: Category) {
    let url = this.editCategoryUrl;
    return this.constService.postAnswer<Category>(url, createCategory);
  }

  postAddSubCategory(categoryId: number, subCategoryId: number) {
    let url = this.editCategoryUrl + '/' + categoryId + '/subcategory/' + subCategoryId;
    return this.constService.postSingle(url);
  }

  deleteAddSubCategory(categoryId: number, subCategoryId: number) {
    //debugger;
    let url = this.editCategoryUrl + '/' + categoryId + '/subcategory/' + subCategoryId;
    this.constService.delete(url);
  }

  deleteCategory(categoryId: number) {
    let url = this.editCategoryUrl + '/'+categoryId;
    this.constService.delete(url);
  }

  putEditCategory(category: Category) {
    let url = this.editCategoryUrl + '/' + category.id;
    return this.constService.put<Category>(url, category);
  }

  publishCategory(categoryId: number) {
    let url = this.editCategoryUrl + '/' + categoryId+'/publish';
    return this.constService.postSingle(url);
  }
  blockedCategory(categoryId: number) {
    let url = this.editCategoryUrl + '/' + categoryId+'/block';
    return this.constService.postSingle(url);
  }

}
