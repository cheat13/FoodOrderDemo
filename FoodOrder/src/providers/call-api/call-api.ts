import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CallApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CallApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CallApiProvider Provider');
    
  }
  public GetAllFoodOrder()
  {
    return this.http.get('https://localhost:5001/api/Shop/GetMenu');

  }

}
