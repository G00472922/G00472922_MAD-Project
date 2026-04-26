import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { ShortPersonCardComponent } from '../../components/short-person-card/short-person-card.component';
import { addIcons } from 'ionicons';
import { heartOutline, heart } from 'ionicons/icons';
import { FavouriteButtonComponent } from 'src/app/components/favourite-button/favourite-button.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  imports: [
    IonLabel,
    IonItem,
    IonAccordion,
    IonAccordionGroup,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    ShortPersonCardComponent,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    FavouriteButtonComponent,
  ],
})
export class MovieDetailsPage implements OnInit {
  routeId: string | null;
  movieId: number;
  movieCast: any;
  movieCrew: any;
  movieOverview: { title: string; poster: string; overview: string };

  constructor(
    private route: ActivatedRoute,
    private ms: MoviesService,
  ) {
    this.routeId = this.route.snapshot.paramMap.get('id');
    this.movieId = -1;
    if (this.routeId !== null) {
      this.movieId = parseInt(this.routeId, 10);
    }

    this.movieOverview = { title: '', poster: '', overview: '' };

    addIcons({ heartOutline, heart });
  }

  ngOnInit() {
    if (this.routeId) this.movieId = parseInt(this.routeId);

    this.movieDetails();
  }

  async movieDetails() {
    const retrievedData = await this.ms.getMovieDetails(this.movieId);
    this.movieOverview = await this.ms.getMovieOverview(this.movieId);

    this.movieCast = retrievedData[0];
    this.movieCrew = retrievedData[1];
  }
}
