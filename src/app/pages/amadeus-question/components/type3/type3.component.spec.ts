import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Type3Component } from './type3.component';

describe('Type3Component', () => {
  let component: Type3Component;
  let fixture: ComponentFixture<Type3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Type3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Type3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
