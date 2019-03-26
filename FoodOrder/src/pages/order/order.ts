import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Order, GlobalVariables } from '../../app/models';

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

  order: Order = new Order;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }


  ionViewDidEnter() {
    console.log('ionViewDidEnter OrderPage');
    this.order = GlobalVariables.order;
    console.log(this.order);
  }

  onClick() {
    this.order.totalPrice = this.order.foods.map(it => it.price * it.amount).reduce((a, b) => a + b);
  }

  sendToKitchen() {
    this.http.post('http://localhost:5000/api/Orders/AddOrder', this.order)
      .subscribe(data => {
        console.log('ส่งแล้วนะ');
        GlobalVariables.order = new Order();
      })
  }

}
