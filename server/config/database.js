const mongoose = require('mongoose');

const conn_url = 'mongodb+srv://sanchit:sanchit@cluster0.oon5na6.mongodb.net/?retryWrites=true&w=majority'

const db = mongoose.connect(
    conn_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log('Mongo DB Connected Successfully'))
.catch((err) => {console.log(err)})

module.exports = db;



