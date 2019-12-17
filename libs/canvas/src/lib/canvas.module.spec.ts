import { async, TestBed } from '@angular/core/testing';
import { CanvasModule } from './canvas.module';

describe('CanvasModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CanvasModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CanvasModule).toBeDefined();
  });
});
