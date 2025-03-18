import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class HomePage {
  constructor(
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
  ) { }
  ngOnInit() {
  }
  emailInput: string = '';
  passwordInput: string = '';
  async onSubmit() {




    try {
      await this.authService.register(this.emailInput, this.passwordInput);
      const alert = await this.alertController.create({
        header: 'Sesion creada',
        message: 'Tu sesion a sido creada con exito',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigateByUrl("login");
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'Tu sesion no se pudo iniciar ',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  onSignUp() {
    this.router.navigateByUrl("login");
  }
}