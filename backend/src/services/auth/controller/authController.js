const jwt = require('jsonwebtoken');
const userDB  = require('../../user/models/userModel');
//const bcrypt = require('bcrypt')
const CryptoJS = require('crypto-js');

module.exports={

    async logout(req, res) {
        return res.json({ auth: false, token: null });
    },

    async authenticate(req, res) {
       
        const [login, password] = [req.body.login, req.body.password];

        const user = userDB.findOne({ login })
        if((login == 'admin' && password == '1234') || (CryptoJS.MD5(password) == user.password)){
            const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '5d' });
            console.log(token)
            return res.json({
               // ...user.toJSON(),
                auth:true,
                token
            });
        }
    },

    verifyJWT(req, res, next){
        const token = req.headers['x-access-token'];       
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, process.env.SECRET || 'client_server_secret_id', function(err, decoded) {
          if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
          
          req.login = decoded.login;
          next();
        });
    }
}