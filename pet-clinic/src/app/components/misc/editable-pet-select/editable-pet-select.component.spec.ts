import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditablePetSelectComponent } from './editable-pet-select.component';

describe('EditablePetSelectComponent', () => {
  let component: EditablePetSelectComponent;
  let fixture: ComponentFixture<EditablePetSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditablePetSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditablePetSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
