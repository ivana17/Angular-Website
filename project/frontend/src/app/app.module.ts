import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoljoprivrednikComponent } from './poljoprivrednik/poljoprivrednik.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { AdminComponent } from './admin/admin.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaPoljoprivrednikaComponent } from './registracija-poljoprivrednika/registracija-poljoprivrednika.component';
import { RegistracijaPreduzecaComponent } from './registracija-preduzeca/registracija-preduzeca.component';
import { FormsModule } from '@angular/forms';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { PoljoprivrednikDetaljiComponent } from './poljoprivrednik-detalji/poljoprivrednik-detalji.component';
import { PreduzeceDetaljiComponent } from './preduzece-detalji/preduzece-detalji.component';
import { IzmeniComponent } from './izmeni/izmeni.component'
import { RecaptchaModule } from 'ng-recaptcha';
import { LozinkaComponent } from './lozinka/lozinka.component';
import { RasadnikDetaljiComponent } from './rasadnik-detalji/rasadnik-detalji.component';
import { RasadnikComponent } from './rasadnik/rasadnik.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MydashboardComponent } from './mydashboard/mydashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { DodajRasadnikComponent } from './dodaj-rasadnik/dodaj-rasadnik.component';
import { ProdavnicaComponent } from './prodavnica/prodavnica.component';
import { MyHeaderComponent } from './my-header/my-header.component';
import { MyFooterComponent } from './my-footer/my-footer.component';
import { MatTableModule } from '@angular/material/table';
import { PregledComponent } from './pregled/pregled.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { KorisnikService } from './korisnik.service';
import { PreduzeceService } from './preduzece.service';
import { MojeNarudzbineComponent } from './moje-narudzbine/moje-narudzbine.component';
import { MagacinComponent } from './magacin/magacin.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthGuard } from './auth.guard';
import { MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    PoljoprivrednikComponent,
    PreduzeceComponent,
    AdminComponent,
    PrijavaComponent,
    RegistracijaPoljoprivrednikaComponent,
    RegistracijaPreduzecaComponent,
    KorisnikComponent,
    PoljoprivrednikDetaljiComponent,
    PreduzeceDetaljiComponent,
    IzmeniComponent,
    LozinkaComponent,
    RasadnikDetaljiComponent,
    RasadnikComponent,
    MydashboardComponent,
    DodajRasadnikComponent,
    ProdavnicaComponent,
    MyHeaderComponent,
    MyFooterComponent,
    PregledComponent,
    MojeNarudzbineComponent,
    MagacinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RecaptchaModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    LayoutModule,
    HttpClientModule,
    MatSortModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule
  ],
  providers: [KorisnikService, PreduzeceService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
