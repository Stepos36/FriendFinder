DROP DATABASE IF EXISTS friend_finder_db;
CREATE DATABASE friend_finder_db;
USE friend_finder_db;

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
answer1 int NOT NULL,
answer2 int NOT NULL,
answer3 int NOT NULL,
answer4 int NOT NULL,
answer5 int NOT NULL,
answer6 int NOT NULL,
answer7 int NOT NULL,
answer8 int NOT NULL,
answer9 int NOT NULL,
answer10 int NOT NULL,
INDEX par_ind (user_id),
FOREIGN KEY (user_id)
        REFERENCES user_info(id)
        ON DELETE CASCADE
)

