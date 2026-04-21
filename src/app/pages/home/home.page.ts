import { Component, OnInit } from '@angular/core';
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
import { MoviesService } from 'src/app/services/movies.service';

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
export class HomePage implements OnInit {
  data: any;

  constructor(private ms: MoviesService) {}

  ngOnInit() {
    this.getTrending();
  }

  async getTrending() {
    this.data = await this.ms.getTrendingToday();
    console.log(this.data);
  }
}
