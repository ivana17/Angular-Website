import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Proizvod = new Schema({
    naziv: {
        type: String
    },
    cena: {
        type: Number
    },
    preduzece: {
        type: String
    },
    tip: {
        type: Number
    },
    ocenjivanja: {
        type: Number
    },
    ocene: {
        type: Number
    },
    komentari: {
        type: Array
    },
    progres: {
        type: Number
    }
});

export default mongoose.model('Proizvod', Proizvod);