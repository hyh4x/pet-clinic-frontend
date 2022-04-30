import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Type } from 'src/app/common/type';

@Component({
  selector: 'app-editable-pet-select',
  templateUrl: './editable-pet-select.component.html',
  styleUrls: ['./editable-pet-select.component.css']
})
export class EditablePetSelectComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() arrayIndex: string;
  @Input() controlName: string;
  @Input() label: string;
  @Input() types: Type[];
  isEditable: boolean = false;

  constructor() { }

  edit(){
    this.isEditable = true;
    console.log(this.value);
  }

  processChanges(){
    this.isEditable = false;
  }

  ngOnInit(): void {
  }

  get value(){return this.parentForm.get(`pets.${this.arrayIndex}.${this.controlName}`)?.value;}

}
