import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableVisitRowComponent } from './editable-visit-row.component';

describe('EditableVisitRowComponent', () => {
  let component: EditableVisitRowComponent;
  let fixture: ComponentFixture<EditableVisitRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableVisitRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableVisitRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
