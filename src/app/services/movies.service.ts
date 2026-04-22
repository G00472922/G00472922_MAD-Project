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

  constructor() {
    this.options = { url: '' };
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

  async getMovieOverview(id: string) {
    this.options = {
      url: `${this.baseUrl}/movie/${id}?${this.apiKey}`,
    };
    const res: HttpResponse = await CapacitorHttp.get(this.options);
    return { poster: res.data.poster_path, overview: res.data.overview };
  }

  async getMovieDetails(id: string) {
    this.options = {
      url: `${this.baseUrl}/movie/${id}/credits?${this.apiKey}`,
    };

    const res: HttpResponse = await CapacitorHttp.get(this.options);
    return [res.data.cast, res.data.crew];
  }

  async getPersonDetails(id: string) {
    this.options = {
      url: `${this.baseUrl}/person/${id}?${this.apiKey}`,
    };

    const res: HttpResponse = await CapacitorHttp.get(this.options);
    return res.data;
  }

  async getPersonCredits(id: string) {
    this.options = {
      url: `${this.baseUrl}/person/${id}/movie_credits?${this.apiKey}`,
    };

    const res: HttpResponse = await CapacitorHttp.get(this.options);
    return res.data;
  }

  // constructor(private storage: Storage) {
  //   this.init();
  // }

  // async init() {
  //   await this.storage.create();
  // }

  // async set(key: string, value: any) {
  //   await this.storage.set(key, value);
  // }

  // async get(key: string) {
  //   return await this.storage.get(key);
  // }
}
