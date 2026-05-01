import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

import { Movie } from 'src/app/models/Movie.model';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private readonly storageKey = 'favourites';

  // Setting up a "Source of Truth" i.e. a data source that stores (BehaviorSubject) the current list of favourite movies and automatically broadcasts (Observable) any updates to listeners.
  private favouritesSubject = new BehaviorSubject<Movie[]>([]);
  favourites$ = this.favouritesSubject.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();

    const stored = (await this.storage.get(this.storageKey)) || [];

    // Broadcast the new data to all listeners.
    this.favouritesSubject.next(stored);
  }

  async toggleFavourite(movie: Movie) {
    const current = this.favouritesSubject.value;
    const exists = current.some((item) => item.id === movie.id);

    // If the movie does not exist, remove the movie; otherwise, add the movie to the user's favourites.
    const updated = exists
      ? current.filter((item) => item.id !== movie.id)
      : [...current, movie];

    await this.storage.set(this.storageKey, updated);
    this.favouritesSubject.next(updated);
  }
}
