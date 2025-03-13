import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  private URL = 'http://localhost:8080/api/admin/movies';

  private httpClient = inject(HttpClient);

  searchMovies(title: string): Observable<Movie[]> {
    const params = new HttpParams().set('title', title);
    return this.httpClient.get<Movie[]>(`${this.URL}/search`, {
      params,
    });
  }

  addMovie(imdbID: string): Observable<Movie> {
    const params = new HttpParams().set('imdbID', imdbID);

    return this.httpClient.post<Movie>(`${this.URL}`, null, { params });
  }

  deleteMovie(imdbId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/${imdbId}`);
  }

  getAllMoviesFromDatabase(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${this.URL}`);
  }
}
