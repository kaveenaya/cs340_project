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
app.put('/update-instrument-ajax', function(req, res) {
    let data = req.body;

    let instrumentID = parseInt(data.instrumentID);
    let instrumentName = data.instrumentName;
    let instrumentColor = data.instrumentColor; 
    let instrumentMaterial = data.instrumentMaterial;
    let instrumentSize = data.instrumentSize;
    let instrumentYear = data.instrumentYear;
    let instrumentPrice = data.instrumentPrice;

    let query = `UPDATE Instruments SET instrumentName = ?, instrumentColor = ?, instrumentMaterial = ?, instrumentSize = ?, instrumentYear = ?, instrumentPrice = ? WHERE Instruments.instrumentID = ?;`;
    let showUpdate = `SELECT * FROM Instruments WHERE instrumentID = ?;`;

    db.pool.query(query, [instrumentName, instrumentColor, instrumentMaterial, instrumentSize, instrumentYear, instrumentPrice, instrumentID], function(error, results) {
        if (error) {
            console.log(error);
            res.sendStatus(500).send("Internal Server Error");
        } else {
            db.pool.query(showUpdate, [instrumentID], function(error, results) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500).send("Internal Server Error");
                } else {
                    res.send(results);
                }
            })
        }
    });
});

// Route to handle updating a song
app.put('/update-song-ajax', function(req, res) {
    let data = req.body;

    let songID = parseInt(data.songID);
    let songName = data.songName;
    let songArtist = data.songArtist; 
    let songGenre = data.songGenre;
    let songLength = data.songLength;
    let songYear = data.songYear;

    let query = `UPDATE Songs SET songName = ?, songArtist = ?, songGenre = ?, songLength = ?, songYear = ? WHERE Songs.songID = ?;`;
    let showUpdate = `SELECT * FROM Songs WHERE songID = ?;`;

    db.pool.query(query, [songName, songArtist, songGenre, songLength, songYear, songID], function(error, results) {
        if (error) {
            console.log(error);
            res.sendStatus(500).send("Internal Server Error");
        } else {
            db.pool.query(showUpdate, [songID], function(error, results) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500).send("Internal Server Error");
                } else {
                    res.send(results);
                }
            })
        }
    });
});

// Route to handle updating a sale
app.put('/update-sale-ajax', function(req, res) {
    let data = req.body;

    let salesID = parseInt(data.salesID);
    let customerID = data.customerID;
    let employeeID = data.employeeID; 
    let saleAmount = data.saleAmount;
    let saleDate = data.saleDate;

    let query = `UPDATE Sales SET customerID = ?, employeeID = ?, saleAmount = ?, saleDate = ? WHERE Sales.salesID = ?;`;
    let showUpdate = `SELECT * FROM Sales WHERE salesID = ?;`;

    db.pool.query(query, [customerID, employeeID, saleAmount, saleDate, salesID], function(error, results) {
        if (error) {
            console.log(error);
            res.sendStatus(500).send("Internal Server Error");
        } else {
            db.pool.query(showUpdate, [salesID], function(error, results) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500).send("Internal Server Error");
                } else {
                    res.send(results);
                }
            })
        }
    });
});

// Route to handle updating a customer
app.put('/update-customer-ajax', function(req, res) {
    let data = req.body;
    console.log("Request Data:", data);

    let customerID = parseInt(data.customerID);
    let customerFName = data.customerFname;
    let customerLName = data.customerLname;
    let customerPhone = data.customerPhone; 
    let customerEmail = data.customerEmail;

    let query = `UPDATE Customers SET customerFname = ?, customerLname = ?, customerPhone = ?, customerEmail = ? WHERE Customers.customerID = ?;`;
    let showUpdate = `SELECT * FROM Customers WHERE customerID = ?;`;

    db.pool.query(query, [customerFName, customerLName, customerPhone, customerEmail, customerID], function(error, results) {
        console.log("Response Data:", results); // Debugging: Log the data to be sent back
        if (error) {
            console.log(error);
            res.sendStatus(500).send("Internal Server Error");
        } else {
            db.pool.query(showUpdate, [customerID], function(error, results) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500).send("Internal Server Error");
                } else {
                    res.send(results);
                }
            })
        }
    });
});

// Route to handle updating a shopping cart
app.put('/update-shoppingCart-ajax', function(req, res) {
    let data = req.body;

    let shoppingCartID = parseInt(data.shoppingCartID);
    let salesID = data.salesID;
    let itemType = data.itemType; 
    let itemID = data.itemID;
    let itemQuantity = data.itemQuantity;
    let itemPrice = data.itemPrice;
    let itemTotalPrice = data.itemTotalPrice;
    
    let query = `UPDATE ShoppingCart SET salesID = ?, itemType = ?, itemID = ?, itemQuantity = ?, itemPrice = ?, itemTotalPrice = ? WHERE ShoppingCart.shoppingCartID = ?;`;
    let showUpdate = `SELECT * FROM ShoppingCart WHERE shoppingCartID = ?;`;

    db.pool.query(query, [salesID, itemType, itemID, itemQuantity, itemPrice, itemTotalPrice, shoppingCartID], function(error, results) {
        if (error) {
            console.log(error);
            res.sendStatus(500).send("Internal Server Error");
        } else {
            db.pool.query(showUpdate, [shoppingCartID], function(error, results) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500).send("Internal Server Error");
                } else {
                    res.send(results);
                }
            })
        }
    });
});

