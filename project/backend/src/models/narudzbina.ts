import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Narudzbina = new Schema({
    kor_imePolj: {
        type: String
    },
    proizvod: {
        type: Object 
    },
    indexRasadnika: {
        type: Number
    },
    stanje: {
        type: String
    },
    timestamp: {
        type: Number
    }
});

export default mongoose.model('Narudzbina', Narudzbina);