//Citation for file app.js
// Date: 02/23/2024
// The ciation scope was for the whole module
// The code was adapted from the github starter code 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main


// Express
 // We are using the express library for the web server
var express = require('express');  
// We need to instantiate an express object to interact with the server in our code
var app = express(); 
// app.js - SETUP section
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
 // Set a port number at the top so it's easy to change in the future
PORT = 4161;                


// app.js
const { engine } = require('express-handlebars');
 // Import express-handlebars
var exphbs = require('express-handlebars');  
// Create an instance of the handlebars engine to process templates  
app.engine('.hbs', engine({extname: ".hbs"}));  
// Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.set('view engine', '.hbs');                 
// Database
var db = require('./database/db-connector')

/**
 * This function handles the HTTP PUT request to update instrument information asynchronously via AJAX.
 * param {object} req - The request object containing the data to be updated.
 * param {object} res - The response object used to send the updated instrument information or error messages.
 */
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


/**
 * This function handles the HTTP PUT request to update song information asynchronously via AJAX.
 * param {object} req - The request object containing the data to be updated.
 * param {object} res - The response object used to send the updated song information or error messages.
 */
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

/**
 * This function handles theHTTP PUT request to update sale information asynchronously via AJAX.
 * param {object} req - The request object containing the data to be updated.
 * param {object} res - The response object used to send the updated sale information or error messages.
 */
