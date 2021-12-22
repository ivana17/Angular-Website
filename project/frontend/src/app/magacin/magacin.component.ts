
import {Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../korisnik.service';
import { ActivatedRoute } from '@angular/router';
import { Proizvod } from '../models/proizvod';
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-magacin',
  templateUrl: './magacin.component.html',
  styleUrls: ['./magacin.component.css']
})
export class MagacinComponent implements OnInit {

  tNazivSort: boolean;
  tTipSort: boolean;
  tPreduzeceSort: boolean;
  tCenaSort: boolean;
  tProgresSort: boolean;

  ulogovan: Korisnik;
  indexRas: number;
  magacin: Proizvod[];
  
  displayedColumns: string[] = ['naziv', 'cena', 'preduzece', 'tip', 'progres'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private servis: KorisnikService, private ruta: ActivatedRoute) { }

  ngOnInit() {
    this.ulogovan = this.servis.dohvatiUlogovanog();
    this.indexRas = +this.ruta.snapshot.paramMap.get('i');

    this.magacin = this.ulogovan.rasadnici[this.indexRas].magacin;
    this.dataSource = new MatTableDataSource(this.ulogovan.rasadnici[this.indexRas].magacin);

    this.dataSource.sort = this.sort;
    
    this.tNazivSort = false;
    this.tTipSort = false;
    this.tPreduzeceSort = false;
    this.tCenaSort = false;
    this.tProgresSort = false;
  }

  applyFilter(filterVal: string){
    this.dataSource.filter = filterVal.trim().toLowerCase();
    
  }

  cenaSort(){
    if(this.tCenaSort) this.dataSource.data.sort((a,b) => (a.cena > b.cena) ? 1 : ((b.cena > a.cena) ? -1 : 0)); 
    else this.dataSource.data.sort((a,b) => (a.cena < b.cena) ? 1 : ((b.cena < a.cena) ? -1 : 0));
    this.tCenaSort = !this.tCenaSort;
    this.dataSource._updateChangeSubscription();
  }
  
  progresSort(){
    if(this.tProgresSort) this.dataSource.data.sort((a,b) => (a.progres > b.progres) ? 1 : ((b.progres > a.progres) ? -1 : 0)); 
    else this.dataSource.data.sort((a,b) => (a.progres < b.progres) ? 1 : ((b.progres < a.progres) ? -1 : 0));
    this.tProgresSort = !this.tProgresSort;
    this.dataSource._updateChangeSubscription();
  }

  nazivSort(){
    if(this.tNazivSort) this.dataSource.data.sort((a,b) => (a.naziv > b.naziv) ? 1 : ((b.naziv > a.naziv) ? -1 : 0)); 
    else this.dataSource.data.sort((a,b) => (a.naziv < b.naziv) ? 1 : ((b.naziv < a.naziv) ? -1 : 0));
    this.tNazivSort = !this.tNazivSort;
    this.dataSource._updateChangeSubscription();
  }

  tipSort(){
    if(this.tTipSort) this.dataSource.data.sort((a,b) => (a.tip > b.tip) ? 1 : ((b.tip > a.tip) ? -1 : 0)); 
    else this.dataSource.data.sort((a,b) => (a.tip < b.tip) ? 1 : ((b.tip < a.tip) ? -1 : 0));
    this.tTipSort = !this.tTipSort;
    this.dataSource._updateChangeSubscription();
  }

  preduzeceSort(){
    if(this.tPreduzeceSort) this.dataSource.data.sort((a,b) => (a.preduzece > b.preduzece) ? 1 : ((b.preduzece > a.preduzece) ? -1 : 0)); 
    else this.dataSource.data.sort((a,b) => (a.preduzece < b.preduzece) ? 1 : ((b.preduzece < a.preduzece) ? -1 : 0));
    this.tPreduzeceSort = !this.tPreduzeceSort;
    this.dataSource._updateChangeSubscription();
  }
}
