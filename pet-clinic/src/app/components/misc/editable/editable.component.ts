import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editable',
  inputs: ['value', 'label'],
  outputs: ["valueChangeEvents: valueChange"],
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.css']
})
export class EditableComponent implements OnInit {

  isEditable: boolean;
  value!: string;
  label!: string;
  valueChangeEvents: EventEmitter<string>;

  constructor() {
    this.isEditable = false;
    this.valueChangeEvents = new EventEmitter();
   }

  ngOnInit(): void {
  }

  edit(){
    this.isEditable = true;
  }

  processChanges(){
    this.valueChangeEvents.emit(this.value);
    this.isEditable = false;
  }

}
