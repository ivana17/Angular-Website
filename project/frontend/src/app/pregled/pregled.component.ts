import { Component, OnInit, Input } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Router, ActivatedRoute } from '@angular/router';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-pregled',
  templateUrl: './pregled.component.html',
  styleUrls: ['./pregled.component.css']
})
export class PregledComponent implements OnInit {
  korisniciArray: Korisnik[];

  constructor(private korisnik: KorisnikService, private ruter: Router) { }

  ngOnInit() {
    this.korisniciArray = null;
    this.korisnik.dohvatiKorisnike().subscribe((_korisnici: Korisnik[])=>{
      this.korisniciArray = _korisnici;
    })
  }

  izmeni(k: Korisnik) {
    this.ruter.navigate(['/izmeni', k.kor_ime]);
  }

  obrisi(k: Korisnik) {
    this.korisnik.obrisiKorisnika(k.kor_ime).subscribe((err : any)=>{
      this.korisniciArray.forEach( (item, index) => {
        if(item.kor_ime === k.kor_ime) 
          this.korisniciArray.splice(index,1);
      });
    });
  }
}
