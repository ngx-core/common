import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Output
} from '@angular/core';

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
