import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '../../../../models/movie.model';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { UserServiceService } from '../../../../services/user/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorServiceService } from '../../../../services/error/error-service.service';
import { Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [MatIcon,MatProgressSpinnerModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  ngOnInit(): void {
    this.viewMovieDetails();
  }
  movie!:Movie;
  private userService = inject(UserServiceService);
  private errorService = inject(ErrorServiceService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  viewMovieDetails() {
    const imdbID = this.route.snapshot.paramMap.get('imdbID')!;
    this.userService.getMovieById(imdbID).subscribe({
      next: (response) => {
        this.movie = response;
      },
      error: (err) => {
        console.log('failed to load movie', err);
        this.errorService.showError(err.error);
      },
    });
  }

  goBackToDashboard() {
    this.location.back();
  }
}
