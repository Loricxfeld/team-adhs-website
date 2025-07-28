import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelbsthilfegruppeComponent } from './selbsthilfegruppe.component';

describe('SelbsthilfegruppeComponent', () => {
  let component: SelbsthilfegruppeComponent;
  let fixture: ComponentFixture<SelbsthilfegruppeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelbsthilfegruppeComponent]
    });
    fixture = TestBed.createComponent(SelbsthilfegruppeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
