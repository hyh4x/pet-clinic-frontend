import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Type } from '../common/type';

@Injectable({
  providedIn: 'root'
})
export class PetTypesService {

  private baseUrl = environment.resourceApiUrl+"/types";

  constructor(private httpClient: HttpClient) { }

  getTypes(): Observable<Type[]> {
    const url = this.baseUrl;
    return this.httpClient.get<Type[]>(url);
  }

  
}
