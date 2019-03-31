import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Order } from '../../app/models';

/**
 * Generated class for the OrderInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-info',
  templateUrl: 'order-info.html',
})
export class OrderInfoPage {

  order: Order = new Order();
  line: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.order = navParams.get('order');
    this.line = "-----------------------------------------------------------------";
    console.log(this.order);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderInfoPage');
  }

}
