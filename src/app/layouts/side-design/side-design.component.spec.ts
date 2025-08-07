import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideDesignComponent } from './side-design.component';

describe('SideDesignComponent', () => {
  let component: SideDesignComponent;
  let fixture: ComponentFixture<SideDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideDesignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
