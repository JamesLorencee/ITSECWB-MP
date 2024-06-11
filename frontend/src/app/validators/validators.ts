import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validateFile(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control) {
      return null;
    }
    let value = control.value;
    if (!value) return null;

    value = value.name?.toLowerCase();

    const regex = new RegExp('(.*?)\\.(jpg|jpeg|png)$');
    const regexTest = regex.test(value);
    return !regexTest ? { notSupportedFileType: true } : null;
  };
}
