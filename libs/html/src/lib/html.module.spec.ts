import { async, TestBed } from '@angular/core/testing';
import { HtmlModule } from './html.module';

describe('HtmlModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HtmlModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(HtmlModule).toBeDefined();
  });
});
