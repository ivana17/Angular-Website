import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Proizvod } from '../models/proizvod';
import { KorisnikService } from '../korisnik.service';
import { Narudzbina } from '../models/narudzbina';

@Component({
  selector: 'app-prodavnica',
  templateUrl: './prodavnica.component.html',
  styleUrls: ['./prodavnica.component.css']
})
export class ProdavnicaComponent implements OnInit {

  korisnik: Korisnik;
  ulogovan: Korisnik;
  proizvodi: Proizvod[];
  porucivanje = false;
  indeksRas: number;
  brojkomada: number;
  indeksProizv: number;
  poruka: String;
  trazeno_ime: String;
  traznja = false;

  constructor(private ruta: ActivatedRoute, private servis: KorisnikService, private ruter: Router) { }

  ngOnInit() {
    this.ulogovan = this.servis.dohvatiUlogovanog();
    this.servis.dohvatiProizvode().subscribe((_proizvodi: Proizvod[])=>{
      this.proizvodi = _proizvodi;
    })
    this.poruka="";
  }
  
  poruci(proizvod: number){
    this.poruka="";
    if(this.porucivanje && proizvod == this.indeksProizv){
      this.indeksRas = 0;
    }
    this.porucivanje = true;
    this.indeksProizv = proizvod;
  }
  izadji(){
    this.porucivanje = false;
    this.poruka="";
  }

  ok(){
    if(this.indeksRas == null || this.brojkomada == null){
      this.poruka = "*Popunite sva polja";
      this.indeksRas = 0;
      return;
    }
    if(this.brojkomada <= 0){
      this.poruka = "Minimalan broj komada je 1."
      return;
    }
    if(this.indeksRas >= this.ulogovan.rasadnici.length
      || this.indeksRas < 0){
      this.poruka = "Rasadnik nije u opsegu.";
      this.indeksRas = 0;
      return;
    }
    for(let i = 0; i < this.brojkomada; i++){
      let proizvod = {
        naziv: this.proizvodi[this.indeksProizv].naziv,
        cena: this.proizvodi[this.indeksProizv].cena,
        preduzece: this.proizvodi[this.indeksProizv].preduzece,
        tip: this.proizvodi[this.indeksProizv].tip, 
        ocenjivanja: this.proizvodi[this.indeksProizv].ocenjivanja,
        ocene: this.proizvodi[this.indeksProizv].ocene, 
        komentari: this.proizvodi[this.indeksProizv].komentari,
        progres: 0
      } as Proizvod;
      let stanje = "NIJE ISPORUCENO";

      this.servis.dodajNarudzbinu(this.ulogovan.kor_ime,
        proizvod, this.indeksRas, stanje).subscribe(user=>{
        if(user['user']=='ok'){
          this.poruka = "Poručeno";
        }
      })
    }
    
  }
  uporediStringove(str1: String, str2: String){
    var string1 = str1.toUpperCase();
    var string2 = str2.toUpperCase();
    return string1.includes(string2);
  }

  pretrazi(){
    if(this.trazeno_ime == null || this.trazeno_ime == "") return;
    this.traznja = true;
  }
  prikaziSve(){
    this.traznja = false;
  }

  mojenar(){
    this.ruter.navigate(['/mojenar']);
  }
}
