import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { XsrfInterceptorService } from './services/xsrf-interceptor.service';


const routes: Routes = [
  {path: 'owners/:id', component: OwnerInfoComponent},
  {path: 'owners', component: OwnersListComponent},
  {path: 'home', component: HomeComponent},
  {path: 'vets', component: VetsComponent},
  {path: 'add-owner', component: AddOwnerComponent},
  {path: 'search/:keyword', component: OwnersListComponent},
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientXsrfModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: XsrfInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
