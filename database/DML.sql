-- Customers

-- Get all customer information
SELECT * FROM Customers;

-- Add a customer
INSERT INTO Customers (customerFname, customerLname, customerPhone, customerEmail)
VALUES (:customerFname, :customerLname, :customerPhone, :customerEmail);

-- Update a customer's information
UPDATE Customers
SET customerFname = :customerFname,
    customerLname = :customerLname,
    customerPhone = :customerPhone,
    customerEmail = :customerEmail
WHERE customerID = :customerID;

-- Delete a customer
DELETE FROM  Customers WHERE customerID = :customerID;


-- Employees

-- Get all employees information
SELECT * FROM Employees;

-- Add a employee
INSERT INTO Employees (employeeFname, employeeLname, employeePhone, employeeEmail)
VALUES (:employeeFname, :employeeLname, :employeePhone, :employeeEmail);

-- Update a employee's information
UPDATE Employees
SET employeeFname = :employeeFname,
    employeeLname = :employeeLname,
    employeePhone = :employeePhone,
    employeeEmail = :employeeEmail
WHERE employeeID = :employeeID;

-- Remove a employee
DELETE FROM Employees
WHERE employeeID =  :employeeID;


-- Sales

-- Get all sales information
SELECT * FROM Sales;

-- Add a sale
INSERT INTO Sales (customer, employee, saleAmount, saleDate, saleTime)
VALUES (:customer, :employee, :saleAmount, :saleDate, :saleTime);

-- Update a sale's information
UPDATE Sales
SET customer = :customer,
    employee = :employee,
    saleAmount = :saleAmount,
    saleDate = :saleDate,
    saleTime = :saleTime
WHERE salesID = :saleID;

-- Remove a sale
DELETE FROM Sales
WHERE salesID = :salesID;

-- Join customer and employee tables to display their ids
SELECT Sales.salesID, Customers.customerID, Employees.employeeID, Sales.saleAmount, Sales.saleDate, Sales.saleTime
FROM Sales
INNER JOIN Customers ON Sales.customer = Customers.customerID
INNER JOIN Employees ON Sales.employee = Employees.employeeID;


-- Shopping Cart

-- Gett all shopping cart information
SELECT * FROM ShoppingCart;

-- Add a shopping cart
INSERT INTO ShoppingCart(sale, song, instrument, itemQuantity, itemTotalPrice)
VALUES (:sale, :song, :instrument, :itemQuantity, :itemTotalPrice);

-- Update a shopping cart's information
UPDATE ShoppingCart
SET sale = :sale,
    song = :song,
    instrument = :instrument,
    itemQuantity = :itemQuantity,
    itemTotalPrice = :itemTotalPrice
WHERE shoppingCartID = :shoppingCartID;

-- Remove a shopping cart
DELETE FROM ShoppingCart
WHERE shoppingCartID = :shoppingCartID;

-- Join sales, songs, and instruments tables to display their ids
SELECT ShoppingCart.shoppingCartID, Sales.salesID, Songs.songID, Instruments.instrumentID, ShoppingCart.itemQuantity, ShoppingCart.itemTotalPrice
FROM ShoppingCart
INNER JOIN Sales on ShoppingCart.sale = Sales.salesID
INNER JOIN Songs on ShoppingCart.song = Songs.songID
INNER JOIN Instruments on ShoppingCart.instrument = Instruments.instrumentID;


-- Instruments

-- Get all instruments information
SELECT * FROM Instruments;

-- Add a instrument
INSERT INTO Instruments (instrumentName, instrumentColor, instrumentMaterial, instrumentSize, instrumentYear, instrumentPrice)
VALUES (:instrumentName, :instrumentColor, :instrumentMaterial, :instrumentSize, :instrumentYear, :instrumentPrice)

-- Update a instrument's information
UPDATE Instruments
SET instrumentName = :instrumentName,
    instrumentColor = :instrumentColor,
    instrumentMaterial = :instrumentMaterial,
    instrumentSize = :instrumentSize,
    instrumentYear = :instrumentYear,
    instrumentPrice = :instrumentPrice
WHERE instrumentID = :instrumentID;

-- Remove a instrument
DELETE FROM Instruments 
WHERE instrumentID = :instrumentID;


-- Songs

-- Get all songs information
SELECT * FROM Songs;

-- Add a song
INSERT INTO Songs (songName, songArtist, songGenre, songLength, songYear, songPrice)
VALUES (:songName, :songArtist, :songGenre, :songLength,  :songYear, :songPrice);

-- Update a song's information
UPDATE Songs
SET songName = :songName,
    songArtist = :songArtist,
    songGenre = :songGenre,
    songLength = :songLength,
    songYear = :songYear,
    songPrice = :songPrice
WHERE songID = :songID;

-- Remove a song
DELETE FROM Songs
WHERE songID = :songID;
