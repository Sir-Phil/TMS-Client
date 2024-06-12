import { Component } from '@angular/core';
import { FormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { SnackbarTypes } from '../../shared/types';
import { PASSWORD_MAX_CHARACTERS, PASSWORD_MIN_CHARACTERS, USER_NAME_LIMIT } from '../../core/constants/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  readonly USER_NAME_LIMIT = USER_NAME_LIMIT;

  readonly PASSWORD_MAX_CHARACTERS = PASSWORD_MAX_CHARACTERS;
  readonly PASSWORD_MIN_CHARACTERS = PASSWORD_MIN_CHARACTERS;

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
    private _snackbar: SnackbarService,
    private _authService: AuthService
  ){}

  onRegisterUser(){
    if(this.hasRegistrationEvent){
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
          Your full name can have between 1 and ${USER_NAME_LIMIT} characters.`,
          SnackbarTypes.INFO,
        );
    }

    // Validate the password provided
    if (this.passwordFormControl.invalid){
      return this._snackbar.showSnackBarNotification(
        `Please provide a valid password to complete your account registration.
        Your password can have between ${PASSWORD_MIN_CHARACTERS} and ${PASSWORD_MAX_CHARACTERS} characters. `,
        SnackbarTypes.INFO,
      );
    }

    


  }

  get hasRegistrationEvent(){
    return this._authService;
  }

}
