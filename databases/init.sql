create database if not exists blog;
use blog;

CREATE TABLE user (
  id int NOT NULL AUTO_INCREMENT,
  avatar varchar(191)  NOT NULL DEFAULT 'default.png',
  username varchar(191)   DEFAULT NULL,
  email varchar(191)   NOT NULL,
  create_time datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  password varchar(191)  NOT NULL,
  role varchar(191)  DEFAULT 'user',
  PRIMARY KEY (id),
  UNIQUE KEY  (email),
  UNIQUE KEY  (username)
) AUTO_INCREMENT= 0;

CREATE TABLE post (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(191)  NOT NULL,
  content longtext ,
  create_time datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  author_id int NOT NULL,
  PRIMARY KEY (id),
  KEY Post_author_id_fkey (author_id),
  CONSTRAINT Post_author_id_fkey FOREIGN KEY (author_id) REFERENCES user (id) ON DELETE RESTRICT ON UPDATE CASCADE
)  AUTO_INCREMENT=10000;