import { Component, OnInit, Input } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-header',
  templateUrl: './my-header.component.html',
  styleUrls: ['./my-header.component.css']
})
export class MyHeaderComponent implements OnInit {
  @Input() korisnik: Korisnik;

  constructor() { }

  ngOnInit() {
  }


}
