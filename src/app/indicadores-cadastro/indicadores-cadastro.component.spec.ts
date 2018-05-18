import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadoresCadastroComponent } from './indicadores-cadastro.component';

describe('IndicadoresCadastroComponent', () => {
  let component: IndicadoresCadastroComponent;
  let fixture: ComponentFixture<IndicadoresCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadoresCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadoresCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
