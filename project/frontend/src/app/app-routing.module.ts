import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoljoprivrednikComponent } from './poljoprivrednik/poljoprivrednik.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { RegistracijaPoljoprivrednikaComponent } from './registracija-poljoprivrednika/registracija-poljoprivrednika.component';
import { RegistracijaPreduzecaComponent } from './registracija-preduzeca/registracija-preduzeca.component';
import { AdminComponent } from './admin/admin.component';
import { IzmeniComponent } from './izmeni/izmeni.component';
import { LozinkaComponent } from './lozinka/lozinka.component';
import { RasadnikComponent } from './rasadnik/rasadnik.component';
import { DodajRasadnikComponent } from './dodaj-rasadnik/dodaj-rasadnik.component';
import { ProdavnicaComponent } from './prodavnica/prodavnica.component';
import { PregledComponent } from './pregled/pregled.component';
import { MojeNarudzbineComponent } from './moje-narudzbine/moje-narudzbine.component';
import { MagacinComponent } from './magacin/magacin.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { RedirectGuard } from './redirect.guard';

const routes: Routes = [
  { path: '', canActivate: [RedirectGuard], component: PrijavaComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'poljoprivrednik', canActivate: [AuthGuard], component: PoljoprivrednikComponent },
  { path: 'admin', canActivate: [AdminGuard], component: AdminComponent }, //auth gard.
  { path: 'preduzece', canActivate: [AuthGuard], component: PreduzeceComponent },
  { path: 'regpolj', component: RegistracijaPoljoprivrednikaComponent },
  { path: 'regpred', component: RegistracijaPreduzecaComponent },
  { path: 'izmeni/:p1', canActivate: [AdminGuard], component: IzmeniComponent },
  { path: 'lozinka', canActivate: [AuthGuard], component: LozinkaComponent },
  { path: 'rasadnik/:n/:k', canActivate: [AuthGuard], component: RasadnikComponent },
  { path: 'prodavnica/:k', canActivate: [AuthGuard], component: ProdavnicaComponent },
  { path: 'dodajrasadnik', canActivate: [AuthGuard], component: DodajRasadnikComponent },
  { path: 'pregled', canActivate: [AdminGuard], component: PregledComponent },
  { path: 'mojenar', canActivate: [AuthGuard], component: MojeNarudzbineComponent },
  { path: 'tabmagacin/:i', canActivate: [AuthGuard], component: MagacinComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
