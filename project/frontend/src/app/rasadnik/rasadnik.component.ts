import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoljoprivrednikService } from '../poljoprivrednik.service';
import { Rasadnik } from '../models/rasadnik';
import { interval } from 'rxjs';
import { AdminService } from '../admin.service';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../korisnik.service';
import { Proizvod } from '../models/proizvod';

@Component({
  selector: 'app-rasadnik',
  templateUrl: './rasadnik.component.html',
  styleUrls: ['./rasadnik.component.css']
})
export class RasadnikComponent implements OnInit {

  rasadnik: number;
  poruka: String;
  ulogovan: Korisnik;
  _magacin = false as boolean;
  _zasadi = false as boolean;
  trenutna_sadnica: String;

  dodajpreparat = false;
  dodajsadnicu = false;
  preparatindeks = -1;
  sadnicaindeks = -1;

  constructor(private ruta: ActivatedRoute, private servis: KorisnikService, private ruter: Router) { }

  ngOnInit() {
    let naziv = this.ruta.snapshot.paramMap.get('n');
    this.ulogovan = this.servis.dohvatiUlogovanog();
    this.ulogovan.rasadnici.forEach((r, ind) => {
      if(r.naziv == naziv){
        this.rasadnik = ind;
      }
    });
    
    interval(3600000).subscribe(
      () => {
        this.dodajCelzijus(-0.5);
        this.dodajLitar(-1);
      }
    );
  }

  dodajLitar(za: number){
    this.ulogovan.rasadnici[this.rasadnik].voda += za;
    this.servis.izmeniKorisnika(this.ulogovan).subscribe((err : any)=>{});
    localStorage.setItem('ulogovan', JSON.stringify(this.ulogovan));
  }
  dodajCelzijus(za: number){
    this.ulogovan.rasadnici[this.rasadnik].temperatura += za;
    this.servis.izmeniKorisnika(this.ulogovan).subscribe((err : any)=>{});
    localStorage.setItem('ulogovan', JSON.stringify(this.ulogovan));
  }

  otvoriMagacin(naziv: String){
    this._zasadi = false;
    this._magacin = true;
    this.trenutna_sadnica = naziv;
  }

  iskoristiPreparat(index: number){
    if(!this.dodajpreparat) return;
    this.dodajpreparat = false;

    let preparat = this.ulogovan.rasadnici[this.rasadnik].magacin[index];
    this.ulogovan.rasadnici[this.rasadnik].magacin.splice(index, 1);
        
    
    this.ulogovan.rasadnici[this.rasadnik].proizvodi[this.preparatindeks].progres 
      += preparat.progres;
    if(this.ulogovan.rasadnici[this.rasadnik].proizvodi[this.preparatindeks].progres>100){
      this.ulogovan.rasadnici[this.rasadnik].proizvodi[this.preparatindeks].progres=100;
    }

    this.preparatindeks = -1;

    this.servis.izmeniKorisnika(this.ulogovan).subscribe((err : any)=>{});
    localStorage.setItem('ulogovan', JSON.stringify(this.ulogovan));
  }

  presadi(index: number) {
    this.ulogovan.rasadnici[this.rasadnik].proizvodi[index] = {
                              naziv: "prazna",
                              cena: 0,
                              preduzece: "",
                              tip: 0,
                              ocenjivanja: 0,
                              ocene: 0,
                              komentari:null,
                              progres: 0
                          };
                          
    this.servis.izmeniKorisnika(this.ulogovan).subscribe((err : any)=>{});
    localStorage.setItem('ulogovan', JSON.stringify(this.ulogovan));
  }

  dodajPreparat(sadnica: number){
    this.dodajpreparat = true;
    this._magacin = true;
    this.preparatindeks = sadnica;
  }

  zasadi(sadnica: number) {
    this.dodajsadnicu = true;
    this._magacin = true;
    this.sadnicaindeks = sadnica;
  }

  odaberi(index: number) {
    if(!this.dodajsadnicu) return;
    this.dodajsadnicu = false;

    this.ulogovan.rasadnici[this.rasadnik].proizvodi[this.sadnicaindeks] = this.ulogovan.rasadnici[this.rasadnik].magacin[index];
    this.ulogovan.rasadnici[this.rasadnik].magacin.splice(index, 1);

    this.sadnicaindeks = -1;

    this.servis.izmeniKorisnika(this.ulogovan).subscribe((err : any)=>{});
    localStorage.setItem('ulogovan', JSON.stringify(this.ulogovan));
  }

  slobodne_sadnice(){
    this._zasadi = this._magacin = false;
  }

  magacin(){
    if(this._magacin == true){
      this._magacin = false;
      return;
    }

    this._zasadi = false;
    this._magacin = true;

  }

  tabelarnimagacin(){
    this.ruter.navigate(['/tabmagacin', this.rasadnik]);
  }
  
  odrzavanje(): boolean{
    return !(this.ulogovan.rasadnici[this.rasadnik].voda>74) || !(this.ulogovan.rasadnici[this.rasadnik].temperatura>11);
  }
}
