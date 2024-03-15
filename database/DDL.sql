-- Customers Table
CREATE OR REPLACE TABLE Customers (
    customerID INT AUTO_INCREMENT PRIMARY KEY,
    customerFname VARCHAR(255),
    customerLname VARCHAR(255),
    customerPhone VARCHAR(20),
    customerEmail VARCHAR(255)
);

-- Employees Table
CREATE OR REPLACE TABLE Employees (
    employeeID INT AUTO_INCREMENT PRIMARY KEY,
    employeeFname VARCHAR(255),
    employeeLname VARCHAR(255),
    employeePhone VARCHAR(20),
    employeeEmail VARCHAR(255)
);

-- Songs Table
CREATE OR REPLACE TABLE Songs (
    songID INT AUTO_INCREMENT PRIMARY KEY,
    songName VARCHAR(255),
    songArtist VARCHAR(255),
    songGenre VARCHAR(255),
    songLength TIME,
    songYear INT,
    songPrice DECIMAL(10, 2)
);

-- Instruments Table
CREATE OR REPLACE TABLE Instruments (
    instrumentID INT AUTO_INCREMENT PRIMARY KEY,
    instrumentName VARCHAR(255),
    instrumentColor VARCHAR(255),
    instrumentMaterial VARCHAR(255),
    instrumentSize VARCHAR(50),
    instrumentYear INT,
    instrumentPrice DECIMAL(10, 2)
);

-- Sales Table
CREATE OR REPLACE TABLE Sales (
    salesID INT AUTO_INCREMENT PRIMARY KEY,
    customerID INT,
    employeeID INT,
    saleAmount DECIMAL(10, 2),
    saleDate DATE,
    saleTime TIME,
    FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (employeeID) REFERENCES Employees(employeeID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ShoppingCart Table
CREATE OR REPLACE TABLE ShoppingCart (
    shoppingCartID INT AUTO_INCREMENT PRIMARY KEY,
    salesID INT,
    songID INT,
    instrumentID INT,
    songQuantity INT,
    instrumentQuantity INT,
    itemTotalPrice DECIMAL(10, 2),
    FOREIGN KEY (salesID) REFERENCES Sales(salesID) ON DELETE CASCADE,
    FOREIGN KEY (songID) REFERENCES Songs(songID) ON DELETE CASCADE,
    FOREIGN KEY (instrumentID) REFERENCES Instruments(instrumentID) ON DELETE SET NULL
);


-- Insert data into Customers table
INSERT INTO Customers (customerFname, customerLname, customerPhone, customerEmail)
VALUES
('Joe', 'Doe', '123-422-3322', 'joe@example.com'),
('Jane', 'Smith', '125-423-3324', 'jane@example.com'),
('Michael', 'Doe', '124-424-3222', 'michael@example.com');

-- Insert data into Employees table
INSERT INTO Employees (employeeFname, employeeLname, employeePhone, employeeEmail)
VALUES
('Preet', 'Patel', '123-456-7890', 'preet@example.com'),
('Ankith', 'Sridhar', '234-567-8901', 'ankith@example.com'),
('Kaveenaya', 'Omkumar', '345-678-9012', 'kaveenaya@example.com');


-- Insert data into Songs table
INSERT INTO Songs (songName, songArtist, songGenre, songLength, songYear, songPrice)
VALUES
('Bohemian Rhapsody', 'Queen', 'Rock', '00:05:55', 1975, 5.99),
('Billie Jean', 'Michael Jackson', 'Pop', '00:04:54', 1982, 4.99),
('Stairway to Heaven', 'Led Zeppelin', 'Rock', '00:08:02', 1971, 6.99),
('Back in Black', 'AC/DC', 'Rock', '00:04:15', 1980, 4.99),
('Sweet Child O'' Mine', 'Guns N'' Roses', 'Rock', '00:05:56', 1987, 5.99);


-- Insert data into Instruments table
INSERT INTO Instruments (instrumentName, instrumentColor, instrumentMaterial, instrumentSize, instrumentYear, instrumentPrice)
VALUES 
('Violin', 'Brown', 'Wood', 'Medium', 2023, 200.00),
('Trumpet', 'Brass', 'Brass', 'Medium', 2023, 300.00),
('Drums', 'Black', 'Wood', 'Large', 2023, 400.00);

-- Insert data into Sales table
INSERT INTO Sales (customerID, employeeID, saleAmount, saleDate, saleTime)
VALUES
(1, 1, 100.00, '2023-02-07', '12:00:00'),
(2, 2, 200.00, '2023-02-08', '13:00:00'),
(3, 3, 300.00, '2023-02-07', '14:00:00');

-- Insert data into ShoppingCart table
INSERT INTO ShoppingCart (salesID, songID, instrumentID, songQuantity, instrumentQuantity, itemTotalPrice)
VALUES
(1, 1, 1, 1, 1, 5.99 * 2),
(2, 2, 2, 1, 1, 4.99 * 3),
(3, 3, 3, 1, 1, 6.99 * 5);

-- Query data

SELECT * FROM Customers;
SELECT * FROM Employees;
SELECT * FROM Songs;
SELECT * FROM Instruments;
SELECT * FROM Sales;
SELECT * FROM ShoppingCart;
