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

    let instrumentID = parseInt(data.instrumentID);

    let query = `UPDATE Instruments SET instrumentName = ?, instrumentColor = ?, instrumentMaterial = ?, instrumentSize = ?, instrumentYear = ?, instrumentPrice = ? WHERE instrumentID = ?;`;

    db.pool.query(query, [data.instrumentName, data.instrumentColor, data.instrumentMaterial, data.instrumentSize, data.instrumentYear, data.instrumentPrice, instrumentID], function(error, results) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send(results);
        }
    });
});

// Remaining routes...
app.get('/shopping_cart', function (req, res) {
    let query1 = "SELECT * FROM ShoppingCart;"; // Define our query
    let query2 = "SELECT * FROM ShoppingCart;"; // Define our query


    db.pool.query(query1, function(error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error fetching shopping cart:", error);
            res.status(500).send("Internal Server Error"); // Send internal server error status and message
        } else {
            // Render the 'instruments.hbs' file and send the data to the template
            let mainTable = rows;

            db.pool.query(query2, (error, rows, fields) => {
            
                // Save the planets
                let shoppingCartIDS = rows;
                return res.render('shopping_cart', {data: mainTable, shoppingCartIDS: shoppingCartIDS});
            })
        }
    });
})
                                                       // received back from the query

app.get('/songs', function (req, res) {
    let query1 = "SELECT * FROM Songs;"; // Define our query
    let query2 = "SELECT * FROM Songs;"; // Define our query


    db.pool.query(query1, function(error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error fetching songs:", error);
            res.status(500).send("Internal Server Error"); // Send internal server error status and message
        } else {
            // Render the 'instruments.hbs' file and send the data to the template
            let mainTable = rows;

            db.pool.query(query2, (error, rows, fields) => {
            
                // Save the planets
                let songIDS = rows;
                return res.render('songs', {data: mainTable, songIDS: songIDS});
            })
        }
    });
})

app.get('/sales', function (req, res) {
    let query1 = "SELECT * FROM Sales;"; // Define our query
    let query2 = "SELECT * FROM Sales;"; // Define our query


    db.pool.query(query1, function(error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error fetching sales:", error);
            res.status(500).send("Internal Server Error"); // Send internal server error status and message
        } else {
            // Render the 'instruments.hbs' file and send the data to the template
            let mainTable = rows;

            db.pool.query(query2, (error, rows, fields) => {
            
                // Save the planets
                let saleIDS = rows;
                return res.render('sales', {data: mainTable, saleIDS: saleIDS});
            })
        }
    });
})

app.get('/employees', function (req, res) {
    let query1 = "SELECT * FROM Employees;"; // Define our query
    let query2 = "SELECT * FROM Employees;"; // Define our query


    db.pool.query(query1, function(error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error fetching employees:", error);
            res.status(500).send("Internal Server Error"); // Send internal server error status and message
        } else {
            // Render the 'instruments.hbs' file and send the data to the template
            let mainTable = rows;

            db.pool.query(query2, (error, rows, fields) => {
            
                // Save the planets
                let employeeIDS = rows;
                return res.render('employees', {data: mainTable, employeeIDS: employeeIDS});
            })
        }
    });
})


app.get('/customers', function (req, res) {
    let query1 = "SELECT * FROM Customers;"; // Define our query
    let query2 = "SELECT * FROM Customers;"; // Define our query


    db.pool.query(query1, function(error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error fetching customers:", error);
            res.status(500).send("Internal Server Error"); // Send internal server error status and message
        } else {
            // Render the 'instruments.hbs' file and send the data to the template
            let mainTable = rows;

            db.pool.query(query2, (error, rows, fields) => {
            
                // Save the planets
                let customerIDS = rows;
                return res.render('customers', {data: mainTable, customerIDS: customerIDS});
            })
        }
    });
})

// app.js

app.get('/', function(req, res) {
    res.render('home'); // Note the call to render() and not send(). Using render() ensures the templating engine will process this file, before sending the finished HTML to the client.
});

// Define a route to handle the GET request for the '/instruments' endpoint
app.get('/instruments', function(req, res) {
    let query1 = "SELECT * FROM Instruments;"; // Define our query
    let query2 = "SELECT * FROM Instruments;"; // Define our query


    db.pool.query(query1, function(error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error fetching instruments:", error);
            res.status(500).send("Internal Server Error"); // Send internal server error status and message
        } else {
            // Render the 'instruments.hbs' file and send the data to the template
            let mainTable = rows;

            db.pool.query(query2, (error, rows, fields) => {
            
                // Save the planets
                let instrumentIDS = rows;
                return res.render('instruments', {data: mainTable, instrumentIDS: instrumentIDS});
            })
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

///delete function for instrumnet
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


///delete function songs
app.delete('/delete-song-ajax', function(req, res, next) {
    let data = req.body;
    let songID = parseInt(data.id);
    let deleteBsg_Cert_Songs = `DELETE FROM Songs WHERE songID = '${songID}'` ;
    let deleteBsg_Songs = `DELETE FROM Songs WHERE songID = '${songID}'`;

    // Run the 1st query
    db.pool.query(deleteBsg_Cert_Songs, [songID], function(error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // Run the second query
            db.pool.query(deleteBsg_Songs, [songID], function(error, rows, fields) {
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


//delete for Sales
app.delete('/delete-sales-ajax/', function(req,res,next){
    let data = req.body;
    let salesID = parseInt(data.id);
    let deleteBsg_Cert_Sales = `DELETE FROM bsg_cert_sales WHERE pid = ?`;
    let deleteBsg_Sales = `DELETE FROM bsg_sales WHERE id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteBsg_Cert_Sales, [salesID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteBsg_Sales, [salesID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  })
              }
  })});



  // delete customeres 
  app.delete('/delete-customers-ajax', function(req, res, next) {
    let data = req.body;
    let customersID = parseInt(data.id);
    let deleteBsg_Cert_Customers = `DELETE FROM Customers WHERE customerID = ?`;
    let deleteBsg_Customers = `DELETE FROM Customers WHERE customerID = ?`;

    // Run the 1st query
    db.pool.query(deleteBsg_Cert_Customers, [customersID], function(error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // Run the second query
            db.pool.query(deleteBsg_Customers, [customersID], function(error, rows, fields) {
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



  // delete shopping cart 
  app.delete('/delete-shoppingcart-ajax', function(req, res, next) {
    let data = req.body;
    let shoppingCartID = parseInt(data.id);
    let deleteBsg_Cert_shoppingcart = `DELETE FROM Customers WHERE shoppingCartID = ?`;
    let deleteBsg_shoppingcart = `DELETE FROM Customers WHERE shoppingCartID = ?`;

    // Run the 1st query
    db.pool.query(deleteBsg_Cert_shoppingcart, [shoppingCartID], function(error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // Run the second query
            db.pool.query(deleteBsg_shoppingcart, [shoppingCartID], function(error, rows, fields) {
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