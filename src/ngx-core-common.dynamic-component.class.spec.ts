// external
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';

// internal
import { DynamicComponent } from './../test/dynamic.component';
import { TestComponent } from './../test/test.component';
import { TestModule } from './../test/test.module';

beforeAll(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
});

describe('TestComponent', () => {

  let comp: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    }).compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    nativeElement = fixture.debugElement.nativeElement;
    comp = fixture.componentInstance;
  });

  it('should create test component', async(() => {
    expect(fixture).toBeDefined();
    expect(comp).toBeTruthy();
  }));
  it('should have div', async(() => {
    expect(nativeElement.querySelector('div')).toBeTruthy();
  }));
  it('should have _component null', async(() => {
    expect(comp.component()).toBeNull();
  }));
  it('this._component should be null', async(() => {
    expect(comp.component()).toBeNull();
  }));
  it('this._component should be created', async(() => {
    comp.create(DynamicComponent);
    expect(comp.component).toBeDefined();
  }));
  it('this._component.instance model should be defined', async(() => {
    comp.create(DynamicComponent);
    expect(comp.component().instance.model).toBeDefined();
  }));
  it('this.model should be changed', async(() => {
    comp.create(DynamicComponent);
    comp.model = { test: 'changed' };
    expect(comp.model).toEqual({ test: 'changed' });
  }));
  it('_component instance model with key argument should be changed', async(() => {
    comp.create(DynamicComponent);
    comp.model = { defined: false };
    comp.set('model');
    expect(comp.component().instance.model).toEqual({ defined: false });
  }));
  it('_component instance model and key with array argument should be changed', async(() => {
    comp.create(DynamicComponent);
    comp.model = { defined: false };
    comp.set([
      'key',
      'model'
    ]);
    expect(comp.component().instance.key).toBe('notdefined');
    expect(comp.component().instance.model).toEqual({ defined: false });
  }));
  it('_component instance subscribe to event EventEmitter', async(() => {
    comp.create(DynamicComponent);
    comp.subscribe('event', (result: any) => {
      expect(result).toBe('event');
    })
    comp.component().instance.emit();
  }));
  it('this._component should be destroyed', async(() => {
    comp.create(DynamicComponent);
    comp.destroy();
    expect(comp.component()).toBeNull();
  }));
});