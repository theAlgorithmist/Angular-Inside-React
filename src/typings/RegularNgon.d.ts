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
 * (minimal) Typings file for the Regular Ngon (computational) class
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */

export declare class RegularNgon
{
  sides: number;

  protected static readonly SQRT_2: number;
  protected _xcoord: Array<number>;
  protected _ycoord: Array<number>;
  protected _sides: number;

  constructor(sides: number);

  readonly xcoord: Array<number>;
  readonly ycoord: Array<number>;

  generate(left: number, top: number, right: number, bottom: number): void;
}
