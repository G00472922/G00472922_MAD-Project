import { Component } from '@angular/core';
import {
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonSearchbar,
    IonRow,
    IonButton,
    RouterLink,
    IonGrid,
    IonCol,
    MovieCardComponent,
    IonContent,
  ],
})
export class HomePage {
  constructor() {}

  ngOnInit() {}
}
