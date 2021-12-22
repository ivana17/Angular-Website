import { Component, OnInit, Input } from '@angular/core';
import { Poljoprivrednik } from '../models/poljoprivrednik';

@Component({
  selector: 'app-poljoprivrednik-detalji',
  templateUrl: './poljoprivrednik-detalji.component.html',
  styleUrls: ['./poljoprivrednik-detalji.component.css']
})
export class PoljoprivrednikDetaljiComponent implements OnInit {
  @Input() poljo: Poljoprivrednik;

  constructor() { }

  ngOnInit() {
  }

}
