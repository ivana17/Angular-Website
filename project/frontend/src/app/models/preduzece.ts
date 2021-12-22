import { Korisnik } from './korisnik';

export class Preduzece extends Korisnik{
    naziv: String;
    datum_osnivanja: Date;
    mesto: String;
    email: String;

    kuriri: number;
}