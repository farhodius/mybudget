import { AbstractControl } from '@angular/forms';

export class CustomValidator {
    static date(control: AbstractControl): any {
        return control.value && isNaN(Date.parse(control.value)) ? { invalidDate: true } : null;
    }
}