-- Create tables
CREATE OR REPLACE TABLE Customers (
    customerID INT AUTO_INCREMENT PRIMARY KEY,
    customerName VARCHAR(255),
    customerPhone VARCHAR(20),
    customerDateOfPurchase DATE
);

CREATE OR REPLACE TABLE Employees (
    employeeID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE OR REPLACE TABLE Sales (
    salesID INT AUTO_INCREMENT PRIMARY KEY,
    customerID INT,
    employeeID INT,
    saleAmount DECIMAL(10, 2),
    saleDate DATE,
    FOREIGN KEY (customerID) REFERENCES Customers(customerID),
    FOREIGN KEY (employeeID) REFERENCES Employees(employeeID)
);

CREATE OR REPLACE TABLE ShoppingCart (
    shoppingCartId INT AUTO_INCREMENT PRIMARY KEY,
    salesID INT,
    ItemType VARCHAR(255),
    itemID INT,
    itemQuantity INT,
    itemPrice DECIMAL(10, 2),
    ItemTotalPrice DECIMAL(10, 2),
    FOREIGN KEY (salesID) REFERENCES Sales(salesID)
);

CREATE OR REPLACE TABLE Instruments (
    instrumentID INT AUTO_INCREMENT PRIMARY KEY,
    instrumentName VARCHAR(255) NOT NULL,
    instrumentColor VARCHAR(255) NOT NULL,
    instrumentMaterial VARCHAR(255) NOT NULL,
    instrumentSize VARCHAR(255) NOT NULL,
    instrumentYear INT NOT NULL,
    instrumentPrice DECIMAL(10, 2) NOT NULL
);

CREATE OR REPLACE TABLE Songs (
    songID INT AUTO_INCREMENT PRIMARY KEY,
    songName VARCHAR(255),
    songArtist VARCHAR(255),
    songGenre VARCHAR(255),
    songLength TIME,
    songYear INT,
);



INSERT INTO Instruments (instrumentID,instrumentName, instrumentColor, instrumentMaterial, instrumentSize, instrumentYear, instrumentPrice)
VALUES 
('1','Flute', 'Blue', 'Wood', 'Medium', 2023, 100.00),
('2','Violin', 'Brown', 'Wood', 'Medium', 2023, 200.00),
('3','Trumpet', 'Brass', 'Brass', 'Medium', 2023, 300.00),
('4','Drums', 'Black', 'Wood', 'Large', 2023, 400.00);

-- Insert data into Songs table
INSERT INTO Songs (songID, albumID, songName, songArtist, songGenre, songLength, songYear)
VALUES
(1, 'Bohemian Rhapsody', 'Queen', 'Rock', '00:05:55', 1975),
(2, 'Billie Jean', 'Michael Jackson', 'Pop', '00:04:54', 1982),
(3, 'Stairway to Heaven', 'Led Zeppelin', 'Rock', '00:08:02', 1971),
(4, 'Back in Black', 'AC/DC', 'Rock', '00:04:15', 1980),
(5, 'Sweet Child O'' Mine', 'Guns N'' Roses', 'Rock', '00:05:56', 1987);

-- Insert data into Customers table
INSERT INTO Customers (customerID, customerName, customerPhone, customerDateOfPurchase)
VALUES
(123, 'Joe Doe', '123-422-3322', '2023-02-07'),
(124, 'Jane Smith', '125-423-3324', '2023-02-08'),
(125, 'Michale Doe', '124-424-3222', '2023-02-07');

-- Insert data into Employees table
INSERT INTO Employees (employeeID, name)
VALUES
(233321, 'Preet Patel'),
(234322, 'Ankith Sridhar'),
(235323, 'Kaveenaya Omkumar');

-- Insert data into Sales table
INSERT INTO Sales (salesID, customerID, employeeID, saleAmount, saleDate)
VALUES
(1233, 123, 233321, 100, '2023-02-07'),
(1244, 124, 234322, 200, '2023-02-08'),
(1255, 125, 235323, 300, '2023-02-07');

-- Insert data into ShoppingCart table
INSERT INTO ShoppingCart (shoppingCartId, salesID, ItemType, itemID, itemQuantity, itemPrice, ItemTotalPrice)
VALUES
(12331, 1233, 'Drake', 1014, 2, 100.00, 200.00),
(12441, 1244, 'Khalid', 1064, 3, 20.00, 60.00),
(12551, 1255, 'Travis', 1078, 5, 60.00, 300.00);

-- Query data
SELECT * FROM Instruments;
SELECT * FROM Songs;
SELECT * FROM Customers;
SELECT * FROM Employees;
SELECT * FROM Sales;
SELECT * FROM ShoppingCart;
