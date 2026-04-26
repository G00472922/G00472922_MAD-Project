import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MoviesService } from 'src/app/services/movies.service';
import { FavouritesService } from 'src/app/services/favourites.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonSearchbar,
    IonRow,
    IonButton,
    IonGrid,
    IonCol,
    MovieCardComponent,
    IonContent,
  ],
})
export class HomePage implements OnInit {
  movies: any;
  pageHeading: string;
  searched: string;
  isEmpty: boolean;

  constructor(
    private ms: MoviesService,
    private fs: FavouritesService,
  ) {
    this.pageHeading = "Today's Trending";
    this.searched = '';
    this.isEmpty = false;
  }

  ngOnInit() {
    this.getTrending();
  }

  async getTrending() {
    this.isEmpty = false;
    this.movies = await this.ms.getTrendingToday();
  }

  async getInputMovie() {
    this.movies = await this.ms.getSearchedMovie(this.searched);
  }

  handleSearch(event: any) {
    this.searched = event.target.value;
    if (this.searched === '') {
      this.isEmpty = true;
      this.movies = null;
      this.pageHeading = "Today's Trending";
    } else {
      this.isEmpty = false;
      this.pageHeading = `Showing "${this.searched}"`;
      this.getInputMovie();
    }
  }
}
