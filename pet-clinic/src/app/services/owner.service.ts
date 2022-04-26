import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OwnerSlim } from '../common/owner-slim';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private baseUrl = environment.resourceApiUrl+'/owners';

  constructor(private httpClient: HttpClient) { }

  getOwnersList(): Observable<OwnerSlim[]> {
    const url = this.baseUrl;
    return this.httpClient.get<OwnerSlim[]>(url);
  }

  searchOwnersList(keyword: string): Observable<OwnerSlim[]> {
    const url = `${this.baseUrl}/search/findByFirstNameContainingOrLastNameContainingAllIgnoreCase?keyword=${keyword}`;
    console.log(keyword);
    return this.httpClient.get<OwnerSlim[]>(url);
  }
}
