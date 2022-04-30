import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: '[app-editable-visit-row]',
  templateUrl: './editable-visit-row.component.html',
  styleUrls: ['./editable-visit-row.component.css']
})
export class EditableVisitRowComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() PetsIndex: string;
  @Input() VisitsIndex: string;
  isEditable: boolean = false;

  constructor() { }

  edit(){
    this.isEditable = true;
  }

  processChanges(){
    this.isEditable = false;
  }

  deleteVisit(){
    if(confirm('Are you sure you want to delete this visit?')){
      this.visits.removeAt(+this.VisitsIndex);
    }
  }

  ngOnInit(): void {
  }

  get visits(){return this.parentForm.get(`pets.${this.PetsIndex}.visits`) as FormArray;}
  get visitDate(){return this.parentForm.get(`pets.${this.PetsIndex}.visits.${this.VisitsIndex}.visitDate`);}
  get description(){return this.parentForm.get(`pets.${this.PetsIndex}.visits.${this.VisitsIndex}.description`);}
}
