# Running Angular Inside React with Web Components

This is a continuation of my prior project that created a reusable Web Component using [Angular 7 Elements](https://github.com/theAlgorithmist/Angular7-WebComponent).  That project illustrated my production project setup and provided a link to an example running on my web site.  The example shows the Web Component running inside a browser.  Only the most vanilla HTML and Javascript are required to display and interact with the component.

This repo provides an illustration of the exact same Web Component running inside React.  I should note that I am **not** a React developer.  The last time I worked with React was Fall 2015, which makes me a novice at best in terms of modern React.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  I read one tutorial on using React with Typescript.  That's it :)

So, I can only imagine what an experienced React dev could accomplish.

Author:  Jim Armstrong - [The Algorithmist](https://www.linkedin.com/in/jimarmstrong)

@algorithmist

theAlgorithmist [at] gmail [dot] com

create-react-app: 2.1.1

react: 16.6.3

react-dom: 16.6.3

react-scripts: 2.1.1

typescript: 3.2.2

Version: 1.0


## App.tsx

Here is the complete source for the _App.tsx_ file.

```
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
```

A _typings_ folder is provided in which I added some _d.ts_ files so that complete typings are available for all the Angular and Typescript files used in creating the _ng-ngon-component_.

The component takes _width_ and _height_ inputs, which are hardcoded in _index.tsx_.  That may not be the best place, but it was suitable for a quick POC.  Documented outputs are two events that emit the number of sides of the regular n-gon (number) and the currently selected rectangular boundary (instance of _IRect_).  These come across as instances of _CustomEvent_, just like the browser-only example.

The following is where the Angular Web Component is used in the _render_ method,

```
<ng-ngon-component ref={(elem: any) => this.ngon = elem} width={this.state.width} height={this.state.height}></ng-ngon-component>
```

The other modifications necessary to get the POC running are in the _/public/index.html_ file.

## Running the demo

I have currently only tested a dev build - http://localhost:3000 to view it in the browser - in Chrome and Safari on a Mac.  I targeted _ES2015_ in the original Web Component as well as the React build.  You are welcome to experiment with polyfills and other browsers in both projects.

Here is a sample screen shot.

![Angular inside React](http://algorithmist.net/image/react.png)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


License
----

Apache 2.0

**Free Software? Yeah, Homey plays that**

[//]: # (kudos http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
