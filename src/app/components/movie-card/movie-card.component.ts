import { Component, OnInit, input } from '@angular/core';
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
import { MoviesService } from 'src/app/services/movies.service';

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
export class MovieCardComponent implements OnInit {
  id = input.required<number>();
  title = input.required<string>();
  releaseDate = input.required<string>();
  overview = input.required<string>();
  poster = input.required<string>();
  userFaves = input.required<{ id: number; title: string; poster: string }[]>();
  isFaved: boolean;

  constructor(private ms: MoviesService) {
    this.isFaved = false;

    addIcons({ heartOutline, heart });
  }

  ngOnInit() {
    for (const faved of this.userFaves()) {
      if (this.id() === faved.id) {
        this.isFaved = true;
        break;
      }
    }
  }

  async favedMovie() {
    if (!this.isFaved) {
      const movie = {
        id: this.id(),
        title: this.title(),
        poster: this.poster(),
      };

      await this.ms.setFavourite('favourites', movie);
    } else {
      await this.ms.removeFavourite('favourites', this.id());
    }

    this.isFaved = !this.isFaved;
  }
}
