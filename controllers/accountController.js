var User = require('../models/user');
var md5 = require('md5');
var auth = require('../security/auth');

exports.authenticate = function(req, res) {
    User.findOne({
        email: req.body.email,
        senha: md5(req.body.senha + global.HASH_CODE)
    }, function(error, user) {
        if (error) {
            res.status(500).json(error);
            return;
        }

        if (!user) {
            res.status(401).json({message: 'Usuário ou senha inválidos'});
            return;
        }

        var token = auth.signIn(user);

        res.status(200).json({
            token: token
        });
    });
};
