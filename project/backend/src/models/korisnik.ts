import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    kor_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    tip: {
        type: String
    },
    ime: {
        type: String
    },
    naziv: {
        type: String
    },
    prezime: {
        type: String
    },
    datum: {
        type: Date
    },
    mesto: {
        type: String
    },
    kontakt: {
        type: String
    },
    email: {
        type: String
    },
    rasadnici: {
        type: Array
    },
    kuriri: {
        type: Number
    }
});

export default mongoose.model('Korisnik', Korisnik);