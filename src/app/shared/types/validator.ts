import { AbstractControl, ValidatorFn } from "@angular/forms";

export function whitespaceOnlyValidator(): ValidatorFn {
    return (control: AbstractControl) => {
        const hasWhitespaceOnly = (control.value || '').trim().length === 0;
        return !hasWhitespaceOnly ? null : { whitespaceOnlyexp: true};
    };
}