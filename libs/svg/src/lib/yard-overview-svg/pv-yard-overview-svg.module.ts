import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PvYardOverviewSvgComponent } from './pv-yard-overview-svg.component';

@NgModule({
  declarations: [PvYardOverviewSvgComponent],
  imports: [CommonModule, SharedModule],
  exports: [PvYardOverviewSvgComponent]
})
export class PvYardOverviewSvgModule {}
