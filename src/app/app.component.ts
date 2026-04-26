import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonRouterOutlet,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { heart, home } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonRouterOutlet,
    RouterLink,
  ],
})
export class AppComponent {
  constructor() {
    addIcons({ heart, home });
  }
}
