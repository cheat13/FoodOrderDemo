import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Food, GlobalVariables } from '../../app/models';
import { CallApiProvider } from '../../providers/call-api/call-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public menu: Food[] = [];

  constructor(public navCtrl: NavController, private http: HttpClient,public CallApi: CallApiProvider) {

  }

  ionViewDidLoad() {
    this.getMenu();
  }

  goBasket() {
    this.navCtrl.push('OrderPage');
  }

  getMenu() {
    this.http.get<Food[]>('http://localhost:5000/api/Shop/GetMenu')
      .subscribe(data => {
        this.menu = data;
        console.log(this.menu);
      })
  }

  addFood(food: Food) {
    GlobalVariables.order.foods.push(food);
  }
}
