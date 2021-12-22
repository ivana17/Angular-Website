import { Rasadnik } from './rasadnik';
import { Proizvod } from './proizvod';
import { Korisnik } from './korisnik';

export class Poljoprivrednik extends Korisnik{
    ime: String;
    prezime: String;
    datum_rodjenja: Date;
    mesto_rodjenja: String;
    kontakt: String;
    email: String;

    rasadnici: any;
    magacini: Array<Proizvod>;
}