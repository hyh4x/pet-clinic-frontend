import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editable-owner-input',
  templateUrl: './editable-owner-input.component.html',
  styleUrls: ['./editable-owner-input.component.css']
})
export class EditableOwnerInputComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() label: string;
  @Input() controlName: string;
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

  get value(){return this.parentForm.get(`personal.${this.controlName}`)?.value;}

}
