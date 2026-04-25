import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly apiKey = env.apiKey;
  private readonly baseUrl = env.apiUrl;

  private options: HttpOptions;

  constructor(private storage: Storage) {
    this.init();
    this.options = { url: '' };
  }

  async init() {
    await this.storage.create();
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

  async getTrendingToday() {
    this.options = { url: `${this.baseUrl}/trending/movie/day?${this.apiKey}` };
    const res: HttpResponse = await CapacitorHttp.get(this.options);

    const mappedRes = res.data.results.map(
      ({ id, title, release_date, overview, poster_path }: any) => ({
        id,
        title,
        release_date,
        overview,
        poster: poster_path,
      }),
    );
    return mappedRes;
  }

  async getSearchedMovie(search: string) {
    this.options = {
      url: `${this.baseUrl}/search/movie?query=${search}&${this.apiKey}`,
    };
    const res: HttpResponse = await CapacitorHttp.get(this.options);

    const mappedRes = res.data.results.map(
      ({ id, title, release_date, overview, poster_path }: any) => ({
        id,
        title,
        release_date,
        overview,
        poster: poster_path,
      }),
    );
    return mappedRes;
  }

  async getMovieOverview(id: number) {
    this.options = {
      url: `${this.baseUrl}/movie/${id}?${this.apiKey}`,
    };
    const res: HttpResponse = await CapacitorHttp.get(this.options);
    return {
      title: res.data.title,
      poster: res.data.poster_path,
      overview: res.data.overview,
    };
  }

  async getMovieDetails(id: number) {
    this.options = {
      url: `${this.baseUrl}/movie/${id}/credits?${this.apiKey}`,
    };

    const res: HttpResponse = await CapacitorHttp.get(this.options);
    return [res.data.cast, res.data.crew];
  }

  async getPersonDetails(id: number) {
    this.options = {
      url: `${this.baseUrl}/person/${id}?${this.apiKey}`,
    };

    const res: HttpResponse = await CapacitorHttp.get(this.options);
    return res.data;
  }

  async getPersonCredits(id: number) {
    this.options = {
      url: `${this.baseUrl}/person/${id}/movie_credits?${this.apiKey}`,
    };

    const res: HttpResponse = await CapacitorHttp.get(this.options);
    return res.data;
  }
}
