import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deliver } from './deliver';

describe('Deliver', () => {
  let component: Deliver;
  let fixture: ComponentFixture<Deliver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deliver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deliver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
