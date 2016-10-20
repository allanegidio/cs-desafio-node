var User = require('../models/user');
var md5 = require('md5');

exports.createUser = function(req, res){
  var user = new User();
  user.nome = req.body.nome;
  user.senha = md5(req.body.senha + global.HASH_CODE);
  user.telefones = req.body.telefones;
  user.email = req.body.email;

  user.save(function(error){
    if(error){
      res.status(500).json({
        error: error,
        message: 'Não foi possível criar o usuário'
      });
      return;
    }

    res.status(201).json(user);
  });
}

exports.getAllUsers = function(req, res){
  User.find({}, function(error, result){
      if(error){
        res.status(500).json({
          error: error,
          message: 'Não foi possível criar o usuário'
        });
        return;
      }

      res.status(200).json(result);
  });
}

exports.getUserById = function(req, res){
  var id = req.params.id;
  User.findOne({ _id: id }, function(error, result){
    if(error){
      res.status(500).json({
        error: error,
        message: 'Não foi possível encontrar o usuário!'
      });
      return;
    }

    res.status(200).json(result);
  });
}

exports.updateUserById = function(req, res){
  var id = req.params.id;
  User.findOne({ _id: id }, function(error, user) {
    if(error){
      res.status(500).json({
        error: error,
        message: 'Não foi possível encontrar o usuário!'
      });
      return;
    }

    if(!user){
      res.status(404).json({
        error: error,
        message: 'Não foi possível encontrar o usuário!'
      });
      return;
    }

    user.nome = req.body.nome;
    user.senha = md5(req.body.senha + global.HASH_CODE);
    user.telefones = req.body.telefones;
    user.email = req.body.email;
    user.token = '';
    user.data_atualizacao = Date.now();

    user.save(function(error){
      if(error){
        res.status(500).json({
          error: error,
          message: 'Não foi possível atualizar o usuário!'
        });
        return;
      }

      res.status(200).json({
        user: user,
        message: 'Usuário alterado com sucesso!'
      });
    });
  });
}
