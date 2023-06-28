const express = require('express');
const app = express()
const PORT = 3000;
const db = require('./config/database');
const router = require('./routes');
const cors = require('cors');
const axios = require('axios')
const Razorpay = require('razorpay')

module.exports.instance = new Razorpay({
    key_id: 'rzp_test_hX5smGrYASqN7G',
    key_secret: '50j2pWtfT2jL0wmJH0K2frXX'
})

app.use('/uploads', express.static('uploads'))
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', router)
app.get('/api/getkey', (req, res) => res.status(200).json({key: 'rzp_test_hX5smGrYASqN7G'}))

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})