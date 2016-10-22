var User = require('../models/user');
var md5 = require('md5');
var auth = require('../security/auth');

exports.singupCreateUser = function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(error, user){
      if(error){
        res.status(500);
        res.json({error: error, message: 'House um erro ao procurar o usuário.'});
        return;
      }

      if(user){
        res.status(404);
        res.json({message: 'E-mail já existente'});
        return;
      }

      else {
        user = new User();
        user.nome = req.body.nome;
        user.senha = md5(req.body.senha + global.HASH_CODE);
        user.telefones = req.body.telefones;
        user.email = req.body.email;
        user.data_atualizacao = "";
        user.token = auth.signIn(user);

        user.save(function(error) {
            if (error) {
                res.status(500).json({error: error, message: 'Não foi possível criar o usuário'});
                return;
            }
            res.status(201).json({
              id: user._id,
              nome: user.nome,
              email: user.email,
              senha: user.senha,
              telefones: user.telefones,
              data_criacao: user.data_criacao,
              data_atualizacao: user.data_atualizacao !== null ? user.data_criacao : null,
              ultimo_login: user.ultimo_login,
              token: user.token
            });
        });
      }
    });
}

exports.getUserAndLogin = function(req, res) {
    User.findOne({
        email: req.body.email,
        senha: md5(req.body.senha + global.HASH_CODE)
    }, function(error, user) {
        if (error) {
            res.status(500).json(error);
            return;
        }

        if(!user){
          res.status(404).json({message: 'Usuário e/ou senha inválidos'});
          return;
        }

        if(user.length > 0 && user.senha === md5(req.body.senha + global.HASH_CODE)){
          res.status(401).json({message: 'Usuário e/ou senha inválidos'});
          return;
        }

        user.ultimo_login = Date.now();
        user.token = auth.signIn(user);

        user.save(function(error){
          if(error){
            res.status(500).json(error);
            return;
          }

          res.status(200).json({
            id: user._id,
            nome: user.nome,
            email: user.email,
            senha: user.senha,
            telefones: user.telefones,
            data_criacao: user.data_criacao,
            data_atualizacao: user.data_atualizacao !== null ? user.data_atualizacao : null,
            ultimo_login: user.ultimo_login,
            token: user.token
          });
        });
    });
}

exports.seachUser = function(req, res) {
    var userId = req.params.id;
    User.findOne({
       _id: userId
    }, function(error, user) {
        if (error) {
            res.status(500).json(error);
            return;
        }

        res.status(200).json(user);
    });
}
