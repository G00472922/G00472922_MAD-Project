import { Component, OnInit, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/angular/standalone';

import { FavouriteButtonComponent } from '../favourite-button/favourite-button.component';

import { Movie } from 'src/app/models/Movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  imports: [
    RouterLink,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    FavouriteButtonComponent,
  ],
})
export class MovieCardComponent implements OnInit {
  id = input.required<number>();
  title = input.required<string>();
  releaseDate = input<string>();
  overview = input<string>();
  poster = input<string>();

  movie: Movie;

  constructor() {
    this.movie = { id: -1, title: '' };
  }

  ngOnInit() {
    console.log(this.releaseDate());

    this.movie = { id: this.id(), title: this.title(), poster: this.poster() };
  }
}
