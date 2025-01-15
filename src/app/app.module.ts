import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
//import { PatientComponent } from './pages/patient/patient.component';
//import { LoginComponent } from './login/login.component';
//import { Not404Component } from './pages/not404/not404.component';
import { HttpClientModule } from '@angular/common/http';
//import { SearchDialogComponent } from './pages/search/search-dialog/search-dialog.component';
//import { SearchComponent } from './pages/search/search.component';
//import { ConsultAutocompleteComponent } from './pages/consult-autocomplete/consult-autocomplete.component';
//import { ConsultWizardComponent } from './pages/consult-wizard/consult-wizard.component';
//import { ExamEditComponent } from './pages/exam/exam-edit/exam-edit.component';
//import { ExamComponent } from './pages/exam/exam.component';
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
