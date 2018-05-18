import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaImportacaoComponent } from './nova-importacao.component';

describe('NovaImportacaoComponent', () => {
  let component: NovaImportacaoComponent;
  let fixture: ComponentFixture<NovaImportacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaImportacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaImportacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
