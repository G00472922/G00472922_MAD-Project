import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { ShortPersonCardComponent } from '../../components/short-person-card/short-person-card.component';
import { addIcons } from 'ionicons';
import { heartOutline, heart } from 'ionicons/icons';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  imports: [
    IonLabel,
    IonItem,
    IonAccordion,
    IonAccordionGroup,
    IonIcon,
    IonButton,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    ShortPersonCardComponent,
    IonCardContent,
  ],
})
export class MovieDetailsPage implements OnInit {
  routeId: string | null;
  movieCast: any;
  movieCrew: any;
  movieOverview: { poster: string; overview: string };
  isFaved: boolean;

  constructor(
    private route: ActivatedRoute,
    private ms: MoviesService,
  ) {
    this.routeId = this.route.snapshot.paramMap.get('id');
    this.movieOverview = { poster: '', overview: '' };
    this.isFaved = false;

    addIcons({ heartOutline, heart });
  }

  ngOnInit() {
    this.movieDetails();
  }

  async movieDetails() {
    if (!this.routeId) return;

    const retrievedData = await this.ms.getMovieDetails(this.routeId);
    this.movieOverview = await this.ms.getMovieOverview(this.routeId);

    this.movieCast = retrievedData[0];
    this.movieCrew = retrievedData[1];
  }

  favedMovie() {
    this.isFaved = !this.isFaved;
  }
}
