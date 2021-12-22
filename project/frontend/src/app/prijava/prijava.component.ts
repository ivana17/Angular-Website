import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  kor_ime: String;
  lozinka: String;
  poruka: String;

  constructor(private ruter: Router, private korisnik: KorisnikService){ 
    this.kor_ime = this.lozinka = this.poruka = "";
  }

  ngOnInit() {
    
  } 

  login(): void{
    if(this.kor_ime == "" || this.lozinka == ""){
      this.poruka = "Popunite sva polja.";
    }
    else {
      this.korisnik.prijava(this.kor_ime, this.lozinka).subscribe((_korisnik: Korisnik)=>{
        if(_korisnik[0]){
          this.korisnik.uloguj(_korisnik[0]);
          if(_korisnik[0].tip=='0') this.ruter.navigate(['/poljoprivrednik']);
          else if(_korisnik[0].tip=='1') this.ruter.navigate(['/preduzece']);
          else this.ruter.navigate(['/admin']);
        }
        else{
          this.poruka = "Ne postoji taj korisnik";
        }
       
      })
    }
  }

}
