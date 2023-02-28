import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDemonComponent } from './form-demon.component';

describe('FormDemonComponent', () => {
  let component: FormDemonComponent;
  let fixture: ComponentFixture<FormDemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDemonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
