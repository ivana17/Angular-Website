import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-footer',
  templateUrl: './my-footer.component.html',
  styleUrls: ['./my-footer.component.css']
})
export class MyFooterComponent implements OnInit {

  constructor(private kor: KorisnikService, private ruter: Router) { }

  ngOnInit() {
  }

  izlogujse(){
    this.kor.izlogujse();
    this.ruter.navigate(['/prijava']);
  }

  ulog(): boolean{
    return this.kor.trenutnoUlogovan();
  }

  izmenilozinku(){
    this.ruter.navigate(['/lozinka']);
  }
}
