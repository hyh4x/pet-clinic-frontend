import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-editable-select',
  inputs: ['value','options','label'],
  outputs: ['valueChangeEvents: valueChange'],
  templateUrl: './editable-select.component.html',
  styleUrls: ['./editable-select.component.css']
})
export class EditableSelectComponent implements OnInit {

  value: string;
  options: string[];
  label: string;
  isEditable: boolean;
  valueChangeEvents: EventEmitter<string>;

  constructor() {
    this.isEditable = false;
    this.valueChangeEvents = new EventEmitter();
   }

  ngOnInit(): void {
  }

  edit(){
    console.log(this.value);
    this.isEditable = true;
  }

  processChanges(event: Event){

    let element = event.target as HTMLOptionElement;

    this.valueChangeEvents.emit(element.value);

    this.isEditable = false;
  }
}
