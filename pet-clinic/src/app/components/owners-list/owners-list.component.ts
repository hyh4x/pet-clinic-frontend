import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { OwnerSlim } from 'src/app/common/owner-slim';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.css']
})
export class OwnersListComponent implements OnInit, OnDestroy {

  owners: OwnerSlim[] = [];
  page: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  NotReuseRoute: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ownerService: OwnerService) {
                // Refresh data after navigating to same route through search
                this.router.routeReuseStrategy.shouldReuseRoute = function() {
                  return false;
                };
                this.NotReuseRoute = this.router.events.subscribe(e =>
                  {
                    if (e instanceof NavigationEnd){
                      this.router.navigated = false;
                    }
                  });
               }

  ngOnInit(): void {

    this.listOwners();

  }

  ngOnDestroy(): void {
    this.NotReuseRoute.unsubscribe();
  }

  listOwners() {
    if(this.route.snapshot.paramMap.has('keyword')){
      this.handleSearch();
    } else {
      this.handleListAll();
    }
  }

  handleSearch() {
    const keyword = this.route.snapshot.paramMap.get('keyword')!;
    this.ownerService.searchOwnersList(keyword, this.page-1, this.pageSize).subscribe(this.processResponse());
  }

  handleListAll() {
    this.ownerService.getOwnersList(this.page-1, this.pageSize).subscribe(this.processResponse());
  }
  
  doSearch(value: string){
    this.router.navigateByUrl(`search/${value}`);
  }

  processResponse() {
    return (data: { _embedded: { owners: OwnerSlim[] }, page: { number: number; size: number; totalElements: number; }; }) => {
      this.owners = data._embedded['owners'];
      this.page = data.page.number+1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

}
