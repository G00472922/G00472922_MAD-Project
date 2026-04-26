import { Component } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
} from '@ionic/angular/standalone';
import { FavouritesService } from 'src/app/services/favourites.service';
import { RouterLink } from '@angular/router';
import { FavouriteButtonComponent } from 'src/app/components/favourite-button/favourite-button.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  imports: [
    IonCol,
    IonRow,
    IonCard,
    IonButton,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonGrid,
    RouterLink,
    FavouriteButtonComponent,
    AsyncPipe,
    IonContent,
  ],
})
export class FavouritesPage {
  favourites$ = this.fs.favourites$;

  constructor(private fs: FavouritesService) {}
}
