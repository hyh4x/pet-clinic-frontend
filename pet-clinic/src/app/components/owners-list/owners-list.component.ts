import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { OwnerSlim } from 'src/app/common/owner-slim';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.css']
})
export class OwnersListComponent implements OnInit, OnDestroy {

  owners: OwnerSlim[] = [];
  page: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;
  NotReuseRoute: any;

  constructor(private route: ActivatedRoute,
              private router: Router) {
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

    this.processData(this.route.snapshot.data);
    console.log(this.page);
    console.log(this.pageSize);
    console.log(this.totalElements);

  }

  ngOnDestroy(): void {
    this.NotReuseRoute.unsubscribe();
  }
  
  doSearch(value: string){
    this.router.navigateByUrl(`search/${value}`);
  }

  processData(data: Data) {

    this.owners = data['routeResolver']._embedded['ownerSlimList'];
    this.page = data['routeResolver'].page.number+1;
    this.pageSize = data['routeResolver'].page.size;
    this.totalElements = data['routeResolver'].page.totalElements;
  }
}
