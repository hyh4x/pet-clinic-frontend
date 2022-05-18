import { FormControl, ValidationErrors } from "@angular/forms";
import * as moment from 'moment';

export class ValidBirthDate {

    static validBirthDate(control: FormControl): ValidationErrors | null {

        const checkDate = moment.utc(control.value, 'DD/MM/YYYY');

        if(!checkDate.isValid() || checkDate > moment.utc()) {
            return {'validBirthDate': true};
        }
        else {
            return null;
        }
    }
}
