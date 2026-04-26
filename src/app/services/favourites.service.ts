import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

import { Movie } from 'src/app/models/Movie.model';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private favouritesSubject = new BehaviorSubject<any[]>([]);
  favourites$ = this.favouritesSubject.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();

    const stored = (await this.storage.get('favourites')) || [];
    this.favouritesSubject.next(stored);
  }

  async toggleFavourite(movie: Movie) {
    const current = this.favouritesSubject.value;
    const exists = current.some((item) => item.id === movie.id);
    let updated;

    if (exists) {
      // Remove the movie
      updated = current.filter((item) => item.id !== movie.id);
    } else {
      // Add the movie
      updated = [...current, movie];
    }

    await this.storage.set('favourites', updated);
    this.favouritesSubject.next(updated); // This broadcasts the change
  }
}
