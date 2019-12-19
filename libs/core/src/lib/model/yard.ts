import { Rect } from '@portv/core';

export interface Yard<T> extends Rect {
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  data: T;
}
