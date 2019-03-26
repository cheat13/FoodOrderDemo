import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { Order, GlobalVariables, Food } from '../../app/models';
import { CallApiProvider } from '../../providers/call-api/call-api';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  public foods: Food[] = [];
  totalPrice: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public callApi: CallApiProvider) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter OrderPage');
    this.foods = GlobalVariables.foods;
    this.calcTotalPrice();
    console.log(this.foods);
  }

  increase(index: number) {
    this.foods[index].amount += 1;
    this.calcTotalPrice();
  }

  decrease(index: number) {
    this.foods[index].amount -= (this.foods[index].amount == 1) ? 0 : 1;
    this.calcTotalPrice();
  }

  delete(index: number) {
    this.foods.splice(index, 1);
    this.calcTotalPrice();
  }

  calcTotalPrice() {
    this.totalPrice = this.foods.length > 0 ? this.foods.map(it => it.price * it.amount).reduce((a, b) => a + b) : 0;
  }

  sendToKitchen() {
    if (this.foods.length > 0) {
      let order = new Order();
      order.foods = this.foods;
      order.totalPrice = this.totalPrice;
      this.callApi.SendToKitchen(order).subscribe(data => {
        console.log('ส่งแล้วนะ');
        GlobalVariables.foods = [];
      })
    }
    this.navCtrl.pop();
  }

}
