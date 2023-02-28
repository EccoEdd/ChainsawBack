import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTotalComponent } from './nav-total.component';

describe('NavTotalComponent', () => {
  let component: NavTotalComponent;
  let fixture: ComponentFixture<NavTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavTotalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
