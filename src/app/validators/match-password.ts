import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswords(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordField)?.value;
    const confirmPassword = formGroup.get(confirmPasswordField)?.value;

    if (password !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    
    return null;
  };
}
