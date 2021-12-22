import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';



const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/projekat');

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('mongo open');
})

const router = express.Router();

import Korisnik from './models/korisnik';
import Proizvod from './models/proizvod';
import Narudzbina from './models/narudzbina';

router.route('/prijava').post(
    (req, res)=>{
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;

        Korisnik.find({'kor_ime':kor_ime, 'lozinka':lozinka},
         (err,user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }
);

router.route('/dohvatipolj').post(
    (req, res)=>{
        let kor_ime = req.body.kor_ime;
        Korisnik.find({"kor_ime":kor_ime},
        (err, user)=>{
            if(err) console.log(err);
            res.json(user);
        });
    }
);

router.route('/dohvatiNar').post(
    (req, res)=>{
        let kor_ime = req.body.kor_ime;
        Narudzbina.find({"kor_imePolj":kor_ime},
        (err, user)=>{
            if(err) console.log(err);
            res.json(user);
        });
    }
);

router.route('/pregled').get(
    (req, res)=>{
        Korisnik.find({'tip': { $lt: 2 }},
         (err,users)=>{
            if(err) console.log(err);
            else res.json(users);
        })
    }
);
router.route('/pregledzahteva').get(
    (req, res)=>{
        Korisnik.find({'tip': { $gt: 2 }},
         (err,users)=>{
            if(err) console.log(err);
            else res.json(users);
        })
    }
);

router.route('/dohvatiproizv').get(
    (req, res)=>{
        Proizvod.find({},
         (err,users)=>{
            if(err) console.log(err);
            else res.json(users);
        })
    }
);

router.route('/obrisi').post(
    (req, res)=>{
        let kor_ime = req.body.kor_ime;
        Korisnik.deleteOne({"kor_ime":kor_ime},(err)=>{
            res.json(err);
            if(err) console.log(err);
        });
    }
);

router.route('/regpolj').post((req, res)=>{
    let kor_ime = req.body.kor_ime;
    Korisnik.find({"kor_ime":kor_ime},
    (err, user)=>{
        if(user.length == 0){
            let userr = new Korisnik(req.body);
            userr.save().
                then(user=>{
                    res.status(200).json({'user':'ok'});
                }).catch(err=>{
                    res.status(400).json({'user':'no'});
                })            
        } else{
            res.json({"greska":"Korisnicko ime vec postoji."});
        }
    });

});

router.route('/izmeniKor').post((req, res)=>{
    let kor_ime = req.body.kor_ime;
    if(req.body.tip == '0'){
        Korisnik.collection.updateOne({'kor_ime':kor_ime}, { $set: {
                                                    "kor_ime" : req.body.kor_ime,
                                                    "lozinka" : req.body.lozinka,
                                                    "tip" : req.body.tip,
                                                    "ime" : req.body.ime,
                                                    "prezime" : req.body.prezime,
                                                    "datum_rodjenja" : req.body.datum_rodjenja,
                                                    "mesto_rodjenja" : req.body.mesto_rodjenja,
                                                    "kontakt" : req.body.kontakt,
                                                    "email" : req.body.email,
                                                    "rasadnici" : req.body.rasadnici
                                                }
        }, (r) => {
                res.json(r);
            });
    }else if(req.body.tip == '1'){
        Korisnik.collection.updateOne({'kor_ime':kor_ime}, { $set: {
                                                "kor_ime" : req.body.kor_ime,
                                                "lozinka" : req.body.lozinka,
                                                "tip" : req.body.tip,
                                                "naziv" : req.body.naziv,
                                                "datum_osnivanja" : req.body.datum_osnivanja,
                                                "mesto" : req.body.mesto,
                                                "email" : req.body.email,
                                                "kuriri" : req.body.kuriri
                                            }
        }, (r) => {
                res.json(r);
            });
    }   
});

router.route('/prihvatizahtev').post(
    (req, res)=>{
        let kor_ime = req.body.kor_ime;
        let tip = req.body.tip;
        let novi_tip = (tip == '3') ? '0' : '1';
        
    Korisnik.collection.updateOne({'kor_ime':kor_ime}, {$set:{'tip':novi_tip}});
    res.json({'res':'ok'});
});


router.route('/dohvatiNarudzbine').get(
    (req, res)=>{
        Narudzbina.find({}).sort({timestamp: -1}).exec(
         (err,users)=>{
            if(err) console.log(err);
            else res.json(users);
        })
    }
);

router.route('/dodajNarudzbinu').post((req, res)=>{
    let user = new Narudzbina(req.body);
    user.save().
        then(user=>{
            res.status(200).json({'user':'ok'});
        }).catch(err=>{
            res.status(400).json({'user':'no'});
        })
});

router.route('/izmeniNarudzbinu').post((req, res)=>{
    let kor_imePolj = req.body.kor_imePolj;
    let indexRasadnika = req.body.indexRasadnika;
    let proizvod = req.body.proizvod;
    Narudzbina.collection.updateOne({'kor_imePolj':kor_imePolj, 'indexRasadnika':indexRasadnika, 
                            'proizvod':proizvod}, { $set: {
                                                "kor_imePolj" : req.body.kor_imePolj,
                                                "indexRasadnika" : req.body.indexRasadnika,
                                                "proizvod" : req.body.proizvod,
                                                "stanje" : req.body.stanje
                                            }
    }, (r) => {
            res.json(r);
        });
    
});

router.route('/obrisiNarudzbinu').post(
    (req, res)=>{
        let kor_imePolj = req.body.kor_imePolj;
        let indexRasadnika = req.body.indexRasadnika;
        let proizvod = req.body.proizvod;
        let timestamp = req.body.timestamp;
        
        Narudzbina.collection.updateOne({'kor_imePolj':kor_imePolj, 'indexRasadnika':indexRasadnika, 
        'proizvod':proizvod}, { $set: {
                            "kor_imePolj" : req.body.kor_imePolj,
                            "indexRasadnika" : req.body.indexRasadnika,
                            "proizvod" : req.body.proizvod,
                            "stanje" : "ARHIVIRANO",
                            "timestamp" : timestamp
                        }
            }, (r) => {
                res.json(r);
            });
    }
);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));