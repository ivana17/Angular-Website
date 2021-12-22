import { Component, OnInit, Input } from '@angular/core';
import { Rasadnik } from '../models/rasadnik';

@Component({
  selector: 'app-rasadnik-detalji',
  templateUrl: './rasadnik-detalji.component.html',
  styleUrls: ['./rasadnik-detalji.component.css']
})
export class RasadnikDetaljiComponent implements OnInit {
@Input() rasadnik: Rasadnik;

  constructor() { }

  ngOnInit() {
  }

}
