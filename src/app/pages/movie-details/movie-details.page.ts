import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  IonAccordion,
  IonAccordionGroup,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { heartOutline, heart } from 'ionicons/icons';

import { FavouriteButtonComponent } from 'src/app/components/favourite-button/favourite-button.component';
import { ShortPersonCardComponent } from 'src/app/components/short-person-card/short-person-card.component';

import { MoviesService } from 'src/app/services/movies.service';

import { CastMember, CrewMember, Movie } from 'src/app/models/Movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  imports: [
    IonAccordion,
    IonAccordionGroup,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonItem,
    IonLabel,
    IonRow,
    FavouriteButtonComponent,
    ShortPersonCardComponent,
  ],
})
export class MovieDetailsPage implements OnInit {
  movieId: number;
  movieCast: CastMember[];
  movieCrew: CrewMember[];
  movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private ms: MoviesService,
  ) {
    const routeId = this.route.snapshot.paramMap.get('id');

    this.movieId = -1;
    if (routeId !== null) this.movieId = parseInt(routeId, 10);
    this.movie = { id: -1, title: '' };

    this.movieCast = [];
    this.movieCrew = [];

    addIcons({ heartOutline, heart });
  }

  ngOnInit() {
    this.movieDetails();
  }

  async movieDetails() {
    this.movie = await this.ms.getMovieOverview(this.movieId);

    const retrievedData = await this.ms.getMovieDetails(this.movieId);
    const { mappedCast, mappedCrew } = retrievedData;

    this.movieCast = mappedCast;
    this.movieCrew = mappedCrew;
  }
}
