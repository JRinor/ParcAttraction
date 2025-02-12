import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../Service/comment.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
    private commentService: CommentService
  ) {
    this.attractionId = +this.route.snapshot.paramMap.get('attractionId')!;
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      first_name: [''],
      last_name: ['']
    });
  }

  submitComment() {
    if (this.commentForm.valid) {
      const commentData = {
        ...this.commentForm.value,
        attraction_id: this.attractionId
      };
      console.log('Submitting comment:', commentData);
      this.commentService.addComment(commentData).subscribe(response => {
        console.log('Comment submitted successfully:', response);
        // Handle response
      }, error => {
        console.log('Error submitting comment:', error);
      });
    } else {
      console.log('Comment form is invalid');
    }
  }
}
