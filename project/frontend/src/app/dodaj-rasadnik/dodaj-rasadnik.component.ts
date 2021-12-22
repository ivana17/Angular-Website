import { Component, OnInit } from '@angular/core';
import { Rasadnik } from '../models/rasadnik';
import { Poljoprivrednik } from '../models/poljoprivrednik';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dodaj-rasadnik',
  templateUrl: './dodaj-rasadnik.component.html',
  styleUrls: ['./dodaj-rasadnik.component.css']
})
export class DodajRasadnikComponent implements OnInit {

  novi = {} as Rasadnik;
  duzina: number;
  sirina: number;
  ulogovan: Korisnik;
  poruka: String;
  constructor(private servis: KorisnikService, private ruter: Router) { }

  ngOnInit() {
    this.ulogovan = this.servis.dohvatiUlogovanog();
  }
  dodaj() {
    
    if(this.novi.naziv == "" || this.novi.mesto == ""
      || this.duzina == null || this.sirina == null){
        this.poruka = "*Popunite sva polja.";
        return;
      }

    this.novi.magacin = null;
    this.novi.voda = 200;
    this.novi.temperatura = 18;
    this.novi.slobodno = this.duzina * this.sirina;
    this.novi.zasadjeno = 0;

    this.novi.proizvodi = new Array();
    for(let i = 0; i < this.novi.slobodno; i++){
      let prazanProizvod = 
      {
        naziv: "prazna",
        cena: 0,
        preduzece: "",
        tip: 0,
        ocenjivanja: 0,
        ocene: 0,
        komentari: null,
        progres: 0,
      }
      this.novi.proizvodi.push(prazanProizvod);
    }

    this.ulogovan.rasadnici.push(this.novi);
    //console.log(this.ulogovan.rasadnici.length);
    this.servis.izmeniKorisnika(this.ulogovan).subscribe((err : any)=>{
      localStorage.setItem('ulogovan', JSON.stringify(this.ulogovan));
      this.ruter.navigate(['/poljoprivrednik']);
    });

  }

}
