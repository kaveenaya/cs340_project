/*
    SETUP for a simple web app
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
// app.js - SETUP section

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

PORT        = 4161;                 // Set a port number at the top so it's easy to change in the future


// app.js

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
// Database
var db = require('./database/db-connector')
/*
    ROUTES
*/

// Define a route to handle the PUT request for updating a person's homeworld
app.put('/put-instrument-ajax', function(req,res,next){
    let data = req.body;

    let id = parseInt(data.id);
    let year = parseInt(data.year);
    let price = parseInt(data.price);

    let queryUpdateWorld = `UPDATE bsg_people SET homeworld = ? WHERE bsg_people.id = ?`;
    let selectWorld = `SELECT * FROM bsg_planets WHERE id = ?`;

    // Run the 1st query
    db.pool.query(queryUpdateWorld, [homeworld, person], function(error, rows, fields){
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // If there was no error, we run our second query and return that data so we can use it to update the people's table on the front-end
            // Run the second query
            db.pool.query(selectWorld, [homeworld], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    });
});

// Remaining routes...
app.get('/shopping_cart', function (req, res) {

    res.render('shopping_cart');                  
})
                                                       // received back from the query

app.get('/songs', function (req, res) {

    res.render('songs');                  
})

app.get('/sales', function (req, res) {

    res.render('sales');                  
})

app.get('/employees', function (req, res) {

    res.render('employees');                  
})


app.get('/customers', function (req, res) {

    res.render('customers');                  
})

// app.js

app.get('/', function(req, res) {
    res.render('home'); // Note the call to render() and not send(). Using render() ensures the templating engine will process this file, before sending the finished HTML to the client.
});

// Define a route to handle the GET request for the '/instruments' endpoint
app.get('/instruments', function(req, res) {
    res.render('instruments'); 
});


app.post('/add-instrument-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let id = parseInt(data['input-id']);
    if (isNaN(id)) {
        id = 'NULL'
    }

    let year = parseInt(data['input-year']);
    if (isNaN(year)) {
        year = 'NULL'
    }

    let price = parseInt(data['input-price']);
    if (isNaN(price)) {
        price = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Instruments (instrumentID, instrumentName, instrumentColor, instrumentMaterial, instrumentSize, instrumentYear, instrumentPrice) VALUES ('${id}', '${data['input-name']}', '${data['input-color']}', '${data['input-material']}', '${data['input-size']}', '${year}', '${price}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/');
        }
    })
});

/*
    LISTENER
*/
app.listen(PORT, function() {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

///delete function 
app.delete('/delete-instrument-ajax', function(req, res, next) {
    let data = req.body;
    let instrumentID = parseInt(data.id);
    let deleteBsg_Cert_Instruments = `DELETE FROM Instruments WHERE instrumentID = ?`;
    let deleteBsg_Instruments = `DELETE FROM Instruments WHERE id = ?`;

    // Run the 1st query
    db.pool.query(deleteBsg_Cert_Instruments, [instrumentID], function(error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // Run the second query
            db.pool.query(deleteBsg_Instruments, [instrumentID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.sendStatus(204);
                }
            });
        }
    });
});