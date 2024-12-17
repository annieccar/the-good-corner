-- CREATE TABLE if NOT EXISTS ad 
-- (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
-- 	title VARCHAR(100) NOT NULL,
-- 	description TEXT,
-- 	owner VARCHAR(100) NOT NULL,
-- 	price INT,
--     picture VARCHAR(400),
--     location VARCHAR(100),
-- 	createdAt DATE
-- );

-- CREATE TABLE if NOT EXISTS category
-- (
-- 	 id INTEGER PRIMARY KEY AUTOINCREMENT,
-- 	 name VARCHAR(100) NOT NULL
-- );

-- -- ALTER TABLE ad
-- -- 	ADD COLUMN category_id INT;

-- ALTER TABLE ad RENAME TO ad_old;

-- CREATE TABLE if NOT EXISTS ad 
-- (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
-- 	title VARCHAR(100) NOT NULL,
-- 	description TEXT,
-- 	owner VARCHAR(100) NOT NULL,
-- 	price INT,
--    icture VARCHAR(400),
--   location VARCHAR(100),
-- 	createdAt DATE,
-- 	category_id INT NOT NULL,
-- 	FOREIGN KEY (category_id) REFERENCES category(id)
-- );

-- PRAGMA foreign_keys=off;

-- INSERT INTO ad SELECT * FROM ad_old;

-- ALTER TABLE ad
-- 	ADD CONSTRAINT FK_category,
-- 	FOREIGN KEY (category_id) REFERENCES category(id);



-- INSERT INTO ad (title, description, owner, price, picture, location, createdAt) VALUES 
-- ('T-shirt', 'An awesome t-shirt', 'Patrick Simpson', 20, 'image.com', 'Bayonne', '2024-09-25'),
-- ('scarf', 'An awesome t-shirt', 'Patrick Simpson', 5, 'image.com', 'Bayonne', '2024-09-25'),
-- ('Bike', 'An awesome t-shirt', 'Patrick Simpson', 200, 'image.com', 'Bayonne', '2024-09-01'),
-- ('Canvas', 'An awesome t-shirt', 'Patrick Simpson', 1000, 'image.com', 'Bayonne', '2024-09-25'),
-- ('umbrella', 'An awesome t-shirt', 'Patrick Simpson', 5, 'image.com', 'Bordeaux', '2024-09-25'),
-- ('jeans', 'An awesome t-shirt', 'Patrick Simpson', 50, 'image.com', 'Bayonne', '2024-09-01'),
-- ('macbook pro', 'An awesome t-shirt', 'Patrick Simpson', 1000, 'image.com', 'Bayonne', '2024-09-25'),
-- ('adidas', 'An awesome t-shirt', 'Patrick Simpson', 60, 'image.com', 'Bordeaux', '2024-09-25'),
-- ('T-shirt', 'An awesome t-shirt', 'Patrick Simpson', 20, 'image.com', 'Paris', '2024-09-25'),
-- ('T-shirt', 'An awesome t-shirt', 'Patrick Simpson', 20, 'image.com', 'Bayonne', '2024-09-25'),
-- ('T-shirt', 'An awesome t-shirt', 'Patrick Simpson', 20, 'image.com', 'Paris', '2024-09-25'),
-- ('T-shirt', 'An awesome t-shirt', 'Patrick Simpson', 20, 'image.com', 'Bayonne', '2024-09-25'),
-- ('T-shirt', 'An awesome t-shirt', 'Patrick Simpson', 20, 'image.com', 'Bayonne', '2024-09-25'),
-- ('T-shirt', 'An awesome t-shirt', 'Patrick Simpson', 20, 'image.com', 'Bayonne', '2024-09-01'),
-- ('T-shirt', 'An awesome t-shirt', 'Patrick Simpson', 20, 'image.com', 'Paris', '2024-09-25'),
-- ('T-shirt', 'An awesome t-shirt', 'Patrick Simpson', 20, 'image.com', 'Lyon', '2024-09-25'),
-- ('T-shirt', 'An awesome t-shirt', 'Patrick Simpson', 20, 'image.com', 'Bayonne', '2024-09-25'),
-- ('T-shirt', 'An awesome t-shirt', 'Patrick Simpson', 20, 'image.com', 'Lyon', '2024-09-25'),
-- ('T-shirt', 'An awesome t-shirt', 'Patrick Simpson', 20, 'image.com', 'Bayonne', '2024-09-01'),
-- ('T-shirt', 'An awesome t-shirt', 'Patrick Simpson', 20, 'image.com', 'Lyon', '2024-09-25'),
-- ('T-shirt', 'An awesome t-shirt', 'Patrick Simpson', 20, 'image.com', 'Bayonne', '2024-09-25');

-- SELECT * FROM ad WHERE location = 'Bordeaux';

-- DELETE FROM ad WHERE price > 40;

-- UPDATE ad SET price = 0 WHERE createdAt = '2024-09-01';

-- DELETE FROM ad WHERE id >40;

-- SELECT * FROM ad;

-- SELECT AVG(price) FROM ad WHERE location = 'Paris';

-- SELECT location, AVG(price) AS average_price
-- FROM ad
-- GROUP BY location;





