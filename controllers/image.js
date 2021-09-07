const clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '1c49d84c8cbb4745ba5ba626ebf71e65'
})

const handleApiCall = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input
    )
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(400).json('UNABLE TO FIND API')
    })
}

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('UNABLE TO COUNT ENTRIEES'));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}