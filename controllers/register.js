const handleRegister = (req, res, bcrypt, db) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password){
        return res.status(400).json('INVALID FORM SUBMISSION! FILL ALL THE INFORMATION!')
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            }).then(user => {
                res.json(user[0]);
            })
        }).then(trx.commit )
        .then(trx.rollback)
    }).catch( err => res.status(400).json('UNABLE TO REGISTER! TRY AGAIN'))
}

module.exports = {
    handleRegister: handleRegister
}