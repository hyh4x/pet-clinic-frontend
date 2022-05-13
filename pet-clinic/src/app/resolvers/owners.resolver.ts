import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OwnerSlim } from '../common/owner-slim';
import { OwnerService } from '../services/owner.service'

@Injectable({
  providedIn: 'root'
})
export class OwnersResolver implements Resolve<Observable<GetResponseOwners>> {

  constructor(private ownerService: OwnerService){}

  resolve(route: ActivatedRouteSnapshot): Observable<GetResponseOwners> {
    
    const searchMode = route.paramMap.has('keyword');

    if(searchMode) {
      return this.handleSearch(route);
    }
    else {
      return this.handleListAll();
    }
   
  }
  
  handleSearch(route: ActivatedRouteSnapshot): Observable<GetResponseOwners> {
    const keyword = route.paramMap.get('keyword')!;
    return this.ownerService.searchOwnersList(keyword);
  }

  handleListAll(): Observable<GetResponseOwners> {
    return this.ownerService.getOwnersList();
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
