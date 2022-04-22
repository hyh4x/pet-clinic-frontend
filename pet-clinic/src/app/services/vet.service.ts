import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vet } from '../common/vet';

@Injectable({
  providedIn: 'root'
})
export class VetService {

  private baseUrl = environment.resourceApiUrl+"/vets"; 

  constructor(private httpClient: HttpClient) { }

  getVetsList(): Observable<Vet[]> {

    return this.httpClient.get<Vet[]>(this.baseUrl);
  }
}
