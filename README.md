# @ngx-core/common

Some Angular 2+ features used in other ngx libraries

## Table of contents
* [Installation](#installation)
* [Usage](#usage)
* [Versioning](#versioning)
* [Git commit](#git-commit)
* [License](#license)
* [Donate](#donate)


## Installation

To install, run:

```bash
npm install @ngx-core/common --save
```

## Usage

Step 1. Create component you want to dynamically create 
```typescript
// dynamic.component.ts

import { Component, ComponentFactoryResolver, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dynamic-component',
  template: 'Dynamic component created succesfully'
})
export class DynamicComponent {
  key = 'defined';
  public model = {
    defined: true
  };

  @Output() event: EventEmitter<any> = new EventEmitter();

  emit() {
    this.event.emit('event');
  }
}

```

Step 2. Create component that will use DynamicComponentClass and create new DynamicComponent
```typescript
// default.component.ts

import { Component, ComponentFactoryResolver } from '@angular/core';

import { DynamicComponentClass } from '@ngx-core/common';
import { DynamicComponent } from './dynamic.component'

@Component({
  selector: 'default-component',
  template: '<div #container></div>' // create #container variable
})
export class DefaultComponent extends DynamicComponentClass {
  public model = {};
  public key = 'notdefined';

  constructor(componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);

    this.create(DynamicComponent);
    this.key = 'defined';
    this.model = {
      defined: true
    };

    this.set('key'); // set component instance key variable value from this class to 'defined'
    this.set(['model','key']); // set component instance key variables value from this class

    // subscribe to EventEmitter - event Output
    this.subscribe('event', (result) => {
      console.log(result);
    });
  }
  // get private variable class _component with is newely created component
  public component() {
    return this._variable('_component');
  }

  // create component
  public create(component: any): void {
    this._create(component); // protected method from DynamicComponentClass
  }
  public destroy(): void {
    this._destroy(); // protected method from DynamicComponentClass
  }
  public set(key: string | Array<string>) {
    this._set(key); // protected method from DynamicComponentClass
  }
  public subscribe(key: string, callback?: Function): void {
    this._subscribe(key, callback); // protected method from DynamicComponentClass
  }
}

```

Step 3. Create module
```typescript
// primary.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicComponent } from './dynamic.component';
import { DefaultComponent } from './default.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DynamicComponent, DefaultComponent],
  entryComponents: [DynamicComponent] // <--- set DynamicComponent in entryComponents
})
export class PrimaryModule { }

```

## Versioning
Semantic Versioning 2.0.0 http://semver.org/

**Given a version number MAJOR.MINOR.PATCH, increment the:**   
MAJOR version when you make incompatible API changes,  
MINOR version when you add functionality in a backwards-compatible manner, and  
PATCH version when you make backwards-compatible bug fixes.  
Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

**FAQ**   
How should I deal with revisions in the 0.y.z initial development phase?  
>The simplest thing to do is start your initial development release at 0.1.0 and then increment the minor version for each subsequent release.

How do I know when to release 1.0.0?

>If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

## GIT commit
- AngularJS Git Commit Message Conventions https://gist.github.com/stephenparish/9941e89d80e2bc58a153
- http://karma-runner.github.io/0.10/dev/git-commit-msg.html

## License

MIT © wwwdev.io

## Donate

[Click to donate](https://donorbox.org/help-creating-open-source-software)
