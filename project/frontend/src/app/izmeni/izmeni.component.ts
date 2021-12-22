import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-izmeni',
  templateUrl: './izmeni.component.html',
  styleUrls: ['./izmeni.component.css']
})
export class IzmeniComponent implements OnInit {

  korisnik: Korisnik;
  ulogovan: Korisnik;

  constructor(private ruta: ActivatedRoute, private servis: KorisnikService, private ruter: Router) { }

  ngOnInit() {
    this.ulogovan = this.servis.dohvatiUlogovanog();
    let kor_ime = this.ruta.snapshot.paramMap.get('p1');
    this.servis.dohvatiPoljoprivrednika(kor_ime).subscribe((res:any)=>{
      this.korisnik = res[0];
    })
  }

  izmeni() {
    this.servis.izmeniKorisnika(this.korisnik).subscribe((err : any)=>{
      this.ruter.navigate(['/pregled']);
    });
  }

}
