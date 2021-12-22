import { Component, OnInit, Input } from '@angular/core';
import { Preduzece } from '../models/preduzece';

@Component({
  selector: 'app-preduzece-detalji',
  templateUrl: './preduzece-detalji.component.html',
  styleUrls: ['./preduzece-detalji.component.css']
})
export class PreduzeceDetaljiComponent implements OnInit {
  @Input() pred: Preduzece;

  constructor() { }

  ngOnInit() {
  }

}
