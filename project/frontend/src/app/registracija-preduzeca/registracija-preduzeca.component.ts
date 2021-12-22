import { Component, OnInit } from '@angular/core';
import { Preduzece } from '../models/preduzece';
import { AdminService } from '../admin.service';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-registracija-preduzeca',
  templateUrl: './registracija-preduzeca.component.html',
  styleUrls: ['./registracija-preduzeca.component.css']
})
export class RegistracijaPreduzecaComponent implements OnInit {

  kor_ime: String;
  lozinka: String;
  tip = '4' as String;
  naziv: String;
  datum: Date;
  mesto: String;
  email: String;
  kuriri = 5 as Number;

  potvrda: String;
  poruka: String;

  constructor(private korisnik: KorisnikService) { }

  recaptcha: any[];

  resolved(captchaResponse: any[]){
    this.recaptcha = captchaResponse;
    console.log(this.recaptcha);
  }

  ngOnInit(){
  }

  register():void{
    if(this.proveri()){
      this.poruka = "Popunite sva polja.";
      return;
    }
    if(!this.lozinka.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$")
      || this.lozinka[0].match(/[a-z]/i)){
        this.poruka = "Pattern za lozinku neispravan.";
        return;
    }
    if(this.lozinka != this.potvrda){
      this.poruka = "Lozinka nije lepo uneta."
      return;
    }
    this.korisnik.regpred(this.kor_ime, this.lozinka,
      this.tip, this.naziv, this.datum,
      this.mesto, this.email, this.kuriri).subscribe(user=>{
        if(user['user']=='ok'){
          this.poruka='Zahtev za registraciju je poslat';
        }else if(user['greska']){
          this.poruka=user['greska'];
        }
    })
  }

  proveri(): boolean{
    return (this.naziv == null 
    || this.kor_ime == null || this.lozinka == null
    || this.datum == null || this.mesto == null
    || this.email == null 
    || this.kor_ime == "" || this.lozinka == "" 
    || this.datum == null || this.mesto == "" 
    || this.email == "");
  }

}
