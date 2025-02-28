import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../Service/comment.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './comment.component.html'
})
export class CommentComponent {
  commentForm: FormGroup;
  attractionId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private snackBar: MatSnackBar
  ) {
    this.attractionId = Number(this.route.snapshot.paramMap.get('attractionId'));
    if (isNaN(this.attractionId)) {
      throw new Error('Invalid attraction ID');
    }
    
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(10)]],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  submitComment() {
    if (this.commentForm.valid) {
      const commentData = {
        ...this.commentForm.value,
        attraction_id: this.attractionId
      };
      
      this.commentService.addComment(commentData).subscribe({
        next: (response) => {
          this.snackBar.open('Commentaire ajouté avec succès!', 'Fermer', {
            duration: 3000
          });
          this.commentForm.reset();
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de l\'ajout du commentaire', 'Fermer', {
            duration: 3000
          });
          console.error('Error submitting comment:', error);
        }
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.commentForm.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) return 'Ce champ est requis';
      if (control.errors['minlength']) return 'Texte trop court';
      if (control.errors['min'] || control.errors['max']) return 'La note doit être entre 1 et 5';
    }
    return '';
  }
}
