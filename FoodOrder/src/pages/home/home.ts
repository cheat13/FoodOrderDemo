import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Food, GlobalVariables, Order } from '../../app/models';
import { CallApiProvider } from '../../providers/call-api/call-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public menu: Food[] = [];
  public order: Order = new Order();

  constructor(public navCtrl: NavController, private http: HttpClient, public callApi: CallApiProvider) {

  }

  ionViewDidEnter() {
    this.getMenu();
    this.order = GlobalVariables.order;
    if (this.order.foods == null) {
      this.order.foods = [];
    }
    console.log(this.order.foods);

  }

  goBasket() {
    this.navCtrl.push('OrderPage');
  }

  getMenu() {
    this.callApi.GetAllFoodOrder().subscribe(data => {
      this.menu = data;
      console.log(this.menu);
    })
  }

  addFood(food: Food) {
    if (this.order.foods.every(it => it.id != food.id)) {
      this.order.foods.push(food);
      GlobalVariables.order = this.order;
    }
    console.log(GlobalVariables.order);
  }
}
