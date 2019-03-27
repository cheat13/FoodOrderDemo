import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Food, GlobalVariables, Order } from '../../app/models';
import { CallApiProvider } from '../../providers/call-api/call-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public menu: Food[] = [];
  public foods: Food[] = [];

  constructor(public navCtrl: NavController, private http: HttpClient, public callApi: CallApiProvider, public toastCtrl: ToastController) {

  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter HomePage');
    this.getMenu();
    this.foods = GlobalVariables.foods;
    console.log(this.foods);
  }

  goBasket() {
    GlobalVariables.foods = this.foods;
    this.navCtrl.push('OrderPage');
  }

  getMenu() {
    this.callApi.GetAllFoodOrder().subscribe(data => {
      this.menu = data;
      console.log(this.menu);
    })
  }

  addFood(food: Food) {
    if (this.foods.every(it => it.id != food.id)) {
      food.amount = 1;
      this.foods.push(food);
      this.presentToastAdded();
    }
    else {
      this.presentToastAlready();
    }
    console.log(GlobalVariables.foods);
  }

  presentToastAdded() {
    const toast = this.toastCtrl.create({
      message: 'เพิ่มรายการสำเร็จ',
      duration: 2000,
    });
    toast.present();
  }

  presentToastAlready() {
    const toast = this.toastCtrl.create({
      message: 'มีรายการนี้แล้ว!',
      duration: 2000,
    });
    toast.present();
  }
}
