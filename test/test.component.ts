import { Component, ComponentFactoryResolver } from '@angular/core';

import { DynamicComponentClass } from './../src/ngx-core-common.dynamic-component.class';

@Component({
  selector: 'test-component',
  template: '<div #container></div>'
})
export class TestComponent extends DynamicComponentClass {
  public model = {};
  public key = 'notdefined';
  constructor(componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }
  public component() {
    return this._variable('_component');
  }
  public create(component: any): void {
    this._create(component);
  }
  public destroy(): void {
    this._destroy();
  }
  public set(key: string | Array<string>) {
    this._set(key);
  }
  public subscribe(key: string, callback?: any, error?: any, complete?: any): void {
    this._subscribe(key, callback, error, complete);
  }
}
