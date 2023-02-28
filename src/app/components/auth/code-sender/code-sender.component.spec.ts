import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSenderComponent } from './code-sender.component';

describe('CodeSenderComponent', () => {
  let component: CodeSenderComponent;
  let fixture: ComponentFixture<CodeSenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeSenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
