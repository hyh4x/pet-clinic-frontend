import { FormControl, ValidationErrors } from "@angular/forms";

export class ValidPhone {
    static validPhone(control: FormControl): ValidationErrors | null {
        let phone: string = control.value.replace(/\D+/g,'');
        if(/^[0-9]{10}$/.test(phone)) {
            return null;
        } else {
            return {'validPhone': true};
        }
    }
}
