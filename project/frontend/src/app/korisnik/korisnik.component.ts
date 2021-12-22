import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html',
  styleUrls: ['./korisnik.component.css']
})
export class KorisnikComponent implements OnInit {

  kor_ime: String;
  lozinka: String; 
  
  constructor() { }

  ngOnInit() {
  }

  
}
