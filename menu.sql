CREATE DATABASE IF NOT EXISTS `menu`;
USE `menu`;

CREATE TABLE IF NOT EXISTS resources (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `link` VARCHAR(255),
    `tags` VARCHAR(255),
    `map` VARCHAR(64) NOT NULL,
    `area` VARCHAR(64) NOT NULL,
    `image_data` LONGBLOB NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS accepted (
    `id` int NOT NULL AUTO_INCREMENT,
    `count` int,
    PRIMARY KEY (id)
);