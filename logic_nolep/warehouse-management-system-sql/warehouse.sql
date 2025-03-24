-- CREATE TABLE Products (
--   product_id INT PRIMARY KEY, 
--   product_name VARCHAR(50), 
--   category VARCHAR(50), 
--   price DECIMAL(10, 2)
--  );

-- CREATE TABLE Inventory (
--   inventory_id INT PRIMARY KEY,
--   product_id INT, 
--   quantity INT, 
--   location VARCHAR(50),
--   FOREIGN KEY (product_id) REFERENCES Products(product_id)
--  );

-- CREATE TABLE Orders (
--   order_id INT PRIMARY KEY, 
--   customer_id INT, 
--   order_date DATE 
-- );

-- CREATE TABLE OrderDetails (
--   order_detail_id INT PRIMARY KEY, 
--   order_id INT, 
--   product_id INT, 
--   quantity INT,
--   FOREIGN KEY (order_id) REFERENCES Orders(order_id),
--   FOREIGN KEY (product_id) REFERENCES Products(products_id)
-- );

-- INSERT INTO Products VALUES (1, 'Laptop', 'Elektronik', 999.99);
-- INSERT INTO Products VALUES (2, 'Meja Kursi', 'Perabot', 199.99);
-- INSERT INTO Products VALUES (3, 'Printer', 'Elektronik', 299.99);
-- INSERT INTO Products VALUES (4, 'Rak Buku', 'Perabot', 149.99);

-- SELECT product_name, price 
-- FROM Products ORDER BY price DESC;

-- INSERT INTO Inventory VALUES (1, 1, 50, 'Gudang A');
-- INSERT INTO Inventory VALUES (2, 2, 30, 'Gudang B');
-- INSERT INTO Inventory VALUES (3, 3, 20, 'Gudang A');
-- INSERT INTO Inventory VALUES (4, 4, 40, 'Gudang B');

-- SELECT P.product_name, I.quantity, I.location
-- FROM Products P JOIN Inventory I
-- ON P.product_id = I.product_id;

-- UPDATE Products SET price = 1099.99 WHERE product_name = 'Laptop';

-- SELECT I.location, SUM(P.price * I.quantity) AS total_value
-- FROM Products P JOIN Inventory I
-- ON P.product_id = I.product_id
-- GROUP BY I.location;

-- INSERT INTO Orders VALUES (1, 101, '2024-08-12');
-- INSERT INTO Orders VALUES (2, 102, '2024-08-13');

-- INSERT INTO OrderDetails VALUES (1, 1, 1, 2);
-- INSERT INTO OrderDetails VALUES (2, 1, 3, 1);
-- INSERT INTO OrderDetails VALUES (3, 2, 2, 1);
-- INSERT INTO OrderDetails VALUES (4, 2, 4, 2);

-- SELECT O.order_id, O.order_date, SUM(D.quantity * P.price) AS total_amount
-- FROM Orders O
-- JOIN OrderDetails D ON D.order_id = O.order_id
-- JOIN Products P ON P.product_id = D.product_id
-- GROUP BY O.order_id;

-- SELECT P.product_id, P.product_name
-- FROM Products P LEFT JOIN OrderDetails D
-- ON P.product_id = D.product_id
-- WHERE D.product_id IS NULL;

-- CREATE VIEW current_stock AS
-- SELECT P.product_name, I.quantity, I.location
-- FROM Products P JOIN Inventory I
-- ON P.product_id = I.product_id;

-- SELECT * FROM current_stock;