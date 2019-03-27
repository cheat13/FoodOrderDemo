import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime, ToastController, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HttpClient, public callApi: CallApiProvider,
    public toastCtrl: ToastController, public alertCtrl: AlertController) {
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
    this.showConfirmDelete(index);
  }

  calcTotalPrice() {
    this.totalPrice = this.foods.length > 0 ? this.foods.map(it => it.price * it.amount).reduce((a, b) => a + b) : 0;
  }

  sendToKitchen() {
    (this.foods.length > 0) ? this.showConfirmSendOrder() : this.presentToastEmpty();
  }

  presentToastSend() {
    const toast = this.toastCtrl.create({
      message: 'ส่งรายการสำเร็จ',
      duration: 2000,
    });
    toast.present();
  }

  presentToastEmpty() {
    const toast = this.toastCtrl.create({
      message: 'ไม่มีรายการ!',
      duration: 2000,
    });
    toast.present();
  }

  showConfirmSendOrder() {
    let order = 'จำนวน / รายการ<br>';
    this.foods.forEach(it => {
      order += it.amount + ' ------> ' + it.name + '<br>'
    })
    const confirm = this.alertCtrl.create({
      title: 'ยืนยันรายการ?',
      message: order + '<br>ทั้งหมด ' + this.totalPrice + ' บาท',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            let order = new Order();
            order.foods = this.foods;
            order.totalPrice = this.totalPrice;
            this.callApi.SendToKitchen(order).subscribe(() => {
              GlobalVariables.foods = [];
              this.presentToastSend();
              this.navCtrl.pop();
            })
          }
        }
      ]
    });
    confirm.present();
  }

  showConfirmDelete(index: number) {
    const confirm = this.alertCtrl.create({
      title: 'ต้องการลบรายการนี้?',
      message: this.foods[index].name,
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            this.foods.splice(index, 1);
            this.calcTotalPrice();
          }
        }
      ]
    });
    confirm.present();
  }

  showPromptComment(index: number) {
    let comment = this.foods[index].comment;
    const prompt = this.alertCtrl.create({
      title: 'Comment',
      inputs: [
        {
          name: 'comment',
          placeholder: (comment != 'string') ? comment : 'เช่น สุกมาก/น้อย, เผ็ดมาก/น้อย'
        },
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'บันทึก',
          handler: data => {
            this.foods[index].comment = data.comment || comment;
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}
