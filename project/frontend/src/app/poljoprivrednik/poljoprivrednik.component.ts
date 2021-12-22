import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-poljoprivrednik',
  templateUrl: './poljoprivrednik.component.html',
  styleUrls: ['./poljoprivrednik.component.css']
})
export class PoljoprivrednikComponent implements OnInit {

  poljoprivrednik: Korisnik;
  constructor(private ruta: ActivatedRoute, private servis: KorisnikService, private ruter: Router) { }

  ngOnInit() {
    this.poljoprivrednik = this.servis.dohvatiUlogovanog();
  }

  prodavnica(){
    this.ruter.navigate(['/prodavnica', this.poljoprivrednik.kor_ime]);
  }
  novi_rasadnik(){
    this.ruter.navigate(['/dodajrasadnik']);
  }
  prikazi(naziv: String){
    this.ruter.navigate(['/rasadnik', naziv, this.poljoprivrednik.kor_ime]);
  }
}