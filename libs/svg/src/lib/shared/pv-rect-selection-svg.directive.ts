import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { intersection, Rect } from '@portv/core';
import { fromEvent, merge, Subject } from 'rxjs';
import { filter, switchMapTo, takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: 'svg[pvRectSelection]'
})
export class PvRectSelectionSvgDirective implements OnInit, OnDestroy {
  host: SVGElement;
  rectSelectionId = 'rect-selection';
  rect: SVGRectElement;
  fixedX = 0;
  fixedY = 0;
  rectSelectionStarted = false;
  destroy$ = new Subject<void>();
  @Input() enableRectSelection = false;
  @Input() rectSelectableData: Rect[] = [];
  @Output() rectSelect = new EventEmitter<Rect[]>();
  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.host = el.nativeElement;
  }

  ngOnInit() {
    this.rect = this.initRect();
    this.renderer.appendChild(this.host, this.rect);
    this.listenSelection(this.rect);
  }

  initRect() {
    let rect: SVGRectElement = this.el.nativeElement.getElementById(
      this.rectSelectionId
    );
    if (!rect) {
      // rect = this.renderer.createElement('rect');
      // https://stackoverflow.com/questions/46787368/angular2-renderer-svg-rect-is-rendered-but-not-showing-in-page
      rect = this.renderer.createElement('rect', 'http://www.w3.org/2000/svg');
      rect.setAttribute('id', this.rectSelectionId);
    }

    rect.setAttribute('x', '0');
    rect.setAttribute('y', '0');
    rect.setAttribute('width', '0');
    rect.setAttribute('height', '0');
    rect.setAttribute('strokeWidth', '0');
    rect.setAttribute('opacity', '0');

    return rect;
  }

  listenSelection(rect: SVGRectElement) {
    // let fixedX = 0;
    // let fixedY = 0;
    // let rectSelectionStarted = false;
    const mouseDown$ = fromEvent(this.host, 'mousedown');
    const mouseMove$ = fromEvent(this.host, 'mousemove');
    const mouseUp$ = fromEvent(this.host, 'mouseup');

    const selectRect$ = mouseUp$.pipe(
      tap(() => {
        const rectX = +rect.getAttribute('x');
        const rectY = +rect.getAttribute('y');
        const rectWidth = +rect.getAttribute('width');
        const rectHeight = +rect.getAttribute('height');
        const selectionRect: Rect = {
          x: rectX,
          y: rectY,
          width: rectWidth,
          height: rectHeight
        };
        const selectedData = this.rectSelectableData.filter(data => {
          return intersection(data, selectionRect);
        });
        // console.log(selectedData);
        rect.setAttribute('x', '0');
        rect.setAttribute('y', '0');
        rect.setAttribute('width', '0');
        rect.setAttribute('height', '0');
        rect.setAttribute('strokeWidth', '0');
        rect.setAttribute('opacity', '0');
        this.rectSelectionStarted = false;
        this.rectSelect.emit(selectedData);
      })
    );

    mouseDown$
      .pipe(
        filter(() => this.enableRectSelection),
        tap((event: MouseEvent) => {
          if (!this.rectSelectionStarted) {
            this.rectSelectionStarted = true;
            this.fixedX = event.offsetX;
            this.fixedY = event.offsetY;
            rect.setAttribute('x', this.fixedX.toString());
            rect.setAttribute('y', this.fixedY.toString());
            rect.setAttribute('width', '0');
            rect.setAttribute('height', '0');
            rect.setAttribute('strokeWidth', '2');
            rect.setAttribute('stroke', 'black');
            rect.setAttribute('fill', 'gray');
            rect.setAttribute('opacity', '0.1');
          }
        }),
        filter(() => this.rectSelectionStarted),
        switchMapTo(
          mouseMove$.pipe(
            tap((event: MouseEvent) => {
              // console.log(event);
              const currentX = event.offsetX;
              const currentY = event.offsetY;
              const width = Math.abs(currentX - this.fixedX);
              const height = Math.abs(currentY - this.fixedY);
              rect.setAttribute('width', width.toString());
              rect.setAttribute('height', height.toString());
              if (currentX < this.fixedX) {
                rect.setAttribute('x', currentX.toString());
              }
              if (currentY < this.fixedY) {
                rect.setAttribute('y', currentY.toString());
              }
            }),
            takeUntil(merge(this.destroy$, selectRect$))
          )
        )
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
