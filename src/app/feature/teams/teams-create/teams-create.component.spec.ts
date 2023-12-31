import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsCreateComponent } from './teams-create.component';

describe('TeamCreateComponent', () => {
  let component: TeamsCreateComponent;
  let fixture: ComponentFixture<TeamsCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TeamsCreateComponent]
    });
    fixture = TestBed.createComponent(TeamsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
