import { Injectable } from '@angular/core';
import { Korisnik } from './models/korisnik';
import { Poljoprivrednik } from './models/poljoprivrednik';
import { Preduzece } from './models/preduzece';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  admin: Korisnik;
  _ulogovan: String;
  zahtevi: Array<Korisnik> = new Array<Korisnik>();
  korisnici: Array<Korisnik> = new Array<Korisnik>();
  selektovani: Array<Korisnik> = new Array<Korisnik>();

  constructor() { }

  Admin(): Korisnik {
    return this.admin;
  }
  dodajZahtev(k: Korisnik): void{
    this.zahtevi.push(k);
  }
  dohvatiZahteve(): Array<Korisnik>{
    return this.zahtevi;
  }
  prihvatiZahtev(i: number) {
    this.korisnici.push(this.zahtevi[i]);
    this.zahtevi.splice(i, 1);
  }
  odbijZahtev(i: number) {
    this.zahtevi.splice(i, 1);
  }

  dohvatiKorisnike(): Array<Korisnik> {
    return this.korisnici;
  }

  obrisiKorisnika(kor: Korisnik) {
    this.korisnici.forEach((k, index) => {
      if(k.kor_ime == kor.kor_ime && k.lozinka == kor.lozinka){
        this.korisnici.splice(index, 1);
      }
    });
  }

  izmeniKorisnika(kor_ime: String, novi: Korisnik) {
    this.korisnici.forEach((k, index) => {
      if(k.kor_ime == kor_ime){
        this.korisnici[index] = novi;
      }
    });
  }
  dohvatiKorisnika(kor_ime: String): Korisnik{
    let ret = {} as Korisnik;
    this.korisnici.forEach((k, index) => {
      if(k.kor_ime == kor_ime){
        ret = this.korisnici[index];
      }
    });
    return ret;
  }

  promeniLozinku(kor_ime: String, nova: String) {
    if(kor_ime == this.admin.kor_ime){
      this.admin.lozinka = nova;
      return;
    }
    this.korisnici.forEach((k, index) => {
      if(k.kor_ime == kor_ime){
        this.korisnici[index].lozinka = nova;
      }
    });
  }

  zauzeto(kor_ime: String): boolean{
    this.korisnici.forEach(kor => {
      if(kor.kor_ime == kor_ime){
        return true;
      }
    });
    return false;
  }
}
