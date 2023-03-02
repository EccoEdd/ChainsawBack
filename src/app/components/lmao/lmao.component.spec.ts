import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmaoComponent } from './lmao.component';

describe('LmaoComponent', () => {
  let component: LmaoComponent;
  let fixture: ComponentFixture<LmaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LmaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LmaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
