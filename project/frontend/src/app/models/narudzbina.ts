import { Proizvod } from './proizvod';

export interface Narudzbina{
    kor_imePolj: String;
    proizvod: Proizvod;
    indexRasadnika: number;    
    stanje: String;
    timestamp: number;
}