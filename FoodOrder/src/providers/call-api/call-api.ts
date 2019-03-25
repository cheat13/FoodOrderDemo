import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../../app/models';

/*
  Generated class for the CallApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CallApiProvider {

  private host: string;

  constructor(public http: HttpClient) {
    console.log('Hello CallApiProvider Provider');
    this.host = "http://localhost:5000/";
  }

  public GetAllFoodOrder() {
    return this.http.get<Food[]>(this.host + 'api/Shop/GetMenu');
  }

}
