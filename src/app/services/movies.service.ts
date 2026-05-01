import { Injectable } from '@angular/core';

import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';

import { environment as env } from 'src/environments/environment';

import {
  RawMovie,
  Movie,
  RawCastMember,
  RawCrewMember,
  CastMember,
  CrewMember,
  MemberDetails,
} from 'src/app/models/Movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  // Set env variables here.
  private readonly apiKey = env.apiKey;
  private readonly baseUrl = env.apiUrl;

  private options: HttpOptions;

  constructor() {
    this.options = { url: '' };
  }

  // Gets the current trending movies.
  async getTrendingToday() {
    this.options = { url: `${this.baseUrl}/trending/movie/day?${this.apiKey}` };

    const res: HttpResponse = await CapacitorHttp.get(this.options);
    return this.prepResForHome(res.data.results);
  }

  // Gets the movies based on the user's search query.
  async getSearchedMovie(search: string) {
    this.options = {
      url: `${this.baseUrl}/search/movie?query=${search}&${this.apiKey}`,
    };

    const res: HttpResponse = await CapacitorHttp.get(this.options);
    return this.prepResForHome(res.data.results);
  }

  // Utility method to produce and return a new array with only the required properties.
  prepResForHome(movies: RawMovie[]) {
    const mappedRes: Movie[] = movies.map((movie: RawMovie) => ({
      id: movie.id,
      title: movie.title,
      releaseDate: movie.release_date,
      overview: movie.overview,
      poster: movie.poster_path,
    }));
    return mappedRes;
  }

  // Returns only a movie's title, overview and poster.
  async getMovieOverview(id: number) {
    this.options = {
      url: `${this.baseUrl}/movie/${id}?${this.apiKey}`,
    };
    const res: HttpResponse = await CapacitorHttp.get(this.options);

    // Destructing the res.data object for easier access to the object properties.
    const { title, overview, poster_path } = res.data;

    const overviewObj: Movie = {
      id: id,
      title: title,
      overview: overview,
      poster: poster_path,
    };

    return overviewObj;
  }

  // Gets the movie's list of cast and crew members involved in the movie.
  async getMovieDetails(id: number) {
    this.options = {
      url: `${this.baseUrl}/movie/${id}/credits?${this.apiKey}`,
    };

    const res: HttpResponse = await CapacitorHttp.get(this.options);

    const { cast, crew } = res.data;

    const mappedCast: CastMember[] = cast.map((c: RawCastMember) => ({
      id: c.id,
      castName: c.name,
      role: c.character,
      profile: c.profile_path,
    }));

    const mappedCrew: CrewMember[] = crew.map((c: RawCrewMember) => ({
      id: c.id,
      crewName: c.name,
      job: c.job,
      profile: c.profile_path,
    }));

    return { mappedCast, mappedCrew };
  }

  // Gets the details of the selected person.
  async getPersonDetails(id: number) {
    this.options = {
      url: `${this.baseUrl}/person/${id}?${this.apiKey}`,
    };

    const res: HttpResponse = await CapacitorHttp.get(this.options);

    const {
      id: memberId,
      name,
      profile_path,
      also_known_as,
      birthday,
      deathday,
      place_of_birth,
      biography,
    } = res.data;

    const member: MemberDetails = {
      id: memberId,
      memberName: name,
      profile: profile_path,
      aka: also_known_as,
      birthday,
      deathday,
      birthplace: place_of_birth,
      biography,
    };

    return member;
  }

  // Gets the person's involvement in movies.
  async getPersonCredits(id: number) {
    this.options = {
      url: `${this.baseUrl}/person/${id}/movie_credits?${this.apiKey}`,
    };

    const res: HttpResponse = await CapacitorHttp.get(this.options);

    const { cast, crew } = res.data;

    let mappedCastMovies: Movie[] = [];
    if (cast.length !== 0) {
      mappedCastMovies = cast.map((movie: RawMovie) => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
      }));
    }

    let mappedCrewMovies: Movie[] = [];
    if (crew.length !== 0) {
      mappedCrewMovies = crew.map((movie: RawMovie) => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
      }));
    }

    return { mappedCastMovies, mappedCrewMovies };
  }
}
