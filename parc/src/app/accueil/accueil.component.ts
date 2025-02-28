import { Component } from '@angular/core';
import { AttractionService } from '../Service/attraction.service';
import { CommentService } from '../Service/comment.service';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { AttractionInterface } from '../Interface/attraction.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {

  constructor(
    public attractionService: AttractionService,
    private commentService: CommentService,
    private router: Router
  ) {}

  public attractions: Observable<AttractionInterface[]> = this.attractionService.getAllVisibleAttraction();
  public comments: { [key: number]: Observable<any[]> } = {};

  navigateToComment(attractionId: number) {
    console.log(`Navigating to comment page for attraction ID: ${attractionId}`);
    this.router.navigate([`/comment/${attractionId}`]).then(success => {
      if (success) {
        console.log('Navigation successful');
      } else {
        console.log('Navigation failed');
      }
    });
  }

  loadComments(attractionId: number) {
    if (attractionId != null) {
      this.comments[attractionId] = this.commentService.getComments(attractionId);
    }
  }
}