import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Narudzbina } from '../models/narudzbina';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-moje-narudzbine',
  templateUrl: './moje-narudzbine.component.html',
  styleUrls: ['./moje-narudzbine.component.css']
})
export class MojeNarudzbineComponent implements OnInit {
  ulogovan: Korisnik;
  constructor(private korisnik: KorisnikService) { }

  displayedColumns: string[] = ['naziv', 'cena', 'tip', 'preduzece', 'stanje', 'actions' ];
  dataSourceN : Narudzbina[];

  ngOnInit() {
    this.ulogovan = this.korisnik.dohvatiUlogovanog();

    this.korisnik.dohvatiNarudzbine().subscribe((_narudzbine: Narudzbina[])=>{
      this.dataSourceN = [];
      _narudzbine.forEach((elem, ind) => {
        if(elem.kor_imePolj === this.ulogovan.kor_ime){
          if(elem.stanje !== "ARHIVIRANO") this.dataSourceN.push(_narudzbine[ind]);
        }
      });
      _narudzbine = null;
    });
  }

  otkazi(row: Narudzbina){
    if(!this.check(row.stanje)) {
      alert("Ne moze se otkazati narudzbina");
      return;
    }
    this.korisnik.obrisiNarudzbinu(row.kor_imePolj, 
      row.indexRasadnika, row.proizvod, row.timestamp)
      .subscribe((err : any)=>{
      location.reload();
    });

    
  }

  check(stanje: String){
    return stanje === "NIJE ISPORUCENO";
  }  

}
