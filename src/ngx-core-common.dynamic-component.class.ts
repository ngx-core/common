import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { component } from './ngx-core-common.type';

/*
  DynamicComponentClass
  ---
  Angular 2+ abstract class extend for component with ability to dynamically create component that is available in entryComponents
  to a specific container and destroy it. After create you can _set variables to its instance.
*/
export abstract class DynamicComponentClass {

  private _component: any;
  protected componentFactoryResolver: ComponentFactoryResolver;

  @ViewChild('container', { read: ViewContainerRef }) protected container: any;

  constructor(componentFactoryResolver: ComponentFactoryResolver) {
    this.componentFactoryResolver = componentFactoryResolver;
  }

  // create component in container
  protected _create(component: component): this {
    if (this.container && component) {
      this._component = this.container.createComponent(this.resolveComponent(component));
    }
    return this;
  }

  // destroy component
  protected _destroy(): void {
    if (this._component) {
      this._component.destroy();
      this._component = null;
    }
  }

  // resolve component which should be added to entryComponents
  private resolveComponent(component: component): any {
    if (component) {
      return this.componentFactoryResolver.resolveComponentFactory(component);
    }
  }

  /**
   * set dynamic component instance variables values from extended class with specific keys
   * @param key string or array of strings
   */
  protected _set(key: string | Array<string>): this {
    if (this._component) {
      if (key instanceof Array) {
        key.forEach((value, index) => {
          if (value) {
            this._component.instance[value] = this[value];
          }
        });
      } else if (key) {
        this._component.instance[key] = this[key];
      }
    }
    return this;
  }

  /**
   * Subscribe to created component instance @Output
   * @param key instance variable of created component
   * @param callback function initiated in subscribe
   */
  protected _subscribe(key: string, callback?: Function): this {
    if (this._component.instance.hasOwnProperty(key)) {
      this._component.instance[key].subscribe((result: any) => {
        if (callback) {
          callback(result);
        }
      });
    }
    return this;
  }
}
