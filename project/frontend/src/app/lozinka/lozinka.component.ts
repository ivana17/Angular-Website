import { Component, OnInit } from '@angular/core';
import { ProviderAst } from '@angular/compiler';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-lozinka',
  templateUrl: './lozinka.component.html',
  styleUrls: ['./lozinka.component.css']
})
export class LozinkaComponent implements OnInit {

  stara: String;
  nova: String;
  potvrda: String;

  poruka: String;
  ulogovan: Korisnik;
  korisnik: Korisnik;

  constructor(private servis: KorisnikService, private ruter: Router, private ruta: ActivatedRoute) { }

  ngOnInit() {
    this.korisnik = this.servis.dohvatiUlogovanog();
    let uname = this.korisnik.kor_ime;
    this.servis.dohvatiPoljoprivrednika(uname).subscribe((res : any) => {
      this.ulogovan = res[0];
    });
  }

  promeni(){
    if(!this.ok()){
      this.poruka = "Popunite sva polja.";
      return;
    }
    if(this.stara != this.ulogovan.lozinka){
      this.poruka = "Uneli ste pogresnu lozinku.";
      return;
    }
    if(this.stara==this.nova){
      this.poruka = "Nova lozinka ista kao stara!";
      return;
    }
    if(this.nova == this.potvrda){
      this.ulogovan.lozinka = this.nova;
      this.servis.izmeniKorisnika(this.ulogovan).subscribe((res:any)=>{
        this.ruter.navigate(['/prijava']);
      })
    }
    else{
      this.poruka = "Niste lepo uneli lozinke.";
    }
  }
  ok(): boolean {
    return (this.stara != null && this.stara != ""
            && this.nova != null && this.nova != ""
            && this.potvrda != null && this.potvrda != "")
  }

  izlogujse(){
    /*
    //this.servis.izlogujse();
    this.ruter.navigate['/prijava'];
    */
  }
}
