import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/common/owner';
import { Pet } from 'src/app/common/pet';
import { OwnerService } from 'src/app/services/owner.service';
import * as moment from 'moment';
import { Type } from 'src/app/common/type';
import { PetTypesService } from 'src/app/services/pet-types.service';
import { Visit } from 'src/app/common/visit';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidBirthDate } from 'src/app/validators/valid-birth-date';
import { ValidPhone } from 'src/app/validators/valid-phone';

@Component({
  selector: 'app-owner-info',
  templateUrl: './owner-info.component.html',
  styleUrls: ['./owner-info.component.css']
})
export class OwnerInfoComponent implements OnInit {

  owner: Owner | null;
  ownerId: string;
  types: Type[] = [];
  typeNames: string[];
  ownerFormGroup: FormGroup;

  constructor(private ownerService: OwnerService,
              private route: ActivatedRoute,
              private typesService: PetTypesService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getOwner();
    this.getTypes();
  }

  getOwner() {
    this.ownerId = this.route.snapshot.paramMap.get('id')!;
    if(this.ownerId){
      this.ownerService.getOwner(this.ownerId).subscribe(
        data => {
          this.owner = data;
          this.createFormGroups();
        }
      );
    }
  }


  getTypes() {
    this.typesService.getTypes().subscribe(
      (data: Type[]) => {
        this.types = data;
      }
    );
  }

