import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/common/owner';
import { Pet } from 'src/app/common/pet';
import { OwnerService } from 'src/app/services/owner.service';
import * as moment from 'moment';
import { Type } from 'src/app/common/type';
import { PetTypesService } from 'src/app/services/pet-types.service';
import { Visit } from 'src/app/common/visit';

@Component({
  selector: 'app-owner-info',
  templateUrl: './owner-info.component.html',
  styleUrls: ['./owner-info.component.css']
})
export class OwnerInfoComponent implements OnInit {

  owner: Owner | null;
  types: Type[] = [];
  typeNames: string[];

  constructor(private ownerService: OwnerService,
              private route: ActivatedRoute,
              private typesService: PetTypesService,
              private router: Router) { }

  ngOnInit(): void {
    this.getOwner();
    this.getTypes();
  }


  getOwner() {
    const ownerId = this.route.snapshot.paramMap.get('id');
    if(ownerId){
      this.ownerService.getOwner(ownerId).subscribe(
        data => this.owner = data
      );
    }
  }

  getTypes() {
    this.typesService.getTypes().subscribe(
      (data: Type[]) => {
        this.types = data;
        this.typeNames = this.types.map(el => el.type);
      }
    );
  }

  addNewPet(){
    let pet = new Pet('New Pet', this.types[0]);
    this.owner!.pets.push(pet);
  }

  deletePet(index: number){
    if(confirm('This will delete all pet data. Proceed?')){
      this.owner!.pets.splice(index,1);
    }
  }

  addNewVisit(pet: Pet){
    let visit = new Visit('New Visit');
    pet.visits.push(visit); 
  }

  deleteVisit(pet: Pet, index: number){
    pet.visits.splice(index,1);
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
      this.getOwner();
    }
  }

  processFirstName(value: string){
    this.owner!.firstName = value;
  }

  processLastName(value: string){
    this.owner!.lastName = value;
  }

  processPhoneNumber(value: string){
    this.owner!.phoneNumber = value;
  }

  processEmail(value: string){
    this.owner!.email = value;
  }

  processCity(value: string){
    this.owner!.city = value;
  }

  processAddress(value: string){
    this.owner!.address = value;
  }

  processPetName(pet: Pet, value: string){
    pet.name = value;
  }

  processPetBirthDate(pet: Pet, value: string){
    pet.birthDate = moment(value,'DD/MM/YYYY').toDate();
  }

  getFormattedDate(date: Date): string {
    return moment(date).format('DD.MM.YYYY');
  }

  processType(pet: Pet, value: string){
    let type: Type = this.types.find(el => el.type === value)!;
    pet.type = type;
    console.log(pet);
  }

}
