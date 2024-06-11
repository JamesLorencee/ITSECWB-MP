import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validateFile(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control) {
      return null;
    }
    let value = control.value;
    if (!value) return null;

    console.log(value.name);
    value = value.name?.toLowerCase();

    const regex = new RegExp('(.*?)\\.(jpg|jpeg|png)$');
    const regexTest = regex.test(value);
    // console.log(regexTest);
    return !regexTest ? { notSupportedFileType: true } : null;
  };
}
