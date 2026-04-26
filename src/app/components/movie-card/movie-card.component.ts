import { Component, OnInit, input } from '@angular/core';
import {
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonCard,
  IonButton,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { FavouriteButtonComponent } from '../favourite-button/favourite-button.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  imports: [
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    RouterLink,
    FavouriteButtonComponent,
  ],
})
export class MovieCardComponent implements OnInit {
  id = input.required<number>();
  title = input.required<string>();
  releaseDate = input.required<string>();
  overview = input.required<string>();
  poster = input.required<string>();

  constructor() {}

  ngOnInit() {}
}
