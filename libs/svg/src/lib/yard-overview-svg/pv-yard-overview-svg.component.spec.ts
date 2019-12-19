import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../shared/shared.module';
import { PvYardOverviewSvgComponent } from './pv-yard-overview-svg.component';

describe('PvYardOverviewSvgComponent', () => {
  let component: PvYardOverviewSvgComponent<any>;
  let fixture: ComponentFixture<PvYardOverviewSvgComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [PvYardOverviewSvgComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvYardOverviewSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
