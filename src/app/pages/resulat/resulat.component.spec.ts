import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResulatComponent } from './resulat.component';

describe('ResulatComponent', () => {
  let component: ResulatComponent;
  let fixture: ComponentFixture<ResulatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResulatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResulatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
