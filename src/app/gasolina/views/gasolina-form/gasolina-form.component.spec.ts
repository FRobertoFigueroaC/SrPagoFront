import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasolinaFormComponent } from './gasolina-form.component';

describe('GasolinaFormComponent', () => {
  let component: GasolinaFormComponent;
  let fixture: ComponentFixture<GasolinaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasolinaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GasolinaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
