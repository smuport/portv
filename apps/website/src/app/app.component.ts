import { Component } from '@angular/core';
import { Yard } from '@portv/core';

@Component({
  selector: 'portv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  selectedYards: string[] = [];
  enableRectSelection = true;
  yards = [
    { name: 'Q01', x: 100, y: 100, width: 100, height: 100, data: null },
    { name: 'Q02', x: 200, y: 200, width: 100, height: 100, data: null },
    { name: 'Q03', x: 300, y: 300, width: 100, height: 100, data: null },
    { name: 'Q04', x: 400, y: 400, width: 100, height: 100, data: null },
    { name: 'Q05', x: 500, y: 500, width: 100, height: 100, data: null },
    { name: 'Q06', x: 600, y: 600, width: 100, height: 100, data: null }
  ];

  onRectSelect(yards: Yard<void>[]) {
    this.selectedYards = yards.map(y => y.name);
  }
  yardClick(yard: Yard<void>) {
    this.yards = this.yards.map(y => {
      const rand = Math.random();
      if (rand > 0.7) {
        return { ...y, x: Math.random() * 500 };
      } else {
        return { ...y };
      }
    });
  }

  renderFill(yard: Yard<void>) {
    if (this.selectedYards.indexOf(yard.name) >= 0) {
      return 'blue';
    }
    if (yard.x / 300 > 1) {
      return 'red';
    } else {
      return 'green';
    }
  }
}