// Route to handle updating a sale
app.put('/update-sale-ajax', function(req, res) {
    let data = req.body;

    let salesID = parseInt(data.salesID);
    let customerID = data.customerID;
    let employeeID = data.employeeID; 
    let saleAmount = data.saleAmount;
    let saleDate = data.saleDate;
    let saleTime = data.saleTime;

    let query = `UPDATE Sales SET customerID = ?, employeeID = ?, saleAmount = ?, saleDate = ?, saleTime = ? WHERE Sales.salesID = ?;`;
    let showUpdate = `SELECT * FROM Sales WHERE salesID = ?;`;

    db.pool.query(query, [customerID, employeeID, saleAmount, saleDate, saleTime, salesID], function(error, results) {
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

/**
 * This function handles the HTTP PUT request to update customer information asynchronously via AJAX.
 * param {object} req - The request object containing the data to be updated.
 * param {object} res - The response object used to send the updated customer information or error messages.
 */
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

/**
 * This function handles the HTTP PUT request to update employee information asynchronously via AJAX.
 * param {object} req - The request object containing the data to be updated.
 * param {object} res - The response object used to send the updated employee information or error messages.
 */
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

/**
 * This function handles the HTTP PUT request to update shopping cart information asynchronously via AJAX.
 * param {object} req - The request object containing the data to be updated.
 * param {object} res - The response object used to send the updated shopping cart information or error messages.
 */
//route to handle updating a shopping cart
app.put('/update-shopping-cart-ajax', function(req, res) {
    let data = req.body;
    console.log("Request Data:", data);
    let shoppingCartID = parseInt(data.shoppingCartID);
    let salesID = parseInt(data.salesID);
    let songID = data.songID === 'NULL' || data.songID === null ? null : parseInt(data.songID);
    let instrumentID = data.instrumentID === 'NULL' || data.instrumentID === null ? null : parseInt(data.instrumentID);
    let songQuantity = data.songQuantity;
    let instrumentQuantity = data.instrumentQuantity;
    let itemTotalPrice = data.itemTotalPrice;

    let updateQuery = `UPDATE ShoppingCart SET salesID = ?, songID = ?, instrumentID = ?, songQuantity = ?, instrumentQuantity = ?, itemTotalPrice = ? WHERE ShoppingCart.shoppingCartID = ?`;
    let selectQuery = `SELECT * FROM ShoppingCart WHERE shoppingCartID = ?`;

    db.pool.query(updateQuery, [salesID, songID, instrumentID, songQuantity, instrumentQuantity, itemTotalPrice, shoppingCartID], function(error, updateResults) {
        if (error) {
            console.error('Error in the update query', error);
            res.sendStatus(500); // Internal Server Error
        } else {
            // After update, fetch the updated shopping cart data
            db.pool.query(selectQuery, [shoppingCartID], function(error, selectResults) {
                if (error) {
                    console.error('Error in the select query', error);
                    res.sendStatus(500); // Internal Server Error
                } else {
                    // Send the updated shopping cart data back
                    res.json(selectResults);
                }
            });
        }
    });
});




/**
 * This function handles the HTTP GET request to fetch data for rendering the shopping cart page.
 * param {object} req - The request object.
 * param {object} res - The response object used to render the shopping cart page or send error messages.
 */
// Remaining routes...
app.get('/shopping_cart', function (req, res) {
    let query1 = "SELECT * FROM ShoppingCart;"; // Define our query
    let query2 = "SELECT * FROM Sales;"; // Define our query
    let query3 = "SELECT * FROM Songs;"; // Define our query
    let query4 = "SELECT * FROM Instruments;"; // Define our query
    let query5 = "SELECT * FROM ShoppingCart;"; // Define our query


    db.pool.query(query1, function(error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error fetching shopping cart:", error);
            res.status(500).send("Internal Server Error"); // Send internal server error status and message
        } else {
            // Render the 'instruments.hbs' file and send the data to the template
            let mainTable = rows;

            db.pool.query(query2, (error, rows, fields) => {
            
                let saleIDS = rows;

                db.pool.query(query3, (error, rows, fields) => {
                    let songIDS = rows;

                    db.pool.query(query4, (error, rows, fields) => {
                        let instrumentIDS = rows;

                        db.pool.query(query5, (error, rows, fields) => {
                            let shoppingCartIDS = rows;
                            return res.render('shopping_cart', {data: mainTable, saleIDS: saleIDS, songIDS: songIDS, instrumentIDS: instrumentIDS, shoppingCartIDS: shoppingCartIDS});
                        })
                    })
                })
            });
        }
    });
})


/**
 * This function handles the HTTP GET request to fetch data for rendering the songs page.
 * param {object} req - The request object.
 * param {object} res - The response object used to render the songs page or send error messages.
 */
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

/**
 * This function handles the HTTP GET request to fetch data for rendering the sales page.
 * param {object} req - The request object.
 * param {object} res - The response object used to render the sales page or send error messages.
 */
app.get('/sales', function (req, res) {
    let query1 = "SELECT * FROM Sales;"; // Define our query
    let query2 = "SELECT * FROM Customers;"; // Define our query
    let query3 = "SELECT * FROM Employees;"; // Define our query


    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.error("Error fetching sales:", error);
            res.status(500).send("Internal Server Error");
        } else {
            let salesData = rows;
            // Assuming query2 gets customerIDs and query3 gets employeeIDs
            db.pool.query(query2, (error, customerRows, fields) => {
                // handle error...
                db.pool.query(query3, (error, employeeRows, fields) => {
                    // handle error...
                    salesData.forEach(sale => {
                        let saleDate = new Date(sale.saleDate);
                        let formattedDate = saleDate.toISOString().split('T')[0]; // Converts to YYYY-MM-DD
                        sale.saleDate = formattedDate;
                      });
                    res.render('sales', {
                        data: salesData,
                        customerIDS: customerRows,
                        employeeIDS: employeeRows,
                        saleIDS: salesData // This is the new addition
                    });
                });
            });
        }
    });
})

/**
 * This function handles the HTTP GET request to fetch data for rendering the employees page.
 * param {object} req - The request object.
 * param {object} res - The response object used to render the employees page or send error messages.
 */
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

/**
 * This function handles the HTTP GET request to fetch data for rendering the customers page.
 * param {object} req - The request object.
 * param {object} res - The response object used to render the customers page or send error messages.
 */
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

/**
 * This function handles the HTTP GET request to render the home page.
 * param {object} req - The request object.
 * param {object} res - The response object used to render the home page.
 */
