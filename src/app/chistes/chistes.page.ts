import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol, IonItem } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BaseDatosService, Task } from '../task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chistes',
  templateUrl: './chistes.page.html',
  styleUrls: ['./chistes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonGrid, IonRow, IonCol, IonItem]
})
export class ChistesPage implements OnInit {
  constructor(
    private alertController: AlertController,
    public reviewService: BaseDatosService,
    private router: Router,
    private authService: AuthService,

  ) { }

  ngOnInit() {
    this.tasks$ = this.reviewService.getTasks();

  }
  ChisteInput: string = "";
  TipoInput: string = "";
  ExplicacionInput: string = "";
  tasks$: Observable<Task[]> = new Observable<Task[]>();

  async onSubmit() {
    if (this.ChisteInput && this.TipoInput && this.ExplicacionInput) {
      const newTask: Task = {
        Chiste: this.ChisteInput,
        Tipo: this.TipoInput,
        Explicacion: this.ExplicacionInput,
      }
      await this.reviewService.addTask(newTask);
      this.ChisteInput = "";
      this.TipoInput = "";
      this.ExplicacionInput = "";

      const alert = await this.alertController.create({
        header: 'Review agregada',
        message: 'Tu review se agrego',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'Tu review no se pudo agregar',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  borrar(id: string) {
    this.reviewService.deleteTask(id);
    const alert = this.alertController.create({
      header: 'review fue borrada',
      message: 'Tu review se borro',
      buttons: ['OK'],
    });
  }

  async Editar(id: string, task: Task) {
    const alert = await this.alertController.create({
      header: 'Editar Review',
      inputs: [
        {
          name: 'Chiste',
          type: 'text',
          placeholder: 'Chiste',
          value: task.Chiste
        },
        {
          name: 'Tipo',
          type: 'text',
          placeholder: 'Tipo',
          value: task.Tipo
        },
        {
          name: 'Explicacion',
          type: 'text',
          placeholder: 'Opinion',
          value: task.Explicacion
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.Chiste && data.Tipo && data.Explicacion) {
              const updatedTask: Partial<Task> = {
                Chiste: data.Chiste,
                Tipo: data.Tipo,
                Explicacion: data.Explicacion,
              };
              this.reviewService.updateTask(id, updatedTask);
              this.showAlert('Review actualizada', 'La review ha sido actualizada correctamente.');
            } else {
              this.showAlert('Error', 'Todos los campos son obligatorios.');
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  onSignUp() {
    this.authService.logout();
    this.router.navigateByUrl("sign");
  }
}
