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
 * (minimal) Typings file for the ADT Rectangle Selector
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
import { IRect } from "./regular-ngon.component";

export declare class Subject<T>
{
  constructor();

  next(value: T): void;
}

export declare class ADT$RectangleSelector
{
  rectSelected: Subject<IRect>;

  static readonly DEF_COLOR: string;
  static readonly DEF_LINE_THICKNESS: number;

  protected _stage: any;
  protected _selectorShape: any;
  protected _selectorTop: number;
  protected _selectorLeft: number;
  protected _selectorRight: number;
  protected _selectorBottom: number;
  protected _canvasLength: number;
  protected _canvasHeight: number;
  protected _origX: number;
  protected _origY: number;

  constructor(stage: any, width: number, height: number);

  reset(): void;
  destroy(): void;

  protected __onMouseDown(evt: any): void;
  protected __onSelectorMouseMove(evt: any): void;
  protected __onSelectorMouseUp(evt: any): void;
}



