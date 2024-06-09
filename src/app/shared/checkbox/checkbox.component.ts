import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent {
  @Input() checked: boolean = false;
  @Output() checkboxChangedEvent = new EventEmitter()


  handleCheckBoxChangeRequest(){
    this.checkboxChangedEvent.emit();
  }
}
