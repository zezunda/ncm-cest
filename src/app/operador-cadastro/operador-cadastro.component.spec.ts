import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadorCadastroComponent } from './operador-cadastro.component';

describe('OperadorCadastroComponent', () => {
  let component: OperadorCadastroComponent;
  let fixture: ComponentFixture<OperadorCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperadorCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperadorCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
