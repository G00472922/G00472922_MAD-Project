import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private favoritesSubject = new BehaviorSubject<any[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const stored = (await this.storage.get('favourites')) || [];
    this.favoritesSubject.next(stored);
  }

  async toggleFavorite(movie: { id: number; title: string; poster: string }) {
    const current = this.favoritesSubject.value;
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
    this.favoritesSubject.next(updated); // This broadcasts the change
  }

  async get(key: string) {
    return await this.storage.get(key);
  }

  async getMovieById(id: number) {
    const getFaves = (await this.storage.get('favourites')) || [];
    const exists = getFaves.find((m: { id: number }) => m.id === id);

    return exists;
  }

  async setFavourite(
    key: string,
    value: { id: number; title: string; poster: string },
  ) {
    const getFaves = (await this.storage.get('favourites')) || [];
    const exists = getFaves.find((m: { id: number }) => m.id === value.id);

    if (!exists) {
      getFaves.push(value);
      await this.storage.set(key, getFaves);
    }
  }

  async removeFavourite(key: string, value: number) {
    const getFaves = (await this.storage.get('favourites')) || [];
    const filteredFaves = getFaves.filter(
      (m: { id: number }) => m.id !== value,
    );

    await this.storage.set(key, filteredFaves);
  }
}
