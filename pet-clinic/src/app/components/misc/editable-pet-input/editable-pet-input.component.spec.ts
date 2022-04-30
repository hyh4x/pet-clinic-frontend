import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditablePetInputComponent } from './editable-pet-input.component';

describe('EditablePetInputComponent', () => {
  let component: EditablePetInputComponent;
  let fixture: ComponentFixture<EditablePetInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditablePetInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditablePetInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