  createFormGroups() {
    this.ownerFormGroup = this.formBuilder.group({
      personal: this.formBuilder.group({
        id: this.owner?.id,
        firstName: new FormControl(this.owner?.firstName,[Validators.required, Validators.minLength(2)]),
        lastName: new FormControl(this.owner?.lastName,[Validators.required, Validators.minLength(2)]),
        phoneNumber: new FormControl(this.owner?.phoneNumber,[Validators.required, ValidPhone.validPhone]),
        email: new FormControl(this.owner?.email,[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        city: new FormControl(this.owner?.city,[Validators.required, Validators.minLength(2)]),
        address: new FormControl(this.owner?.address,[Validators.required, Validators.minLength(2)])
      }),
      pets: this.formBuilder.array([])
    });

    for(let pet of this.owner?.pets!){
      this.addPet(pet);
    }
  }

  addPet(pet: Pet) {
    const petForm: FormGroup = this.formBuilder.group({
      id: pet.id,
      name: new FormControl(pet.name,[Validators.required, Validators.minLength(2)]),
      birthDate: new FormControl(this.getFormattedDate(pet.birthDate),[Validators.required,
                                                                        Validators.pattern('[0-9]{2}.[0-9]{2}.[0-9]{4}'),
                                                                        ValidBirthDate.validBirthDate]),
      type: new FormControl(pet.type,[Validators.required]),
      visits: this.formBuilder.array([])
    });
    for(let visit of pet.visits){
      this.addVisit(visit, petForm);
    }
    this.pets.push(petForm);
  }

  addVisit(visit: Visit, group: FormGroup){
    const visitForm: FormGroup = this.formBuilder.group({
      id: visit.id,
      visitDate: new FormControl(this.getFormattedDate(visit.visitDate),[Validators.required,
                                                                          Validators.pattern('[0-9]{2}.[0-9]{2}.[0-9]{4}'),
                                                                          ValidBirthDate.validBirthDate]),
      description: new FormControl(visit.description, [Validators.required])
    })
    let array = group.get('visits') as FormArray;
    array.push(visitForm);
  }

  async onSubmit(){
    if(this.ownerFormGroup.invalid){
      this.ownerFormGroup.markAllAsTouched();
      return;
    }

    let owner: Owner = this.ownerFormGroup.get('personal')?.value;
    owner.phoneNumber=owner.phoneNumber.replace(/\D+/g,'');
    owner.pets = [];

    for(let petFormGroup of this.pets.controls){
      let pet: Pet = petFormGroup.value;
      pet.birthDate = moment(pet.birthDate,'DD/MM/YYYY').toDate();
      pet.visits = [];
      let visits = petFormGroup.get('visits') as FormArray;

      for(let visitFormGroup of visits.controls){
        let visit: Visit = visitFormGroup.value;
        visit.visitDate = moment(visit.visitDate, 'DD/MM/YYYY').toDate();
        pet.visits.push(visit);
      }

      owner.pets.push(pet);
    }

    await new Promise<any>(resolve => this.ownerService.putOwner(owner, this.ownerId).subscribe(res => resolve(res)));
    this.router.navigateByUrl('/owners');
  }

  addNewPet() {
    const petForm: FormGroup = this.formBuilder.group({
      id: null,
      name: new FormControl('New Pet',[Validators.required, Validators.minLength(2)]),
      birthDate: new FormControl(this.getFormattedDate(new Date()),[Validators.required,Validators.pattern('[0-9]{2}.[0-9]{2}.[0-9]{4}') ,ValidBirthDate.validBirthDate]),
      type: new FormControl(this.types[0],[Validators.required]),
      visits: this.formBuilder.array([])
    });
    this.pets.push(petForm);
  }

  addNewVisit(petControl: FormGroup){
    const visitsArray = petControl.get('visits') as FormArray;
    const visitForm: FormGroup = this.formBuilder.group({
      id: null,
      visitDate: new FormControl(this.getFormattedDate(new Date()),[Validators.required,
                                                                          Validators.pattern('[0-9]{2}.[0-9]{2}.[0-9]{4}'),
                                                                          ValidBirthDate.validBirthDate]),
      description: new FormControl('add description', [Validators.required])
    })
    visitsArray.push(visitForm);
  }


  deletePet(index: number){
    if(confirm('This will delete all pet data. Proceed?')){
      this.pets.removeAt(index);
    }
  }

  deleteOwner(){
    if(confirm('This will permanently delete this Owner and all related data. Proceed?')){
      this.ownerService.deleteOwner(this.owner!.id.toString()).subscribe(
        {
          next: () => {
            alert("Owner successfully deleted");
            this.router.navigateByUrl('/owners')
          },

          error: err => alert(`There was an error: ${err.message}`)
        }
      );
    }
  }

  processUndo(){
    if(confirm('All changes will be lost. Proceed?')){
      this.createFormGroups();
      this.router.navigateByUrl('/owners');
    }
  }

  getFormattedDate(date: Date): string {
    return moment(date).format('DD.MM.YYYY');
  }

  descriptionRequired(petControl: FormGroup): boolean{
    const visitsArray = petControl.get('visits') as FormArray;
    return visitsArray.controls.find(el => el.get('description')!.errors!=null 
                                    && el.get('description')!.errors!.hasOwnProperty('required')) != null;
  }

  visitDateRequired(petControl: FormGroup): boolean{
    const visitsArray = petControl.get('visits') as FormArray;
    return visitsArray.controls.find(el => el.get('visitDate')!.errors!=null 
                                    && el.get('visitDate')!.errors!.hasOwnProperty('required')) != null;
  }

  visitDatePattern(petControl: FormGroup): boolean{
    const visitsArray = petControl.get('visits') as FormArray;
    return visitsArray.controls.find(el => el.get('visitDate')!.errors!=null 
                                    && el.get('visitDate')!.errors!.hasOwnProperty('pattern')) != null;
  }

  visitDateValid(petControl: FormGroup): boolean{
    const visitsArray = petControl.get('visits') as FormArray;
    return visitsArray.controls.find(el => el.get('visitDate')!.errors!=null 
                                    && el.get('visitDate')!.errors!.hasOwnProperty('validBirthDate')) != null;
  }



  get pets() {return this.ownerFormGroup.get('pets') as FormArray;}
  get firstName() {return this.ownerFormGroup.get('personal.firstName');}
  get lastName() {return this.ownerFormGroup.get('personal.lastName');}
  get phoneNumber() {return this.ownerFormGroup.get('personal.phoneNumber');}
  get email() {return this.ownerFormGroup.get('personal.email');}
  get city() {return this.ownerFormGroup.get('personal.city');}
  get address() {return this.ownerFormGroup.get('personal.address');}
}
