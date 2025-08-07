import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectexamsubComponent } from './subjectexamsub.component';

describe('SubjectexamsubComponent', () => {
  let component: SubjectexamsubComponent;
  let fixture: ComponentFixture<SubjectexamsubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectexamsubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectexamsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
