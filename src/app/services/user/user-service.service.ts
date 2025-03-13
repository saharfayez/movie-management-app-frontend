import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';

@Injectable({
  providedIn: 'root',
})

export class UserServiceService {
  
  private URL = 'http://localhost:8080/api/user/movies';

  private httpClient = inject(HttpClient);

  getAllMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${this.URL}`);
  }

  getMovieById(imdbId: string): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.URL}/${imdbId}`);
  }
}
