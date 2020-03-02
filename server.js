'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { stock, customers } = require('./data/promo')

const PORT = process.env.PORT || 8000;
let theTodoList = [];

express()
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
	.use(morgan('tiny'))
	.use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))
    .set('view engine', 'ejs')

    // endpoints
    .get('/todos', (req, res) => {
        res.render('pages/homepage', {
            theTodoList
        });
    })
    .post('/data', (req, res) => {
        const { input } = req.body;
        console.log(req.body);
        theTodoList.push(input);
        res.redirect('/todos');
        console.log(theTodoList);
    })
//exercise 2
    .post('/order', (req, res) => {
        console.log('req.body: ', req.body);
        let data = req.body;

        let customer = {first: data.givenName, sur: data.surname}
        let item = data.order;
        let shirtSize = data.size;

        console.log(data.order)
        res.send({status: 'success')

        // customers.forEach(person => {
        //     if (person.givenName == customer.first && person.surname == customer.sur) {
        //         res.send({status: 'error', error: '550'});
        //     }
        // });
        
        // if (stock[item] == 0 || stock.shirt[shirtSize] == 0) {
        //     res.send({status: 'error', error: '450'});
        // }
        
        // else if (data.country !== 'Canada') {
        //     res.send({status: 'error', error: '650'});
        // }

        // else if (data.order == undefined) {
        //     res.send({status: 'error', error: '000'});
        // }

        // else {
        //     res.send({status: 'success', success: 'Order Recieved'})
        // }
    })

    .get('', (req, res) => {
        res.render('pages/order-confirmation');
    })

    .get('*', (req, res) => res.send('Dang. 404.'))
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));