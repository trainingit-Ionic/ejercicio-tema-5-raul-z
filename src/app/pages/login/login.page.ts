import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from  "@angular/router";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private  authService:  AuthService, private  router:  Router,
    public toastController: ToastController) { }

  public checking: boolean = false;

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Error al hacer login. Compruebe usuario y contraseña y pruebe de nuevo',
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }

  login(form){
    this.checking = true;
    this.authService.login(form.value).subscribe((res)=>{
      if (res) {
        this.router.navigateByUrl('menu');
      } else {
        this.checking = false;
        this.presentToast();
      }
        
      
    });
  }

}
