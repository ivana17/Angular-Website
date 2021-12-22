import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'
import { Korisnik } from './models/korisnik';
import { Narudzbina } from './models/narudzbina';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {
  uri='http://localhost:4000'

  constructor(private http: HttpClient) { }

  prijava(kor_ime, lozinka){
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka
    };

    return this.http.post(`${this.uri}/prijava`, data);
  }

  uloguj(ulogovan: Korisnik){
    localStorage.setItem('ulogovan', JSON.stringify(ulogovan));
  }
  dohvatiUlogovanog(): Korisnik{
    return JSON.parse(localStorage.getItem('ulogovan'));
  }
  izlogujse(){
    localStorage.removeItem('ulogovan');
  }
  trenutnoUlogovan(){ // proverava da li postoji trenutno ulogovani korisnik
    return localStorage.getItem('ulogovan') != null;
  }
  trenutnoUlogovanTip(): number{
    let i = localStorage.getItem('ulogovan');
    if(i != null){
      let kor = JSON.parse(i);
      if(kor.tip == '0') return 0;
      if(kor.tip == '1') return 1;
      if(kor.tip == '2') return 2;
    }
    return -1;
  }

  dohvatiPoljoprivrednika(kor_ime: String){
    const data = {
      kor_ime: kor_ime
    };

    return this.http.post(`${this.uri}/dohvatipolj`, data);
  }
  
  regpolj(kor_ime, lozinka, tip, ime, prezime, datum,
    mesto, kontakt, email, rasadnici, magacini, kuriri){

      const data={
        kor_ime: kor_ime, 
        lozinka: lozinka,
        tip: tip,
        ime: ime, 
        prezime: prezime, 
        datum_rodjenja: datum,
        mesto_rodjenja: mesto,
        kontakt: kontakt, 
        email: email, 
        rasadnici: rasadnici, 
        magacini: magacini, 
        kuriri: kuriri 
      };
      return this.http.post(`${this.uri}/regpolj`, data);
  }

  regpred(kor_ime, lozinka, tip, naziv, datum, mesto, email, kuriri){

      const data={
        kor_ime: kor_ime, 
        lozinka: lozinka,
        tip: tip,
        naziv: naziv, 
        datum: datum, 
        mesto: mesto, 
        email: email, 
        kuriri: kuriri
      };
      return this.http.post(`${this.uri}/regpolj`, data);
  }

  dohvatiKorisnike(){
    return this.http.get(`${this.uri}/pregled`);
  }
  dohvatiZahteve(){
    return this.http.get(`${this.uri}/pregledzahteva`);
  }

  obrisiKorisnika(kor_ime){
    const data = {
      kor_ime: kor_ime,
    };

    return this.http.post(`${this.uri}/obrisi`, data);
  }

  izmeniKorisnika(korisnik: Korisnik){
    return this.http.post(`${this.uri}/izmeniKor`, korisnik);
  }

  izmeniNarudzbinu(narudzbina: Narudzbina){
    return this.http.post(`${this.uri}/izmeniNarudzbinu`, narudzbina);
  }

  prihvatiZahtev(kor_ime, tip){
    const data = {
      kor_ime: kor_ime,
      tip: tip
    };

    return this.http.post(`${this.uri}/prihvatizahtev`, data);
  }

  dohvatiProizvode(){
    return this.http.get(`${this.uri}/dohvatiproizv`);
  }

  dohvatiNarudzbine(){
    return this.http.get(`${this.uri}/dohvatiNarudzbine`);
  }

  dodajNarudzbinu(kor_imePolj, proizvod, indexRasadnika, stanje){
    let time = new Date().getTime(); 
    const data={
      kor_imePolj: kor_imePolj, 
      indexRasadnika: indexRasadnika,
      proizvod: proizvod,
      stanje: stanje,
      timestamp: time
    };
    return this.http.post(`${this.uri}/dodajNarudzbinu`, data);
  }

  
  obrisiNarudzbinu(kor_imePolj, indexRasadnika, proizvod, timestamp){
    const data = {
      kor_imePolj: kor_imePolj, 
      indexRasadnika: indexRasadnika, 
      proizvod: proizvod,
      timestamp: timestamp
    };

    return this.http.post(`${this.uri}/obrisiNarudzbinu`, data);
  }


  dohvatiNar(kor_ime: String){
    const data = {
      kor_ime: kor_ime
    };

    return this.http.post(`${this.uri}/dohvatiNar`, data);
  }

}

