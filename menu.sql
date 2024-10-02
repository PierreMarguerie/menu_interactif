

CREATE DATABASE IF NOT EXISTS `menu`;

CREATE TABLE IF NOT EXISTS `wa_location` (
    `id` int NOT NULL AUTO_INCREMENT,
    `map` VARCHAR(24) NOT NULL,
    `areaName` VARCHAR(64) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS `resources` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `link` VARCHAR(255),
    `wa_location` INT,
    `tags` varchar(255),
    PRIMARY KEY (id),
    FOREIGN KEY (wa_location) REFERENCES wa_location(id) ON DELETE CASCADE
);
