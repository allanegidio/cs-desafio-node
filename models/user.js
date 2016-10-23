var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notEmpty = function(features){
    if(features.length === 0){return false}
    else {return true};
}

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
    telefones: [{
      _id: false,
      numero: {
          type: String,
          required: true
      },
      ddd: {
          type: String,
          required: true
      }
    }],
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



userSchema.path('telefones').validate(function(telefones){
    if(!telefones){return false}
    else if(telefones.length === 0){return false}
    else return true;
}, 'Telefones needs to have at least one feature');


module.exports = mongoose.model('User', userSchema);
