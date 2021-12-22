import { Proizvod } from './proizvod';
import { Rasadnik } from './rasadnik';

export class Korisnik{
    kor_ime: String;
    lozinka: String;
    tip: number;
    
    ime: String;
    naziv: String;
    prezime: String;
    datum: String;
    mesto: String;
    kontakt: String;
    email: String;
    rasadnici: Array<Rasadnik>;
    magacini: Array<Proizvod>;
    kuriri: number
}