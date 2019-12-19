import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PvRectSelectionSvgDirective } from './pv-rect-selection-svg.directive';

@NgModule({
  declarations: [PvRectSelectionSvgDirective],
  imports: [CommonModule],
  exports: [PvRectSelectionSvgDirective]
})
export class SharedModule {}
