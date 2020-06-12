const express = require('express');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const enforce = require('express-sslify');

const app = express();

app.use( cors() );

app.use( bodyParser.json() ); // convert incoming api requests get their body converted to json
app.use( bodyParser.urlencoded({ extended: true }) ); // url encoded makes sure the url strings coming in and out do not include illegal characteres
app.use( enforce.HTTPS({ trustProtoHeader: true }) ); // for hosters using reverse proxies

// [ SERVER ]
const port = process.env.PORT || 5000;
app.listen( port, error => {
    if( error ) throw error;
    console.log( "Server up and running on port " + port );
});


// [ SERVICE WORKER ]
// MIGHT NEED TO REVISE FILE NAMES AND PATHS
// serviceWorker.js? ( in /src )
app.get('/service-worker.js', ( req, res ) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js') );
} );


// [ PRODUCTION / DEVELOPMENT CHECK ]
if( process.env.NODE_ENV !== 'production' ) require( 'dotenv' ).config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

if( process.env.NODE_ENV === 'production' ) { // if we're in production (build)
    app.use( enforce.HTTPS({ trustProtoHeader: true }) ); // enforces https while outside of production/development mode
    app.use( express.static( path.join(__dirname, 'client/build' ) ) ); // use express.static middle ware function allows us to serve a certain file inside this url path, //path comes from 'path'

    app.get('*', function( req, res ) { // get request is being made, we send it our static files
        res.sendFile( path.join(__dirname, 'client/build', 'index.html') ); // base index.html file will get produced when we run build
    });
};


// [ STRIPE PAYMENT ] // stripe handles currency in pennies
app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create( body, (stripeErr, stripeRes) => {
        if( stripeErr ) res.status(500).send({ error: stripeErr });
        else res.status(200).send({ success: stripeRes });
    } );
});