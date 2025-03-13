import { Component, inject, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/user/user-service.service';
import { Movie } from '../../../models/movie.model';
import { ErrorServiceService } from '../../../services/error/error-service.service';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    MatIcon,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatProgressSpinnerModule,
    RouterModule,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  movies: Movie[] = [];
  private userService = inject(UserServiceService);
  private errorService = inject(ErrorServiceService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getAllMovies();
  }

  getAllMovies() {
    this.userService.getAllMovies().subscribe({
      next: (response) => {
        this.movies = response;
      },
      error: (err) => {
        this.errorService.showError(err.error);
      },
    });
  }

  openMovieDetails(movie: Movie) {
    this.dialog.open(MovieDetailsComponent, {
      width: '600px',
      data: movie,
      panelClass: 'details-dialog-container',
    });
  }
}
