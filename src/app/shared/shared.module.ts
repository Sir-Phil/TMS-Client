import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { TablerIconRendererComponent } from './tabler-icon-renderer/tabler-icon-renderer.component';
import { ButtonLoaderComponent } from './button-loader/button-loader.component';
import { LoaderComponent } from './loader/loader.component';
import { CreatorHeaderComponent } from './creator-header/creator-header.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderSelectorComponent } from './slider-selector/slider-selector.component';
import { MenuSelectorComponent } from './menu-selector/menu-selector.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatSliderModule} from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as icons from 'angular-tabler-icons/icons';
import { FormInputControlComponent } from './form-input-control/form-input-control.component';


const components = [
  CheckboxComponent,
  TablerIconRendererComponent,
  ButtonLoaderComponent,
  LoaderComponent,
  CreatorHeaderComponent,
  SnackbarComponent,
  SliderSelectorComponent,
  MenuSelectorComponent,
  FormInputControlComponent
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    MatMenuModule,
    MatSliderModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(icons)
    
  ],

  exports: components
})
export class SharedModule { }
