import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from  "@angular/router";
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private  authService:  AuthService, private  router:  Router,
    public toastController: ToastController) { }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Acceso denegado',
      duration: 2000
    });
    toast.present();
    this.router.navigateByUrl('login');
  }


  ngOnInit() {

    let isLog = this.authService.isLogged();

    if (!isLog) {
      this.presentToast();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
