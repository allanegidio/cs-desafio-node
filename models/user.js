var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    telefones: [
        {
            _id: false,
            numero: {
                type: String,
                required: true
            },
            ddd: {
                type: String,
                required: true
            }
        }
    ],
    data_criacao: {
        type: Date,
        default: Date.now
    },
    data_atualizacao: Date,
    ultimo_login: {
        type: Date,
        default: Date.now
    },
    token: String
});

module.exports = mongoose.model('User', userSchema);
