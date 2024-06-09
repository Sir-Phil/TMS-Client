import { Component } from '@angular/core';
import { FormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { SnackbarTypes } from '../../shared/types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  emailFromControl: UntypedFormControl = new UntypedFormControl('',
  [
    Validators.email,
    Validators.required
  ],
  );

  nameFormControl: UntypedFormControl = new UntypedFormControl('',
    [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(3)
    ],
  );
  passwordFormControl: UntypedFormControl = new UntypedFormControl('', 
  [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(4)
  ],);

  constructor(
    private _formBuilder: FormBuilder,
    private _snackbar: SnackbarService
  ){}

  onRegisterUser(){
    if(''){
      return this._snackbar.showSnackBarNotification(
        `Another account registration is in progress. Please wait for it to complete`,
        SnackbarTypes.INFO,
      );
    }

    //Validate email address provider
    if(this.emailFromControl.invalid){
      if(this.emailFromControl.errors?. ['whitespaceOnlyExp']){
        this.emailFromControl.setValue('');
      }

      return this._snackbar.showSnackBarNotification(
        `Please provide a valid email address to complete your account registration.`,
        SnackbarTypes.INFO
      );
    }

    //Validate the full name provided
    if (this.nameFormControl.invalid){
        if(this.nameFormControl.errors?.['whitespaceOnlyExp']){
          this.nameFormControl.setValue('')
        }

        return this._snackbar.showSnackBarNotification(
          `Please provide your full name to complete your account registration.
          Your full name can have between 1 and ${} and ${} characters.`,
          SnackbarTypes.INFO,
        );
    }

    // Validate the password provided
    if (this.passwordFormControl.invalid){
      return this._snackbar.showSnackBarNotification(
        `Please provide a valid password to complete your account registration.
        Your password can have between ${} and ${} characters. `,
        SnackbarTypes.INFO,
      );
    }

    


  }

  get hasRegistrationEvent(){
    return;
  }

}
