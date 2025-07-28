import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitgliedWerdenComponent } from './mitglied-werden.component';

describe('MitgliedWerdenComponent', () => {
  let component: MitgliedWerdenComponent;
  let fixture: ComponentFixture<MitgliedWerdenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MitgliedWerdenComponent]
    });
    fixture = TestBed.createComponent(MitgliedWerdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
