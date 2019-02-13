/**
 * Copyright 2018 Jim Armstrong (www.algorithmist.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * (minimal) Typings file for the (Angular) Regular Ngon Component
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
export interface IRect
{
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export interface IHandler
{
  (evtObj: any): void;
}

import { ADT$RectangleSelector } from './ADTRectangleSelector.d';
import { RegularNgon           } from './RegularNgon.d';

export declare class EventEmitter<T>
{
  constructor(value: T);

  next(value:T): void;
}

export declare class CanvasSelectorDirective
{
  protected _canvas: HTMLCanvasElement;
  protected _elRef: any;

  width: number;
  height: number;

  constructor(elRef: any);

  ngOnInit(): void;
  ngAfterViewInit(): void;
  createStage(): any;
}

export declare class RegularNgonComponent
{
  width: string;
  height: string;

  protected _initSides: number;
  protected _rectSelected: EventEmitter<IRect>;
  protected _sides: EventEmitter<number>;
  protected _canvasSelector: CanvasSelectorDirective;

  // any used as a proxy for CreateJS
  protected _stage: any;
  protected _ngonShape: any;
  protected _selector: ADT$RectangleSelector;
  protected _ngon: RegularNgon;
  protected _subscription: any;
  protected _left: number;
  protected _top: number;
  protected _right: number;
  protected _bottom: number;

  constructor(initSides: number);
  ngOnInit(): void;
  ngAfterViewInit(): void;
  ngOnChanges(changes: any): void;
  ngOnDestroy(): void;

  readonly initSides: string;

  onSidesSelected(sides: string): void;
  onClear(): void;

  addEventListener(type: string, handler: IHandler):void
  removeEventListener(type: string, handler: IHandler): void

  protected __setup(): void;
  protected __onRectSelected(rect: IRect): void;
  protected __draw(): void;
}
