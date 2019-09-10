const express = require('express');
const path = require('path');
const fs = require('fs');
const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser');
const plants = fs.readFileSync('plants.json', 'utf8');
const pots = fs.readFileSync('pots.json', 'utf8');
const favicon = require('serve-favicon');

const app = express();
const router = express.Router();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(favicon('favicon.ico'));

app.get('/', (req,res) => res.render('pages/index', {plants}));
app.get('/contacts', (req,res) => res.render('pages/contacts', {plants}));
app.get('/catalog-plants', (req,res) => res.render('pages/catalog-plants', {plants}));
app.get('/catalog-pots', (req,res) => res.render('pages/catalog-pots', {plants, pots}));
app.get('/about', (req,res) => res.render('pages/about', {plants}));
app.get('/cart', (req,res) => res.render('pages/cart', {plants}));

app.post('/send-email', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        secure: false,
        auth: {
            user: '70dc034e72036a',
            pass: '27ce9196a7039a'
        }
    });
    let mailOptions = {
        from: 'test@test.ru',
        to: 'kosyanenko89@mail.ru',
        subject: 'test',
        text: 'Имя отправителя: ' + req.body.name + ' , E-mail: ' + req.body.email + ' , Телефон: ' + req.body.phone + ' , Сообщение:' + req.body.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send(error);
            return console.log(error);
        } else {
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.send(info.response);
        }
    });
});

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/script'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/fonts'));
app.use(express.static(__dirname + '/node_modules'));

app.use('/', router);
app.listen(process.env.port || 5000);

console.log('Running at Port 5000');