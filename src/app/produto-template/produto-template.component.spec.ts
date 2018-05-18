import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoTemplateComponent } from './produto-template.component';

describe('ProdutoTemplateComponent', () => {
  let component: ProdutoTemplateComponent;
  let fixture: ComponentFixture<ProdutoTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
