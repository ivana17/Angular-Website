import { Proizvod } from './proizvod';
import { Poljoprivrednik } from './poljoprivrednik';

export interface Rasadnik {
    naziv: String;
    mesto: String;
    zasadjeno: number;
    slobodno: number;
    proizvodi: Array<Proizvod>;
    magacin: Array<Proizvod>;
    voda: number;
    temperatura: number;
}