import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Owner } from '../common/owner';
import { OwnerSlim } from '../common/owner-slim';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private baseUrl = environment.resourceApiUrl+'/owners';

  constructor(private httpClient: HttpClient) { }

  getOwnersList(): Observable<GetResponseOwners> {
    const url = `${this.baseUrl}?page=0&size=20`;
    return this.httpClient.get<GetResponseOwners>(url);
  }

  searchOwnersList(keyword: string): Observable<GetResponseOwners> {
    const url = `${this.baseUrl}/search/findOwnersByFirstNameOrLastName?keyword=${keyword}&page=0&size=20`;
    return this.httpClient.get<GetResponseOwners>(url);
  }

  postOwner(owner: Owner): Observable<any>{
    const url = this.baseUrl;
    return this.httpClient.post<Owner>(url, owner);
  }

  putOwner(owner: Owner, id: string): Observable<any>{
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.put<Owner>(url, owner);
  }

  getOwner(id: string): Observable<Owner>{
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Owner>(url);
  }

  deleteOwner(id: string): Observable<any>{
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}

interface GetResponseOwners {
  _embedded: {
    ownerSlimList: OwnerSlim []
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}