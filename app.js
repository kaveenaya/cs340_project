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
// Route to handle updating an instrument
app.put('/put-instrument-ajax', function(req, res) {
    let data = req.body;

    // Assuming data contains { instrumentID: '', instrumentName: '', instrumentColor: '', ... }
    let updateQuery = `UPDATE Instruments SET instrumentName = ?, instrumentColor = ?, instrumentMaterial = ?, instrumentSize = ?, instrumentYear = ?, instrumentPrice = ? WHERE instrumentID = ?;`;

    db.pool.query(updateQuery, [data.instrumentName, data.instrumentColor, data.instrumentMaterial, data.instrumentSize, data.instrumentYear, data.instrumentPrice, data.instrumentID], function(error, results) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
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
    let query1 = "SELECT * FROM Instruments;"; // Define our query

    db.pool.query(query1, function(error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error fetching instruments:", error);
            res.status(500).send("Internal Server Error"); // Send internal server error status and message
        } else {
            res.render('instruments', { data: rows }); // Render the 'instruments.hbs' file and send the data to the template
        }
    });
});


// Route to handle getting details for a specific instrument
app.get('/get-instrument-details/:id', function(req, res) {
    const instrumentID = req.params.id;
    const query = "SELECT * FROM Instruments WHERE instrumentID = ?;";

    db.pool.query(query, [instrumentID], function(error, rows, fields) {
        if (error) {
            console.error("Error fetching instrument details:", error);
            res.status(500).send("Internal Server Error");
        } else {
            res.json(rows[0]); // Send the details of the instrument back to the client
        }
    });
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
            res.redirect('/instruments');
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
    let deleteBsg_Instruments = `DELETE FROM Instruments WHERE instrumentID = ?`;

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
