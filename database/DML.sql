-- DML for for Customers Table

-- Create
INSERT INTO Customers (customerName, customerPhone, customerDateOfPurchase)
VALUES ('customerName_value', 'customerPhone_value', 'customerDateOfPurchase_value');

-- Read
SELECT * FROM Customers;

-- Update
UPDATE Customers
SET customerName = 'new_customerName_value', customerPhone = 'new_customerPhone_value', customerDateOfPurchase = 'new_customerDateOfPurchase_value'
WHERE customerID = customerID_value;

-- Delete
DELETE FROM Customers WHERE customerID = customerID_value;

-- DML for Employees Table

-- Create
INSERT INTO Employees (name)
VALUES ('name_value');

-- Read
SELECT * FROM Employees;

-- Update
UPDATE Employees SET name = 'new_name_value' WHERE employeeID = employeeID_value;

-- Delete
DELETE FROM Employees WHERE employeeID = employeeID_value;

-- DML for Sales Table

-- Create
INSERT INTO Sales (customerID, employeeID, saleAmount, saleDate)
VALUES (customerID_value, employeeID_value, saleAmount_value, 'saleDate_value');

-- Read
SELECT * FROM Sales;

-- Update
UPDATE Sales
SET customerID = customerID_value, employeeID = employeeID_value, saleAmount = saleAmount_value, saleDate = 'new_saleDate_value'
WHERE salesID = salesID_value;

-- Delete
DELETE FROM Sales WHERE salesID = salesID_value;

-- DML for ShoppingCart Table

-- Create
INSERT INTO ShoppingCart (salesID, ItemType, itemQuantity, itemPrice, ItemTotalPrice)
VALUES (salesID_value, 'ItemType_value', itemQuantity_value, itemPrice_value, ItemTotalPrice_value);

-- Read
SELECT s.shoppingCartId, sa.ItemType AS item_name, s.itemQuantity, s.itemPrice, s.ItemTotalPrice
FROM ShoppingCart s
JOIN Sales sa ON s.salesID = sa.salesID;

-- Update
UPDATE ShoppingCart
SET salesID = salesID_value, ItemType = 'new_ItemType_value', itemQuantity = new_itemQuantity_value, itemPrice = new_itemPrice_value, ItemTotalPrice = new_ItemTotalPrice_value
WHERE shoppingCartId = shoppingCartId_value;

-- Delete
DELETE FROM ShoppingCart WHERE shoppingCartId = shoppingCartId_value;

-- DML for Instrument Table

-- Create
INSERT INTO Instruments (instrumentName, instrumentColor, instrumentMaterial, instrumentSize, instrumentYear, instrumentPrice)
VALUES ('instrumentName_value', 'instrumentColor_value', 'instrumentMaterial_value', instrumentSize_value, instrumentYear_value, instrumentPrice_value);

-- Read
SELECT * FROM Instruments;

-- Update
UPDATEInstruments 
SET instrumentName = 'new_instrumentName_value', instrumentColor = 'new_instrumentColor_value', instrumentMaterial = 'new_instrumentMaterial_value', instrumentSize = new_instrumentSize_value, instrumentYear = new_instrumentYear_value, instrumentPrice = new_instrumentPrice_value
WHERE instrumentID = instrumentID_value;

-- Delete
DELETE FROM Instruments WHERE instrumentID = instrumentID_value;

-- DML for Songs Table

-- Create
INSERT INTO Songs (albumID, songName, songArtist, songGenre, songLength, songYear)
VALUES (albumID_value, 'songName_value', 'songArtist_value', 'songGenre_value', 'songLength_value', songYear_value);

-- Read
SELECT * FROM Songs;

-- Update
UPDATE Songs
SET albumID = albumID_value, songName = 'new_songName_value', songArtist = 'new_songArtist_value', songGenre = 'new_songGenre_value', songLength = 'new_songLength_value', songYear = new_songYear_value
WHERE songID = songID_value;

-- Delete
DELETE FROM Songs WHERE songID = songID_value;
