import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const LotofacilSchema = new Schema({
    concurso: {
        type: String,
        required: "Campo concurso é obrigatório!"
    }, 
    dataSorteio: {
        type: String,
        required: "Campo data sorteio é obrigatório!"
    },    
    bola1: {
        type: String,
        required: "Campo bola1 é obrigatório!"
    },
    bola2: {
        type: String,
        required: "Campo bola2 é obrigatório!"
    }, 
    bola3: {
        type: String,
        required: "Campo bola3 é obrigatório!"
    },
    bola4: {
        type: String,
        required: "Campo bola4 é obrigatório!"
    },
    bola5: {
        type: String,
        required: "Campo bola5 é obrigatório!"
    },
    bola6: {
        type: String,
        required: "Campo bola6 é obrigatório!"
    },
    bola7: {
        type: String,
        required: "Campo bola7 é obrigatório!"
    },
    bola8: {
        type: String,
        required: "Campo bola8 é obrigatório!"
    },
    bola9: {
        type: String,
        required: "Campo bola9 é obrigatório!"
    },
    bola10: {
        type: String,
        required: "Campo bola10 é obrigatório!"
    },
    bola11: {
        type: String,
        required: "Campo bola11 é obrigatório!"
    },
    bola12: {
        type: String,
        required: "Campo bola12 é obrigatório!"
    },
    bola13: {
        type: String,
        required: "Campo bola13 é obrigatório!"
    },
    bola14: {
        type: String,
        required: "Campo bola14 é obrigatório!"
    },
    bola15: {
        type: String,
        required: "Campo bola15 é obrigatório!"
    },
    sequence: {
        type: String
    } 
});
