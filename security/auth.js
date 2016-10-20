var jwt = require('jsonwebtoken');

exports.signIn = function(user) {
    return jwt.sign({
        email: user.email,
        senha: user.senha
    }, global.HASH_CODE, {expiresIn: 30});
}

exports.authorize = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-acess-token'];
    if (!token) {
        res.status(401).json({message: 'Acesso restrito'});
    } else {
        jwt.verify(token, global.HASH_CODE, function(error, decoded) {
            if (error) {
                res.status(401).json({message: 'Token Inválido'});
            } else {
                //aqui faço a validão se o token é menor que 30 minutos etc...
                next();
            }
        });
    }
}

//criar metodo para validar o token
