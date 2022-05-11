import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { OwnersListComponent } from './components/owners-list/owners-list.component';
import { HomeComponent } from './components/home/home.component';
import { VetsComponent } from './components/vets/vets.component';
import { AddOwnerComponent } from './components/add-owner/add-owner.component';
import { OwnerInfoComponent } from './components/owner-info/owner-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditableOwnerInputComponent } from './components/misc/editable-owner-input/editable-owner-input.component';
import { EditablePetInputComponent } from './components/misc/editable-pet-input/editable-pet-input.component';
import { EditablePetSelectComponent } from './components/misc/editable-pet-select/editable-pet-select.component';
import { EditableVisitRowComponent } from './components/misc/editable-visit-row/editable-visit-row.component';
import { PhonePipe } from './pipes/phone.pipe';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './init/keycloak-init.factory';
import { AuthGuard } from './guards/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';


const routes: Routes = [
  {path: 'owners/:id', component: OwnerInfoComponent, canActivate: [AuthGuard]},
  {path: 'owners', component: OwnersListComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'vets', component: VetsComponent, canActivate: [AuthGuard]},
  {path: 'add-owner', component: AddOwnerComponent, canActivate: [AuthGuard]},
  {path: 'search/:keyword', component: OwnersListComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    OwnersListComponent,
    HomeComponent,
    VetsComponent,
    AddOwnerComponent,
    OwnerInfoComponent,
    EditableOwnerInputComponent,
    EditablePetInputComponent,
    EditablePetSelectComponent,
    EditableVisitRowComponent,
    PhonePipe,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    KeycloakAngularModule
  ],
  providers: [{provide: APP_INITIALIZER, useFactory: initializeKeycloak, multi: true, deps: [KeycloakService]}],
  bootstrap: [AppComponent]
})
export class AppModule { }