app.get('/', function(req, res) {
    res.render('home', { layout: 'main' }); 
    // Note the call to render() and not send(). Using render() ensures the templating engine will process this file, before sending the finished HTML to the client.
});

/**
 * This function handles the HTTP GET request to fetch data for rendering the instruments page.
 * param {object} req - The request object.
 * param {object} res - The response object used to render the instruments page or send error messages.
 */
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





/**
 * This function handles the HTTP POST request to add instrument data submitted via a form.
 * param {object} req - The request object containing the form data.
 * param {object} res - The response object used to send HTTP responses.
 */
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


/**
 * This function handles the HTTP POST request to add customer data submitted via a form.
 * param {object} req - The request object containing the form data.
 * param {object} res - The response object used to send HTTP responses.
 */
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

/**
 * This function handles the HTTP POST request to add sale data submitted via a form.
 * param {object} req - The request object containing the form data.
 * param {object} res - The response object used to send HTTP responses.
 */
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

/**
 * This function handles the HTTP POST request to add employee data submitted via a form.
 * param {object} req - The request object containing the form data.
 * param {object} res - The response object used to send HTTP responses.
 */
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

/**
 * This function handles the HTTP POST request to add song data submitted via a form.
 * param {object} req - The request object containing the form data.
 * param {object} res - The response object used to send HTTP responses.
 */
app.post('/add-song-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Songs (songName, songArtist, songGenre, songLength, songYear, songPrice) VALUES ('${data['input-name']}', '${data['input-artist']}', '${data['input-genre']}', '${data['input-length']}', '${data['input-year']}', '${data['input-price']}')`;
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

/**
 * This function handles the HTTP POST request to add shopping cart data submitted via a form.
 * param {object} req - The request object containing the form data.
 * param {object} res - The response object used to send HTTP responses.
 */
app.post('/add-shoppingCart-form', function(req, res){
    let data = req.body;

    let songID = (data['input-songid'] === 'NULL') ? null : parseInt(data['input-songid']);
    let instrumentID = (data['input-instrumentid'] === 'NULL') ? null : parseInt(data['input-instrumentid']);
    
    let songQuantity = data['input-squantity'];
    let instrumentQuantity = data['input-iquantity'];
    let totalPrice = data['input-totalprice'];

    let query1 = `INSERT INTO ShoppingCart (salesID, songID, instrumentID, songQuantity, instrumentQuantity, itemTotalPrice) 
                  VALUES (?, ?, ?, ?, ?, ?)`;

    db.pool.query(query1, [data['input-saleid'], songID, instrumentID, songQuantity, instrumentQuantity, totalPrice], function(error, results){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/shopping_cart');
        }
    });
});


/*
    LISTENER
*/
app.listen(PORT, function() {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

/**
 * This function handles the HTTP DELETE request to delete an instrument.
 * param {object} req - The request object containing the ID of the instrument to delete.
 * param {object} res - The response object used to send HTTP responses.
 * param {function} next 
 */
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

/**
 * This function handles the HTTP DELETE request to delete a song.
 * param {object} req - The request object containing the ID of the song to delete.
 * param {object} res - The response object used to send HTTP responses.
 * param {function} next 
 */
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

/**
 * This function handles the HTTP DELETE request to delete a sale.
 * param {object} req - The request object containing the ID of the sale to delete.
 * param {object} res - The response object used to send HTTP responses.
 * param {function} next 
 */
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

/**
 * This function handles the HTTP DELETE request to delete a customer.
 * param {object} req - The request object containing the ID of the customer to delete.
 * param {object} res - The response object used to send HTTP responses.
 * param {function} next 
 */
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


/**
 * This function handles the HTTP DELETE request to delete a shopping cart.
 * param {object} req - The request object containing the ID of the shopping cart to delete.
 * param {object} res - The response object used to send HTTP responses.
 * param {function} next 
 */
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

/**
 * This function handles the HTTP DELETE request to delete an employee.
 * param {object} req - The request object containing the ID of the employee to delete.
 * param {object} res - The response object used to send HTTP responses.
 * param {function} next 
 */
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
