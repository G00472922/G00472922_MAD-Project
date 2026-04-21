import { Component, input } from '@angular/core';
import {
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonCard,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heartOutline, heart } from 'ionicons/icons';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  imports: [
    IonIcon,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    RouterLink,
  ],
})
export class MovieCardComponent {
  id = input.required<string>();
  title = input.required<string>();
  releaseDate = input.required<string>();
  overview = input.required<string>();
  poster = input.required<string>();

  isFaved: boolean;

  constructor() {
    this.isFaved = false;

    addIcons({ heartOutline, heart });
  }

  favedMovie() {
    this.isFaved = !this.isFaved;
  }
}
