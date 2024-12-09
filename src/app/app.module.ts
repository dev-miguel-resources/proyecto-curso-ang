import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
//import { PatientComponent } from './pages/patient/patient.component';
import { LoginComponent } from './login/login.component';
//import { Not404Component } from './pages/not404/not404.component';
import { HttpClientModule } from '@angular/common/http';
//import { LayoutComponent } from './pages/layout/layout.component';
//import { SpecialtyEditComponent } from './pages/specialty/specialty-edit/specialty-edit.component';
//import { SpecialtyComponent } from './pages/specialty/specialty.component';
//import { MedicDialogComponent } from './pages/medic/medic-dialog/medic-dialog.component';
//import { MedicComponent } from './pages/medic/medic.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
