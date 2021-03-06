-- DROP DATABASE IF EXISTS friend_finder_db;
-- CREATE DATABASE friend_finder_db;
-- USE friend_finder_db;

-- CREATE TABLE questions
-- (
-- id int NOT NULL AUTO_INCREMENT,
-- question varchar(255) NOT NULL,
-- PRIMARY KEY (id)
-- );

-- CREATE TABLE user_info 
-- (
-- id int NOT NULL AUTO_INCREMENT,
-- username varchar(255) NOT NULL,
-- picture_url varchar(255) NOT NULL,
-- age int NOT NULL,
-- PRIMARY KEY (id)
-- );

-- CREATE TABLE user_answers 
-- (
-- user_id int NOT NULL,
-- answers TINYTEXT NOT NULL,
-- INDEX par_ind (user_id),
-- FOREIGN KEY (user_id)
--         REFERENCES user_info(id)
--         ON DELETE CASCADE
-- )

USE heroku_8cbe70c838925e8;

CREATE TABLE questions
(
id int NOT NULL AUTO_INCREMENT,
question varchar(255) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE user_info 
(
id int NOT NULL AUTO_INCREMENT,
username varchar(255) NOT NULL,
picture_url varchar(255) NOT NULL,
age int NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE user_answers 
(
user_id int NOT NULL,
answers TINYTEXT NOT NULL,
INDEX par_ind (user_id),
FOREIGN KEY (user_id)
        REFERENCES user_info(id)
        ON DELETE CASCADE
);
