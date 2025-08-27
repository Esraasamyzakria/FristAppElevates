import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreresulatComponent } from './scoreresulat.component';

describe('ScoreresulatComponent', () => {
  let component: ScoreresulatComponent;
  let fixture: ComponentFixture<ScoreresulatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreresulatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreresulatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
