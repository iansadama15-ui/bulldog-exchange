CREATE DATABASE IF NOT EXISTS bulldog_exchange;
USE bulldog_exchange;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0
);

INSERT INTO products (name, category, price, stock) VALUES
    ('NU Varsity Hoodie - Navy', 'Apparel', 1299.00, 50),
    ('NU Classic Mascot Tee', 'Apparel', 599.00, 100),
    ('NU Embroidered Snapback', 'Headwear', 699.00, 30),
    ('NU Insulated Water Bottle', 'Accessories', 799.00, 40),
    ('NU Uniform Set', 'Apparel', 1499.00, 150);