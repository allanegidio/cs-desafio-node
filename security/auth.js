var jwt = require('jsonwebtoken');
var User = require('../models/user');

exports.signIn = function(user) {
    return jwt.sign({
        email: user.email,
        senha: user.senha
    }, global.HASH_CODE, {expiresIn: 1800} );//Token expira em 30 minutos
}

exports.authorize = function(req, res, next) {
    var token = req.headers['x-acess-token'];
    if (!token) {
        res.status(401).json({message: 'Acesso restrito'});
    } else {
        jwt.verify(token, global.HASH_CODE, function(error, decoded) {
            if (error) {
                res.status(401).json({error: error, message: 'Token Inválido'});
            } else {
                next();
            }
        });
    }
}
