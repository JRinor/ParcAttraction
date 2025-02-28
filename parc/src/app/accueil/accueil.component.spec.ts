import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccueilComponent } from './accueil.component';
import { AttractionService } from '../Service/attraction.service';
import { CommentService } from '../Service/comment.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AccueilComponent', () => {
  let component: AccueilComponent;
  let fixture: ComponentFixture<AccueilComponent>;
  let mockAttractionService: jasmine.SpyObj<AttractionService>;
  let mockCommentService: jasmine.SpyObj<CommentService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAttractionService = jasmine.createSpyObj('AttractionService', ['getAllVisibleAttraction']);
    mockCommentService = jasmine.createSpyObj('CommentService', ['getComments']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AccueilComponent],
      providers: [
        { provide: AttractionService, useValue: mockAttractionService },
        { provide: CommentService, useValue: mockCommentService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
    
    mockAttractionService.getAllVisibleAttraction.and.returnValue(of([]));
    fixture = TestBed.createComponent(AccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
