import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/common/owner';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.css']
})
export class OwnersListComponent implements OnInit {

  owners: Owner[] = [];

  constructor(private ownerService: OwnerService) { }

  ngOnInit(): void {
    
    this.ownerService.getOwnersList().subscribe(
      (data: Owner[]) => {
        this.owners = data;
        for(let ow of this.owners) {
          console.log(ow);
        }
      }
    );
    
  }

}
