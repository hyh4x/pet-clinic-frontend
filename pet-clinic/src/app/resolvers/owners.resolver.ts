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
export class OwnersResolver implements Resolve<Observable<OwnerSlim[]>> {

  constructor(private ownerService: OwnerService){}

  resolve(route: ActivatedRouteSnapshot): Observable<OwnerSlim[]> {
    
    const searchMode = route.paramMap.has('keyword');

    if(searchMode) {
      return this.handleSearch(route);
    }
    else {
      return this.handleListAll();
    }
   
  }
  
  handleSearch(route: ActivatedRouteSnapshot): Observable<OwnerSlim[]> {
    const keyword = route.paramMap.get('keyword')!;
    return this.ownerService.searchOwnersList(keyword);
  }

  handleListAll(): Observable<OwnerSlim[]> {
    return this.ownerService.getOwnersList();
  }
}
