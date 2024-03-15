-- Customers
-- Get all customer information
SELECT * FROM Customers;

-- Add a customer
INSERT INTO Customers (customerFname, customerLname, customerPhone, customerEmail)
VALUES ('customerFname_value', 'customerLname_value', 'customerPhone_value', 'customerEmail_value');

-- Update a customer's information
UPDATE Customers
SET customerFname = 'new_customerFname_value',
    customerLname = 'new_customerLname_value',
    customerPhone = 'new_customerPhone_value',
    customerEmail = 'new_customerEmail_value'
WHERE customerID = 'customerID_value';

-- Remove a customer
DELETE FROM Customers
WHERE customerID = 'customerID_value';


-- Employees

-- Get all employees information
SELECT * FROM Employees;

-- Add an employee
INSERT INTO Employees (employeeFname, employeeLname, employeePhone, employeeEmail)
VALUES ('employeeFname_value', 'employeeLname_value', 'employeePhone_value', 'employeeEmail_value');

-- Update an employee's information
UPDATE Employees
SET employeeFname = 'new_employeeFname_value',
    employeeLname = 'new_employeeLname_value',
    employeePhone = 'new_employeePhone_value',
    employeeEmail = 'new_employeeEmail_value'
WHERE employeeID = 'employeeID_value';

-- Remove an employee
DELETE FROM Employees
WHERE employeeID = 'employeeID_value';


-- Sales

-- Get all sales information
SELECT * FROM Sales;

-- Add a sale
INSERT INTO Sales (customerID, employeeID, saleAmount, saleDate, saleTime)
VALUES ('customerID_value', 'employeeID_value', 'saleAmount_value', 'saleDate_value', 'saleTime_value');

-- Update a sale's information
UPDATE Sales
SET customerID = 'new_customerID_value',
    employeeID = 'new_employeeID_value',
    saleAmount = 'new_saleAmount_value',
    saleDate = 'new_saleDate_value',
    saleTime = 'new_saleTime_value'
WHERE salesID = 'salesID_value';

-- Remove a sale
DELETE FROM Sales
WHERE salesID = 'salesID_value';


-- Shopping Cart

-- Get all shopping cart information
SELECT * FROM ShoppingCart;

-- Add a shopping cart
INSERT INTO ShoppingCart (salesID, songID, instrumentID,songQuantity,instrumentQuantity, itemTotalPrice)
VALUES ('salesID_value', 'songID_value', 'instrumentID_value', 'songQuantity_value','instrumentQuantity_value', 'itemTotalPrice_value');

-- Update a shopping cart's information
UPDATE ShoppingCart
SET salesID = 'new_salesID_value',
    songID = 'new_songID_value',
    instrumentID = 'new_instrumentID_value',
    songQuantity = 'new_songQuantity_value'
    instrumentQuantity = 'new_instrumentQuantity_value',
    itemTotalPrice = 'new_itemTotalPrice_value'
WHERE shoppingCartID = 'shoppingCartID_value';

-- Remove a shopping cart
DELETE FROM ShoppingCart
WHERE shoppingCartID = 'shoppingCartID_value';

-- Instruments

-- Get all instruments information
SELECT * FROM Instruments;

-- Add an instrument
INSERT INTO Instruments (instrumentName, instrumentColor, instrumentMaterial, instrumentSize, instrumentYear, instrumentPrice)
VALUES ('instrumentName_value', 'instrumentColor_value', 'instrumentMaterial_value', 'instrumentSize_value', 'instrumentYear_value', 'instrumentPrice_value');

-- Update an instrument's information
UPDATE Instruments
SET instrumentName = 'new_instrumentName_value',
    instrumentColor = 'new_instrumentColor_value',
    instrumentMaterial = 'new_instrumentMaterial_value',
    instrumentSize = 'new_instrumentSize_value',
    instrumentYear = 'new_instrumentYear_value',
    instrumentPrice = 'new_instrumentPrice_value'
WHERE instrumentID = 'instrumentID_value';

-- Remove an instrument
DELETE FROM Instruments 
WHERE instrumentID = 'instrumentID_value';


-- Songs

-- Get all songs information
SELECT * FROM Songs;

-- Add a song
INSERT INTO Songs (songName, songArtist, songGenre, songLength, songYear, songPrice)
VALUES ('songName_value', 'songArtist_value', 'songGenre_value', 'songLength_value', 'songYear_value', 'songPrice_value');

-- Update a song's information
UPDATE Songs
SET songName = 'new_songName_value',
    songArtist = 'new_songArtist_value',
    songGenre = 'new_songGenre_value',
    songLength = 'new_songLength_value',
    songYear = 'new_songYear_value',
    songPrice = 'new_songPrice_value'
WHERE songID = 'songID_value';

-- Remove a song
DELETE FROM Songs
WHERE songID = 'songID_value';
