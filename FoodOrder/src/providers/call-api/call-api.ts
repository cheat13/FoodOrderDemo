import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food, Order } from '../../app/models';

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
    this.host = "https://kritna.azurewebsites.net/";
  }

  public GetAllFoodOrder() {
    return this.http.get<Food[]>(this.host + 'api/Shop/GetMenu');
  }

  public SendToKitchen(order: Order) {
    return this.http.post(this.host + 'api/Orders/AddOrder', order);
  }

}
