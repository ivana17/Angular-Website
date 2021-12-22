import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Proizvod } from '../models/proizvod';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import { Narudzbina } from '../models/narudzbina';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  
  ulogovan: Korisnik;
  constructor(private korisnik: KorisnikService, private ruta: ActivatedRoute) { }

  displayedColumns: string[] = ['naziv', 'cena', 'tip', 'kor_imePolj', 'actions', 'actions2', 'stanje'];
  dataSource : Proizvod[];
  matDataSourceN: MatTableDataSource<any>;
  dataSourceN : Narudzbina[];
  dataSourceNArhivirano : number[][];
  korisnici: Korisnik[];

  tTipSort: boolean;
  tNazivSort: boolean;
  tStatusSort: boolean;
  tPorucioSort: boolean;
  tCenaSort: boolean;

  statusi = [
    {name: "NIJE ISPORUCENO"},
    {name: "ISPORUKA U TOKU"},
    {name: "NA CEKANJU"},
    {name: "ISPORUCENO"}
  ];

  ngOnInit() {
    this.ulogovan = this.korisnik.dohvatiUlogovanog();

    this.korisnik.dohvatiProizvode().subscribe((_proizvodi: Proizvod[])=>{
      this.dataSource = [];
      _proizvodi.forEach((elem, ind) => {
        if(elem.preduzece === this.ulogovan.kor_ime){
          this.dataSource.push(_proizvodi[ind]);
        }
      });
      _proizvodi = null;
    });

    this.korisnik.dohvatiNarudzbine().subscribe((_narudzbine: Narudzbina[])=>{
      this.dataSourceN = [];
      let nArhivirano = [];
      _narudzbine.forEach((elem, ind) => {
        if(elem.proizvod.preduzece === this.ulogovan.kor_ime){
          if(elem.stanje === "ARHIVIRANO") nArhivirano.push(_narudzbine[ind]);
          else this.dataSourceN.push(_narudzbine[ind]);
        }
      });
      _narudzbine = null;
      this.matDataSourceN = new MatTableDataSource(this.dataSourceN);
      this.matDataSourceN.sort = this.sort;

      this.ispitajArhivirane(nArhivirano);
    });

    this.korisnici = null;
    this.korisnik.dohvatiKorisnike().subscribe((kor: Korisnik[])=>{
      this.korisnici = kor;
    });

    this.tTipSort = false;
    this.tNazivSort = false;
    this.tStatusSort = false;
    this.tPorucioSort = false;
    this.tCenaSort = false;
  }

  prihvati(row: Narudzbina){
    if(row.stanje !== "NIJE ISPORUCENO") return;

    if(this.ulogovan.kuriri <= 0) row.stanje = "NA CEKANJU";
    row.stanje = "ISPORUKA U TOKU";
    
    this.korisnik.izmeniNarudzbinu(row).subscribe((err: any) => {});
  }

  azuriraj(row: Narudzbina){
    this.korisnik.izmeniNarudzbinu(row).subscribe((err: any) => {});
  }

  odbij(row: Narudzbina) {
    if(row.stanje !== "NIJE ISPORUCENO") return;

    this.korisnik.obrisiNarudzbinu(row.kor_imePolj, row.indexRasadnika, row.proizvod, row.timestamp).subscribe((err : any)=>{
      location.reload();
    });
  }

  kurirDugmePrikaz(row: Narudzbina){
    return row.stanje === "ISPORUKA U TOKU";
  }

  angazuj(row: Narudzbina){
    if(row.stanje !== "ISPORUKA U TOKU" || this.ulogovan.kuriri <= 0) return;

    setTimeout(()=>{
      let poljo = {} as Korisnik;
      this.korisnici.forEach((k, index) => {
        if(k.kor_ime == row.kor_imePolj){
          poljo = this.korisnici[index];
        }
      });
      if(poljo.rasadnici[row.indexRasadnika].proizvodi == null){
        poljo.rasadnici[row.indexRasadnika].proizvodi = new Array();
      }
      poljo.rasadnici[row.indexRasadnika].magacin.push(row.proizvod);
      
      this.korisnik.izmeniKorisnika(poljo).subscribe((err : any)=>{});

      this.korisnik.obrisiNarudzbinu(row.kor_imePolj, row.indexRasadnika, row.proizvod, row.timestamp).subscribe((err : any)=>{
        location.reload();
      });
      
      this.ulogovan.kuriri++;
      this.korisnik.izmeniKorisnika(this.ulogovan).subscribe((err : any)=>{});
    }, 15000);
    
    this.ulogovan.kuriri--;
    this.korisnik.izmeniKorisnika(this.ulogovan).subscribe((err : any)=>{});

    row.stanje = "ISPORUCENO";
    this.korisnik.izmeniNarudzbinu(row).subscribe((err: any) => {});
  }

  ispitajArhivirane(nArhivirano: any){
    let temp = [];
    let dana30 = 30 * 24 * 60 * 60 * 1000;
    let dan1 = 24 * 60 * 60 * 1000;
    let trenutno = new Date().getTime();

    nArhivirano.forEach((elem, ind) => {
      if(elem.timestamp + dana30 >= trenutno){
        temp.push(nArhivirano[ind]);
      }
    });
    if(temp.length === 0) return;

    this.dataSourceNArhivirano = [];
    let danIter = trenutno - dan1;
    for(var i = 0, j = 0, cnt = 0, danCnt = 0;;){
      if(temp[i].timestamp > danIter){
        j++;
        i++;
      } else{
        danIter -= dan1;

        if(j != 0){
          this.dataSourceNArhivirano[cnt] = [];
          this.dataSourceNArhivirano[cnt][0] = danCnt;
          this.dataSourceNArhivirano[cnt++][1] = j;
          
          danCnt++;
          j = 0;
        } else {
          danCnt++;
          continue;
        }
      }

      if(i == temp.length){
        if(j != 0){
          this.dataSourceNArhivirano[cnt] = [];
          this.dataSourceNArhivirano[cnt][0] = danCnt;
          this.dataSourceNArhivirano[cnt++][1] = j;
        }
        break;
      }
    }
  }

  tipSort(){
    if(this.tTipSort) this.matDataSourceN.data.sort((a,b) => (a.proizvod.tip > b.proizvod.tip) ? 1 : ((b.proizvod.tip > a.proizvod.tip) ? -1 : 0)); 
    else this.matDataSourceN.data.sort((a,b) => (a.proizvod.tip < b.proizvod.tip) ? 1 : ((b.proizvod.tip < a.proizvod.tip) ? -1 : 0));
    this.tTipSort = !this.tTipSort;
    this.matDataSourceN._updateChangeSubscription();
  }

  nazivSort(){
    if(this.tNazivSort) this.matDataSourceN.data.sort((a,b) => (a.proizvod.naziv > b.proizvod.naziv) ? 1 : ((b.proizvod.naziv > a.proizvod.naziv) ? -1 : 0)); 
    else this.matDataSourceN.data.sort((a,b) => (a.proizvod.naziv < b.proizvod.naziv) ? 1 : ((b.proizvod.naziv < a.proizvod.naziv) ? -1 : 0));
    this.tNazivSort = !this.tNazivSort;
    this.matDataSourceN._updateChangeSubscription();
  }

  cenaSort(){
    if(this.tCenaSort) this.matDataSourceN.data.sort((a,b) => (a.proizvod.cena > b.proizvod.cena) ? 1 : ((b.proizvod.cena > a.proizvod.cena) ? -1 : 0)); 
    else this.matDataSourceN.data.sort((a,b) => (a.proizvod.cena < b.proizvod.cena) ? 1 : ((b.proizvod.cena < a.proizvod.cena) ? -1 : 0));
    this.tCenaSort = !this.tCenaSort;
    this.matDataSourceN._updateChangeSubscription();
  }

  porucioSort(){
    if(this.tPorucioSort) this.matDataSourceN.data.sort((a,b) => (a.kor_imePolj > b.kor_imePolj) ? 1 : ((b.kor_imePolj > a.kor_imePolj) ? -1 : 0)); 
    else this.matDataSourceN.data.sort((a,b) => (a.kor_imePolj < b.kor_imePolj) ? 1 : ((b.kor_imePolj < a.kor_imePolj) ? -1 : 0));
    this.tPorucioSort = !this.tPorucioSort;
    this.matDataSourceN._updateChangeSubscription();
  }

  statusSort(){
    if(this.tStatusSort) this.matDataSourceN.data.sort((a,b) => (a.stanje > b.stanje) ? 1 : ((b.stanje > a.stanje) ? -1 : 0)); 
    else this.matDataSourceN.data.sort((a,b) => (a.stanje < b.stanje) ? 1 : ((b.stanje < a.stanje) ? -1 : 0));
    this.tStatusSort = !this.tStatusSort;
    this.matDataSourceN._updateChangeSubscription();
  }
}