// Route to handle updating an employee
app.put('/update-employee-ajax', function(req, res) {
    let data = req.body;

    let employeeID = parseInt(data.employeeID);
    let employeeFName = data.employeeFName;
    let employeeLName = data.employeeLName;
    let employeePhone = data.employeePhone;
    let employeeEmail = data.employeeEmail;

    let query = `UPDATE Employees SET employeeFname = ?, employeeLname = ?, employeePhone = ?, employeeEmail = ? WHERE Employees.employeeID = ?;`;
    let showUpdate = `SELECT * FROM Employees WHERE employeeID = ?;`;

    db.pool.query(query, [employeeFName, employeeLName, employeePhone, employeeEmail, employeeID], function(error, results) {
        if (error) {
            console.log(error);
            res.sendStatus(500).send("Internal Server Error");
        } else {
            db.pool.query(showUpdate, [employeeID], function(error, results) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500).send("Internal Server Error");
                } else {
                    res.send(results);
                }
            })
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
    let query2 = "SELECT * FROM Customers;"; // Define our query
    let query3 = "SELECT * FROM Employees;"; // Define our query


    db.pool.query(query1, function(error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error fetching sales:", error);
            res.status(500).send("Internal Server Error"); // Send internal server error status and message
        } else {
            // Render the 'instruments.hbs' file and send the data to the template
            let mainTable = rows;

            db.pool.query(query2, (error, rows, fields) => {
            
                // Save the planets
                let customerIDS = rows; 

                db.pool.query(query3, (error, rows, fields) => {
                    let employeeIDS = rows;

                    return res.render('sales', {data: mainTable, customerIDS: customerIDS, employeeIDS: employeeIDS});
                })
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


    // Create the query and run it on the database
    query1 = `INSERT INTO Instruments (instrumentName, instrumentColor, instrumentMaterial, instrumentSize, instrumentYear, instrumentPrice) VALUES ('${data['input-name']}', '${data['input-color']}', '${data['input-material']}', '${data['input-size']}', '${data['input-year']}', '${data['input-price']}')`;
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

app.post('/add-customer-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (customerFname, customerLname, customerPhone, customerEmail) VALUES ('${data['input-fname']}', '${data['input-lname']}', '${data['input-phone']}', '${data['input-email']}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/customers');
        }
    })
});

app.post('/add-sale-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Sales (customerID, employeeID, saleAmount, saleDate, saleTime) VALUES ('${data['input-customerid']}', '${data['input-employeeid']}', '${data['input-amount']}', '${data['input-date']}', '${data['input-time']}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/sales');
        }
    })
});

app.post('/add-employee-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (employeeFname, employeeLname, employeePhone, employeeEmail) VALUES ('${data['input-fname']}', '${data['input-lname']}', '${data['input-phone']}', '${data['input-email']}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/employees');
        }
    })
});

app.post('/add-song-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let id = parseInt(data['input-id']);
    if (isNaN(id)) {
        id = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Songs (songID, songName, songArtist, songGenre, songLength, songYear) VALUES ('${id}', '${data['input-name']}', '${data['input-artist']}', '${data['input-genre']}', '${data['input-length']}', '${data['input-year']}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/songs');
        }
    })
});

app.post('/add-shoppingCart-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let id = parseInt(data['input-cartId']);
    if (isNaN(id)) {
        id = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO ShoppingCart (shoppingCartID, salesID, itemType, itemID, itemQuantity, itemPrice, itemTotalPrice) VALUES ('${id}', '${data['input-saleId']}', '${data['input-type']}', '${data['input-itemId']}', '${data['input-quantity']}', '${data['input-price']}', '${data['input-totalPrice']}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/shopping_cart');
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


//For sales
app.delete('/delete-sales-ajax/:salesID', function(req, res, next) {
    let salesID = parseInt(req.params.salesID);
    let deleteSalesQuery = `DELETE FROM Sales WHERE salesID = ?`;

    // Run the query
    db.pool.query(deleteSalesQuery, [salesID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400); // Bad request
        } else {
            res.sendStatus(204); // No Content
        }
    });
});




// For customers
  app.delete('/delete-customers-ajax', function(req, res, next) {
    let data = req.body;
    let customerID = parseInt(data.id);
    
    // Update Sales records with a placeholder customerID
    let updateSalesQuery = `UPDATE Sales SET customerID = NULL WHERE customerID = ?`;
    db.pool.query(updateSalesQuery, [customerID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400); // Bad request
        } else {
            // Once sales records are updated, delete the customer
            let deleteCustomerQuery = `DELETE FROM Customers WHERE customerID = ?`;
            db.pool.query(deleteCustomerQuery, [customerID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400); // Bad request
                } else {
                    res.sendStatus(204); // No Content
                }
            });
        }
    });
});



// For shoppingcart
app.delete('/delete-shoppingcart-ajax', function(req, res, next) {
    let data = req.body;
    let shoppingCartID = parseInt(data.id);
    let deleteShoppingCartQuery = `DELETE FROM ShoppingCart WHERE shoppingCartId = ?`;

    // Run the query
    db.pool.query(deleteShoppingCartQuery, [shoppingCartID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400); // Bad request
        } else {
            res.sendStatus(204); // No Content
        }
    });
});


// For Employees
app.delete('/delete-employee-ajax/', function(req, res, next) {
    let data = req.body;
    let employeeID = parseInt(data.id);
    let deleteEmployeeQuery = `DELETE FROM Employees WHERE employeeID = ?`;

    // Run the query
    db.pool.query(deleteEmployeeQuery, [employeeID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400); // Bad request
        } else {
            res.sendStatus(204); // No Content
        }
    });
});
