import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  private hostUrl: string = environment.hostUrl;
  isLoggedIn: boolean = false;

  constructor(private keycloak: KeycloakService) { }

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
  }

  logout() {
    this.keycloak.logout(`${this.hostUrl}/home`).then(() => this.keycloak.clearToken());
  }
}
