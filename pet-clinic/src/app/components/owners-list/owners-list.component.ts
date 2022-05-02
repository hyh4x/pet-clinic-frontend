import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OwnerSlim } from 'src/app/common/owner-slim';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.css']
})
export class OwnersListComponent implements OnInit, OnDestroy {

  owners: OwnerSlim[] = [];
  searchMode: boolean = false;
  reuseRoute: any;

  constructor(private ownerService: OwnerService,
              private route: ActivatedRoute,
              private router: Router) {
                // Refresh data after navigating to same route through search
                this.router.routeReuseStrategy.shouldReuseRoute = function() {
                  return false;
                };
                this.reuseRoute = this.router.events.subscribe(e =>
                  {
                    if (e instanceof NavigationEnd){
                      this.router.navigated = false;
                    }
                  });
               }

  ngOnInit(): void {
    
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchOwners();
    }
    else {
      this.handleListOwners();
    }
    
    
  }

  ngOnDestroy(): void {
    this.reuseRoute.unsubscribe();
  }
  
  handleSearchOwners() {
    const keyword = this.route.snapshot.paramMap.get('keyword')!;
    this.ownerService.searchOwnersList(keyword).subscribe(
      (data: OwnerSlim[]) => {
        this.owners = data;
      }
    )
  }


  private handleListOwners() {
    this.ownerService.getOwnersList().subscribe(
      (data: OwnerSlim[]) => {
        this.owners = data;
      }
    );
  }

  doSearch(value: string){
    this.router.navigateByUrl(`search/${value}`);
  }
}
