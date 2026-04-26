import { Component, OnInit } from '@angular/core';

import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
  IonSearchbar,
} from '@ionic/angular/standalone';

import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

import { MoviesService } from 'src/app/services/movies.service';

import { Movie } from 'src/app/models/Movie.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonRow,
    IonSearchbar,
    MovieCardComponent,
  ],
})
export class HomePage implements OnInit {
  movies: Movie[] | null;
  searched: string;

  constructor(private ms: MoviesService) {
    this.movies = null;
    this.searched = '';
  }

  ngOnInit() {
    this.getTrending();
  }

  async getTrending() {
    this.movies = await this.ms.getTrendingToday();
  }

  async getInputMovie() {
    this.movies = await this.ms.getSearchedMovie(this.searched);
  }

  handleSearch(event: any) {
    this.searched = event.target.value;
    this.searched === '' ? (this.movies = null) : this.getInputMovie();
  }
}
