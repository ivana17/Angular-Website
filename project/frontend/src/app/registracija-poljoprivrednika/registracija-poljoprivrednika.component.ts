import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Rasadnik } from '../models/rasadnik';
import { Proizvod } from '../models/proizvod';

@Component({
  selector: 'app-registracija-poljoprivrednika',
  templateUrl: './registracija-poljoprivrednika.component.html',
  styleUrls: ['./registracija-poljoprivrednika.component.css']
})
export class RegistracijaPoljoprivrednikaComponent implements OnInit {

  kor_ime: String;
  lozinka: String;
  tip = '3' as String;
  ime: String;
  prezime:String; 
  datum: Date;
  mesto: String;  
  kontakt: String;
  email: String
  rasadnici = null as Array<Rasadnik>;
  magacini = null as Array<Proizvod>;
  kuriri = 0 as Number;

  potvrda: String;
  poruka: String;

  constructor(private korisnik: KorisnikService) { }

  recaptcha: any[];

  resolved(captchaResponse: any[]){
    this.recaptcha = captchaResponse;
    console.log(this.recaptcha);
  }

  ngOnInit() {
  }
  register():void{
    if(this.proveri()){
      this.poruka = "Popunite sva polja.";
      return;
    }
    
    if(!this.lozinka.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$")){
      if(!(this.lozinka.charAt(0)>='A' && this.lozinka.charAt(0)<='Z') 
        && !((this.lozinka.charAt(0)>='a' && this.lozinka.charAt(0)<='z'))){
        this.poruka = "Pattern za lozinku neispravan.";
        return;
      }
    }

    if(this.lozinka != this.potvrda){
      this.poruka = "Lozinka nije lepo uneta."
      return;
    }
    this.korisnik.regpolj(this.kor_ime, this.lozinka,
      this.tip, this.ime, this.prezime, this.datum,
      this.mesto, this.kontakt, this.email, 
      this.rasadnici, this.magacini, 
      this.kuriri).subscribe(user=>{
        if(user['user']=='ok'){
          this.poruka='Zahtev za registraciju je poslat';
        }else if(user['greska']){
          this.poruka=user['greska'];
        }
    })
  }

  proveri(): boolean{
    return (this.ime == null || this.prezime == null 
    || this.kor_ime == null || this.lozinka == null
    || this.datum == null || this.mesto == null
    || this.kontakt == null || this.email == null 
    || this.ime == "" || this.prezime == ""
    || this.kor_ime == "" || this.lozinka == "" 
    || this.datum == null || this.mesto == "" 
    || this.kontakt == "" || this.email == "");
  }

}
