const Reverso = require('reverso-api');
const reverso = new Reverso();

reverso.getContext(
    'meet me half way',
    'english',
    'russian',
    (err, response) => {
        if (err) throw new Error(err.message)

        console.log(response)
    }
)