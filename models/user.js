var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  nome: String,
  email: {
    type:String,
    required: true
  },
  senha: {
    type:String,
    required: true
  },
  telefones: [{ numero: String, ddd: String }],
  data_criacao: { type: Date, default: Date.now },
  data_atualizacao: Date,
  ultimo_login: Date,
  token: String
});

module.exports = mongoose.model('User', userSchema);
