import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmadeusQuestionComponent } from './amadeus-question.component';

describe('AmadeusQuestionComponent', () => {
  let component: AmadeusQuestionComponent;
  let fixture: ComponentFixture<AmadeusQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmadeusQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmadeusQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
