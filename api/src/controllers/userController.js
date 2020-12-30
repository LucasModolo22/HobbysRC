const db = require('../models')
const User = db.user;

exports.signup = (req, res) => {
    var now = new Date();
    
    User.create({
        id: req.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        email: req.body.email,
        password: req.body.password,
        cpf: req.body.cpf,
        admin: 0,
        registeredAt: now.toISOString().slice(0, 19).replace('T', ' ')
    }).then(() => {
        if (req.body.keepLogin) res.setHeader('Set-Cookie', `token=${req.token};expires=${Date.now() + 60 * 60 * 24 * 1000};path=/;HttpOnly;SameSite=None;Secure`)
        else res.setHeader('Set-Cookie', `token=${req.token};expires=${Date.now() + 60 * 60 * 24 * 30 * 1000};path=/;HttpOnly;SameSite=None;Secure`)
        res.status(201).send({ success: true, response: {} })
    }).catch(() => {
        res.status(500).send({ success: false, error: { code: 500, message: 'Internal Server Error.' } })
    })
}