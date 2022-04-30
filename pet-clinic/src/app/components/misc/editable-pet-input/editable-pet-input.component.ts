import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editable-pet-input',
  templateUrl: './editable-pet-input.component.html',
  styleUrls: ['./editable-pet-input.component.css']
})
export class EditablePetInputComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() arrayIndex: string;
  @Input() controlName: string;
  @Input() label: string;
  isEditable: boolean = false;

  constructor() { }

  edit(){
    this.isEditable = true;
  }

  processChanges(){
    this.isEditable = false;
  }

  ngOnInit(): void {
  }

  get value(){return this.parentForm.get(`pets.${this.arrayIndex}.${this.controlName}`)?.value;}

}
