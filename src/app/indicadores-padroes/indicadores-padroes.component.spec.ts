import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadoresPadroesComponent } from './indicadores-padroes.component';

describe('IndicadoresPadroesComponent', () => {
  let component: IndicadoresPadroesComponent;
  let fixture: ComponentFixture<IndicadoresPadroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadoresPadroesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadoresPadroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
