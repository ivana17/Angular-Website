import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  korisniciArray: Korisnik[];

  constructor(private korisnik: KorisnikService, private ruter: Router) { }

  ngOnInit() {
    this.korisniciArray = null;
    this.korisnik.dohvatiZahteve().subscribe((_korisnici: Korisnik[])=>{
      this.korisniciArray = _korisnici;
      
    })
  }

  prihvati(k) {
    this.korisnik.prihvatiZahtev(k.kor_ime, k.tip).subscribe((res:any)=>
    {
      if(res.res=='ok'){
        this.korisniciArray.forEach( (item, index) => {
          if(item.kor_ime === k.kor_ime) {
            item.tip = (k.tip == 3) ? 0 : 1;
          }
        });
      }
    });
  }

odbij(kor_ime) {
  this.korisnik.obrisiKorisnika(kor_ime).subscribe((err : any)=>{
    this.korisniciArray.forEach( (item, index) => {
      if(item.kor_ime === kor_ime) 
        this.korisniciArray.splice(index,1);
    });
  });
}

  pregled(){
    this.ruter.navigate(['/pregled']);
  }

}
