import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-slider-selector',
  templateUrl: './slider-selector.component.html',
  styleUrls: ['./slider-selector.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class SliderSelectorComponent implements OnInit, OnChanges {
  @Input() min: number = 0;
  @Input() step: number = 1;
  @Input() value: number = 0;
  @Input() max: number = 100;
  @Input() label: string = '';
  @Input() slideValueChangeEvent = new EventEmitter<number>();

  sliderValue!: number

  
  ngOnInit(): void {
    this.sliderValue = this.value;
  }


  ngOnChanges(changes: SimpleChanges): void {
      if(changes['value'] != null && this.sliderValue != this.value){
        this.sliderValue = this.value
      }
  }

    handleSliderValueChangeEvent(value: Event) {
    // this.slideValueChangeEvent.emit(value);
    console.log('Value change event: ', value);
  }

  onDrag(value: Event) {
    // this.sliderValue = value;
    console.log('Slider event: ', value);
}

}
