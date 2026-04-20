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
    this.options = { url: `${this.baseUrl}/trending/movie/day${this.apiKey}` };
    const res: HttpResponse = await CapacitorHttp.get(this.options);

    const mappedRes = res.data.results.map(
      ({ id, overview, poster_path }: any) => ({
        id,
        overview,
        poster: poster_path,
      }),
    );
    return mappedRes;
  }

  // async getSearchedMovie(search: string) {
  //   this.options = {
  //     url: `${this.baseUrl}/search/movie?query=${search}&${this.apiKey}`,
  //   };
  //   const res: HttpResponse = await CapacitorHttp.get(this.options);

  //   const mappedRes = res.data.results.map(
  //     ({ id, overview, poster_path }: any) => ({
  //       id,
  //       overview,
  //       poster: poster_path,
  //     }),
  //   );
  //   return mappedRes;
  // }

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
