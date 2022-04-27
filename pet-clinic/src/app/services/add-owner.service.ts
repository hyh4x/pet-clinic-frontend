import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Owner } from '../common/owner';
import { Type } from '../common/type';

@Injectable({
  providedIn: 'root'
})
export class AddOwnerService {

  private baseUrl = environment.resourceApiUrl;

  constructor(private httpClient: HttpClient) { }

  getTypes(): Observable<Type[]> {
    const url = this.baseUrl+"/types";
    return this.httpClient.get<Type[]>(url);
  }

  sendOwner(owner: Owner): Observable<any>{
    const url = this.baseUrl+"/owners"
    return this.httpClient.post<Owner>(url, owner);
  }
}
