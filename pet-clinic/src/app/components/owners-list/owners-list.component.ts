import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OwnerSlim } from 'src/app/common/owner-slim';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.css']
})
export class OwnersListComponent implements OnInit, OnDestroy {

  owners: OwnerSlim[] = [];
  searchMode: boolean = false;
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

    this.owners = this.route.snapshot.data['routeResolver'];

  }

  ngOnDestroy(): void {
    this.NotReuseRoute.unsubscribe();
  }
  
  doSearch(value: string){
    this.router.navigateByUrl(`search/${value}`);
  }
}
