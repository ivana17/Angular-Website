import { Injectable } from '@angular/core';
import { Rasadnik } from './models/rasadnik';
import { Proizvod } from './models/proizvod';

@Injectable({
  providedIn: 'root'
})
export class PoljoprivrednikService {

  sadnice: Array<Proizvod>;
  preparati: Array<Proizvod>;
  rasadnici: Array<Rasadnik>;

  constructor() { }

  dohvatiRasadnike(): Array<Rasadnik> {
    return this.rasadnici;
  }

  dohvatiRasadnik(naziv: String): Rasadnik {
    let ret = {} as Rasadnik;
    this.rasadnici.forEach(r => {
      if(r.naziv == naziv){
        ret = r;
        return ret;
      }
    });
    return ret;
  }

  dodajLitar(naziv: String, za: number){
    this.rasadnici.forEach(r => {
      if(r.naziv == naziv){
        r.voda += za;
        if(r.voda < 0){ r.voda = 0; }
        if(r.voda > 1000) { r.voda = 1000; }
      }
    });
  }
  dodajCelzijus(naziv: String, za: number){
    this.rasadnici.forEach(r => {
      if(r.naziv == naziv){
        r.temperatura += za;
        if(r.temperatura < 5){ r.temperatura = 5; }
        if(r.temperatura > 28) { r.temperatura = 28; }
      }
    });
  }
  azurirajRasadnike(r: Array<Rasadnik>){
    this.rasadnici = r;
  }
}
