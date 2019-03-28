import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallApiProvider } from '../../providers/call-api/call-api';
import { Order } from '../../app/models';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  orders: Order[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public callApi: CallApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    this.getOrders();
  }

  getOrders() {
    this.callApi.GetAllOrders().subscribe(data => {
      this.orders = data;
      console.log(this.orders);
    })
  }

  goOrderInfo(order: Order) {
    this.navCtrl.push("OrderInfoPage");
  }

}
