import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addrestaurant } from './addrestaurant';

describe('Addrestaurant', () => {
  let component: Addrestaurant;
  let fixture: ComponentFixture<Addrestaurant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addrestaurant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addrestaurant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
