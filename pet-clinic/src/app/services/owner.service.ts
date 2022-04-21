import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Owner } from '../common/owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private baseUrl = environment.resourceApiUrl+'/owners';

  constructor(private httpClient: HttpClient) { }

  getOwnersList(): Observable<Owner[]> {
    const url = this.baseUrl;
    return this.httpClient.get<Owner[]>(url);
  }
}
