import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PvRectSelectionSvgDirective } from './pv-rect-selection-svg.directive';

@Component({
  template: `
    <svg pvRectSelectionSvg></svg>
  `
})
class RectSelectionTestComponent {}
let fixture: ComponentFixture<RectSelectionTestComponent>;
let rectSelectionDirectives: DebugElement[];
beforeEach(async(() => {
  fixture = TestBed.configureTestingModule({
    declarations: [PvRectSelectionSvgDirective, RectSelectionTestComponent]
  }).createComponent(RectSelectionTestComponent);
  fixture.detectChanges();

  rectSelectionDirectives = fixture.debugElement.queryAll(
    By.directive(PvRectSelectionSvgDirective)
  );
}));

describe('RectSelectionComponent', () => {
  it('should create an instance', () => {
    // const directive = new RectSelectionDirective();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have 1 rectSelectionDirective', () => {
    expect(rectSelectionDirectives).toHaveLength(1);
  });
});
