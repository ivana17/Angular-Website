import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreduzeceService {
  uri='http://localhost:4000/'

  constructor(private http: HttpClient) { }

  dohvatiPoljoprivrednika(kor_ime: String){
    const data = {
      kor_ime: kor_ime
    };

    return this.http.post(`${this.uri}/dohvatipolj`, data);
  }
}
