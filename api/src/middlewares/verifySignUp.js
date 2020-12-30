const db = require('../models');
const { Op } = require("sequelize");
const hash = require('../security/hashPassword');
const User = db.user;

validateCPF = (cpf) => {
    // https://www.geradorcpf.com/javascript-validar-cpf.htm
    if(cpf == '') return false;	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return false;		
	// Valida 1o digito	
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
			return false;		
	// Valida 2o digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return false;		
	return true;
}

exports.verifyDuplicateUser = async (req, res, next) => {
    if (!req.body.password) {
        return res.status(400).send({ success: false, error: { code: 400, message: 'Missing password field.' } })
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(req.body.password)) {
        return res.status(400).send({ success: false, error: { code: 400, message: 'Invalid password.' } })
    }

    if (!validateCPF(req.body.cpf)) return res.status(400).send({ success: false, error: { code: 400, message: 'Invalid CPF.' } })
    if (!req.body.email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) return res.status(400).send({ success: false, error: { code: 400, message: 'Invalid email syntax.' } })
    
    await User.findOne({ where: { [Op.or]: [{ email: req.body.email }, { mobile: req.body.mobile }, { cpf: req.body.cpf }] } }).then(user => {
        if (user) return res.status(400).send({ success: false, error: { code: 400, message: 'Credentials is already in use.' } })

        req.body.password = hash.generateHash(req.body.password)
        next();
    })
}