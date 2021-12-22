export interface Proizvod {

    naziv: String;
    cena: number;
    preduzece: String;
    tip: number; // sadnica - 0, preparat - 1

    ocenjivanja: number;
    ocene: number; // prosecna ocena = ocene/ocenjivanja
    komentari: Array<String>;

    progres: number;
}