import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/angular/standalone';

import { MovieCardComponent } from 'src/app/components/movie-card/movie-card.component';

import { FavouritesService } from 'src/app/services/favourites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  imports: [AsyncPipe, IonCol, IonContent, IonGrid, IonRow, MovieCardComponent],
})
export class FavouritesPage {
  favourites$ = this.fs.favourites$;

  constructor(private fs: FavouritesService) {}
}
