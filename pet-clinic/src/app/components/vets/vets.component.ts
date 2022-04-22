import { Component, OnInit } from '@angular/core';
import { Vet } from 'src/app/common/vet';
import { VetService } from 'src/app/services/vet.service';

@Component({
  selector: 'app-vets',
  templateUrl: './vets.component.html',
  styleUrls: ['./vets.component.css']
})
export class VetsComponent implements OnInit {

  vets: Vet[] = [];

  constructor(private vetService: VetService) { }

  ngOnInit(): void {
    this.vetService.getVetsList().subscribe(
      (data: Vet[]) => this.vets = data
    )
  }

}
