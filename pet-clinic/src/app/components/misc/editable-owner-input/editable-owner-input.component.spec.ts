import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableOwnerInputComponent } from './editable-owner-input.component';

describe('EditableOwnerInputComponent', () => {
  let component: EditableOwnerInputComponent;
  let fixture: ComponentFixture<EditableOwnerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableOwnerInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableOwnerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
