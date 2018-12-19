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
 * Main React App Component that is used to display and interact with the Angular-generated rectangle selector and
 * regular n-gon component.  If this looks like someone's first React application, that's because it is :)  Scaffolded
 * with create-react-app with typescript option.
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */

// this lets any custom component play nicely with TS as far as typings are concerned
declare global {
  namespace JSX
  {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

import React from 'react';
import './App.css';

interface IProps
{
  width: number;
  height: number;
}

interface IState extends IProps
{
  sides: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
}

import {IRect               } from "./typings/regular-ngon.component";
import {RegularNgonComponent} from "./typings/regular-ngon.component";

export interface IHandler
{
  (evt: CustomEvent): void;
}

class App extends React.Component<IProps, IState>
{
  public static defaultProps: IProps = {
    width: 100,
    height: 100
  };

  public state: IState =
  {
    width: App.defaultProps.width,
    height: App.defaultProps.height,
    sides: 4,
    left: 0,
    top: 0,
    right: 100,
    bottom: 100
  };

  // reference to the Angular-created regular n-gon component with (Canvas) rectangle selector
  protected ngon!: RegularNgonComponent;

  protected _onSides!: IHandler;
  protected _onBounds!: IHandler;

  // blah, blah ... React stuff ... blah, blah ...
  constructor(props: IProps)
  {
    super(props);

    this.state.width  = !isNaN(props.width) && props.width > 0 ? Math.round(props.width) : this.state.width;
    this.state.height = !isNaN(props.height) && props.height > 0 ? Math.round(props.height) : this.state.height;
    this.state.right  = this.state.width;
    this.state.bottom = this.state.height;

    this._onSides  = (evt: CustomEvent): void => this.onSides(evt);
    this._onBounds = (evt: CustomEvent): void => this.onBounds(evt);
  }

  public componentDidMount(): void
  {
    if (this.ngon)
    {
      this.ngon.addEventListener('sides'   , this._onSides);
      this.ngon.addEventListener('selected', this._onBounds);
    }
  }

  public componentWillUnmount(): void
  {
    if (this.ngon)
    {
      this.ngon.removeEventListener('sides'   , this._onSides);
      this.ngon.removeEventListener('selected', this._onBounds);
    }
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Angular Rectangle Selector and N-gon component rendered inside React.</p>
          <ng-ngon-component ref={(elem: any) => this.ngon = elem} width={this.state.width} height={this.state.height}></ng-ngon-component>
          <p>N-gon sides: {this.state.sides}</p>
          <p>Left: {this.state.left} Top: {this.state.top} Right: {this.state.right} Bottom: {this.state.bottom}</p>
          <p> &copy; <a className="App-link" href="http://algorithmist.net" target="_blank" rel="noopener noreferrer">The Algorithmist</a></p>
        </header>
      </div>
    );
  }

  // these are the event handlers for the relevant events emitted by the Angular component
  public onSides(value: CustomEvent): void
  {
    this.setState( {sides: value.detail} );
  }

  public onBounds(value: CustomEvent): void
  {
    const bounds: IRect = value.detail;

    // enforce integer bounds
    this.setState({
      top: Math.round(bounds.top),
      left: Math.round(bounds.left),
      right: Math.round(bounds.right),
      bottom: Math.round(bounds.bottom)
    });
  }
}

export default App;
