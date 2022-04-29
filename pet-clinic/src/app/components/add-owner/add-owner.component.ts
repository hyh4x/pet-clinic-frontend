import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Owner } from 'src/app/common/owner';
import { Pet } from 'src/app/common/pet';
import { Type } from 'src/app/common/type';
import { PetTypesService } from 'src/app/services/pet-types.service';
import { OwnerService } from 'src/app/services/owner.service';
import { ValidBirthDate } from 'src/app/validators/valid-birth-date';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-owner',
  templateUrl: './add-owner.component.html',
  styleUrls: ['./add-owner.component.css']
})
export class AddOwnerComponent implements OnInit {

  ownerFormGroup: FormGroup;
  types: Type[] = [];

  constructor(private formBuilder: FormBuilder,
              private petTypesService: PetTypesService,
              private ownerService: OwnerService,
              private router: Router) { }

  ngOnInit(): void {

    this.createFormGroups();

    this.getTypes();

  }
  

  createFormGroups() {
    this.ownerFormGroup = this.formBuilder.group({
      personal: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('',[Validators.required, Validators.minLength(2)]),
        phoneNumber: new FormControl('',[Validators.required, Validators.pattern('[0-9]{10}')]),
        email: new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        city: new FormControl('',[Validators.required, Validators.minLength(2)]),
        address: new FormControl('',[Validators.required, Validators.minLength(2)])
      }),
      pets: this.formBuilder.array([ ])
    })
  }

  addPet() {
    const petForm: FormGroup = this.formBuilder.group({
      name: new FormControl('',[Validators.required, Validators.minLength(2)]),
      birthDate: new FormControl('',[Validators.required,Validators.pattern('[0-9]{2}.[0-9]{2}.[0-9]{4}') ,ValidBirthDate.validBirthDate]),
      type: new FormControl(this.types[0],[Validators.required])
    });
    this.pets.push(petForm);
  }

  deletePet(i: number){
    this.pets.removeAt(i);
  }

  getTypes() {
    this.petTypesService.getTypes().subscribe(
      (data: Type[]) => this.types = data
    );
  }

  onSubmit() {

    if(this.ownerFormGroup.invalid){
      this.ownerFormGroup.markAllAsTouched();
      return;
    }

    let owner: Owner = this.ownerFormGroup.get('personal')?.value;
    owner.pets = [];

    for(let tempFormGroup of this.pets.controls){
      let pet: Pet = tempFormGroup.value;
      pet.birthDate = moment(tempFormGroup.get('birthDate')?.value,'DD/MM/YYYY').toDate();
      owner.pets.push(pet);
    }

    console.log(owner);
    this.ownerService.postOwner(owner).subscribe(
      {
      next: response => {
        alert(`Owner is added successfully`);

        this.router.navigateByUrl('/owners');
      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    });
  }

  get pets() {return this.ownerFormGroup.get('pets') as FormArray;}
  get firstName() {return this.ownerFormGroup.get('personal.firstName') as FormControl;}
  get lastName() {return this.ownerFormGroup.get('personal.lastName') as FormControl;}
  get phoneNumber() {return this.ownerFormGroup.get('personal.phoneNumber') as FormControl;}
  get email() {return this.ownerFormGroup.get('personal.email') as FormControl;}
  get city() {return this.ownerFormGroup.get('personal.city') as FormControl;}
  get address() {return this.ownerFormGroup.get('personal.address') as FormControl;}
}
