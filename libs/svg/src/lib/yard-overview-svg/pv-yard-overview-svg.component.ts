import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Origin, Yard } from '@portv/core';

@Component({
  selector: 'pv-yard-overview-svg',
  templateUrl: './pv-yard-overview-svg.component.html',
  styleUrls: ['./pv-yard-overview-svg.component.less']
})
export class PvYardOverviewSvgComponent<T> implements OnInit {
  private _yards: Yard<T>[] = [];
  @Input() set yards(value: Yard<T>[]) {
    this._yards = value;
    this.updateViewSize(value);
    this.displayYards = this.transform(
      value,
      this.viewWidth,
      this.viewHeight,
      this.origin
    );
  }

  get yards() {
    return this._yards;
  }

  @Input() yardTemplate: TemplateRef<any>;
  @Input() origin: Origin = 'LU';
  @Input() enableRectSelection = false;
  @Output() yardClick = new EventEmitter<Yard<T>>();
  @Output() rectSelect = new EventEmitter<Yard<T>[]>();

  viewWidth = 0;
  viewHeight = 0;
  displayYards: Yard<T>[] = [];
  host: SVGElement;

  constructor(private el: ElementRef) {
    this.host = this.el.nativeElement;
  }

  ngOnInit() {}

  transform(
    yards: Yard<T>[],
    viewWidth: number,
    viewHeight: number,
    origin: Origin
  ) {
    return yards.map(yard => {
      let x = yard.x;
      let y = yard.y;
      if (origin === 'LD') {
        y = viewHeight - yard.y - yard.height;
      } else if (origin === 'RU') {
        x = viewWidth - yard.x - yard.width;
      } else if (origin === 'RD') {
        y = viewHeight - yard.y - yard.height;
        x = viewWidth - yard.x - yard.width;
      }
      return { ...yard, x, y };
    });
  }

  updateViewSize(yards: Yard<T>[]) {
    this.viewWidth = Math.max(...yards.map(yard => yard.x + yard.width));
    this.viewHeight = Math.max(...yards.map(yard => yard.y + yard.height));
  }

  onYardClick(yard: Yard<T>) {
    this.yardClick.emit(yard);
  }

  trackByFn(yard: Yard<T>, index: number) {
    return JSON.stringify(yard);
  }

  onRectSelect(selectedYards: Yard<T>[]) {
    this.rectSelect.emit(selectedYards);
  }
}
