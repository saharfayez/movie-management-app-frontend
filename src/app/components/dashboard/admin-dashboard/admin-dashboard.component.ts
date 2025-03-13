import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Movie } from '../../../models/movie.model';
import { AdminServiceService } from '../../../services/admin/admin-service.service';
import { ErrorServiceService } from '../../../services/error/error-service.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  searchQuery: string = '';
  searchMovies: Movie[] = [];
  databaseMovies: Movie[] = [];
  errorMessage: string = '';
  adminService = inject(AdminServiceService);
  errorService = inject(ErrorServiceService);

  ngOnInit(): void {
    this.getAllMoviesFromDatabase();
  }

  onSearch() {
    this.searchQuery.trim();
    this.adminService.searchMovies(this.searchQuery).subscribe({
      next: (response) => {
        console.log(response);

        this.searchMovies = response;
      },
      error: (err) => {
        console.log('search failed', err);
       this.errorService.showError(err.error);
      },
    });
  }

  addMovie(imdbID: string) {
    this.adminService.addMovie(imdbID).subscribe({
      next: () => {
        this.getAllMoviesFromDatabase();
      },
      error: (err) => {
        console.log('failed to adding movie', err);
        this.errorService.showError(err.error);
      },
    });
  }

  removeMovie(imdbID: string) {
    this.adminService.deleteMovie(imdbID).subscribe({
      next: () => {
        this.getAllMoviesFromDatabase();
        this.databaseMovies = this.databaseMovies.filter((movie) => {
          movie.imdbID !== imdbID;
        });
      },
      error: (err) => {
        console.log('failed to remove movie', err);
        this.errorService.showError(err.error);
      },
    });
  }

  getAllMoviesFromDatabase() {
    this.adminService.getAllMoviesFromDatabase().subscribe({
      next: (response) => {
        this.databaseMovies = response;
      },
      error: (err) => {
        console.log('failed loading from database', err);
        this.errorService.showError(err.error);
      },
    });
  }

isMovieAdded(imdbID: string): boolean{
  return this.databaseMovies.some((movie)=>movie.imdbID===imdbID)
}
}
