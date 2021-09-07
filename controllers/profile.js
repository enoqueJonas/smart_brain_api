
  const handleProfile = (req, res, db) => {
    const {id} = req.params;
    db.select('*').from('users').where({
        id: id
    })
    .then(user => {
        if(user.length){
            res.json(user[0]);
        }else{
            res.status(400).json('USER NOT FOUND!')
        }
    })
    .catch(err => res.status(400).json('ERROR GETTINH THE USER!'))
}

module.exports = {
    handleProfile : handleProfile
}