const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.PRIVATE_KEY, {
            expiresIn: process.env.TOKEN_TIME
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('The token can not be generated.');
            }
            resolve(token);
        });
    })
}

module.exports = {
    generateJWT
}