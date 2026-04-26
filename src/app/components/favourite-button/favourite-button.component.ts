import { Component, OnInit, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';

import { IonButton, IonIcon } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { heartOutline, heart } from 'ionicons/icons';

import { FavouritesService } from 'src/app/services/favourites.service';

import { Movie } from 'src/app/models/Movie.model';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.scss'],
  imports: [AsyncPipe, IonButton, IonIcon],
})
export class FavouriteButtonComponent implements OnInit {
  btnType = input.required<string>();
  movie = input.required<Movie>();

  isFaved: boolean;

  favourites$ = this.fs.favourites$;

  constructor(private fs: FavouritesService) {
    this.isFaved = false;

    addIcons({ heartOutline, heart });
  }

  ngOnInit() {
    this.fs.favourites$.subscribe((faves) => {
      for (const fav of faves) {
        if (fav.id === this.movie().id) {
          this.isFaved = true;
          break;
        }
        this.isFaved = false;
      }
    });
  }

  get isFavourite(): Observable<boolean> {
    return this.fs.favourites$.pipe(
      map((favs: { id: any }[]) =>
        favs.some((m: { id: any }) => m.id === this.movie().id),
      ),
    );
  }

  toggle() {
    this.fs.toggleFavourite(this.movie());
  }
}
