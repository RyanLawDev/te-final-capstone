BEGIN TRANSACTION;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS people;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS socials;
DROP TABLE if EXISTS bands;

CREATE TABLE users (
	user_id SERIAL,
	username varchar(50) NOT NULL UNIQUE,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);

CREATE TABLE bands (
	band_id SERIAL,
	name varchar(50) NOT NULL,
	description varchar(100000),
	CONSTRAINT PK_band PRIMARY KEY (band_id)
);

CREATE TABLE people (
	person_id SERIAL,
	person_name varchar(50) NOT NULL,
	band_id int NOT NULL,
	MBID varchar(50) NOT NULL,
	CONSTRAINT PK_person PRIMARY KEY (person_id),
	CONSTRAINT FK_band_id FOREIGN KEY (band_id) REFERENCES bands (band_id)
);

CREATE TABLE images (
	image_id SERIAL,
	image_url varchar(200) NOT NULL UNIQUE,
	band_id int NOT NULL,
	CONSTRAINT PK_image PRIMARY KEY (image_id),
	CONSTRAINT FK_band_id FOREIGN KEY (band_id) REFERENCES bands (band_id)
);

CREATE TABLE genres (
	genre_id SERIAL,
	genre_name varchar(100) NOT NULL UNIQUE,
	CONSTRAINT PK_genre PRIMARY KEY (genre_id)
);

CREATE TABLE band_genre (
    genre_id int NOT NULL,
    band_id int NOT NULL,
    CONSTRAINT FK_genre_id FOREIGN KEY (genre_id) REFERENCES genres (genre_id),
    CONSTRAINT FK_band_id FOREIGN KEY (band_id) REFERENCES bands (band_id)
);

CREATE TABLE socials (
	social_id SERIAL,
	social_url varchar(200) NOT NULL UNIQUE,
	band_id int NOT NULL,
	CONSTRAINT PK_social PRIMARY KEY (social_id),
	CONSTRAINT FK_band_id FOREIGN KEY (band_id) REFERENCES bands (band_id)
);

INSERT INTO bands (name, description)
VALUES ('Team Echo', 'Coolest band.');

INSERT INTO people (person_name, band_id, mbid)
VALUES ('Ryan', 1, 'NOT LINKED');
INSERT INTO people (person_name, band_id, mbid)
VALUES ('Eric', 1, 'NOT LINKED');
INSERT INTO people (person_name, band_id, mbid)
VALUES ('Madeline', 1, 'NOT LINKED');
INSERT INTO people (person_name, band_id, mbid)
VALUES ('Josh', 1, 'NOT LINKED');
INSERT INTO people (person_name, band_id, mbid)
VALUES ('Kari', 1, 'NOT LINKED');

INSERT INTO images (image_url, band_id)
VALUES ('https://i.ytimg.com/vi/dUhSvDNAXGc/maxresdefault.jpg', 1);

INSERT INTO genres (genre_name)
VALUES ('coding');

INSERT INTO band_genre (genre_id, band_id)
VALUES (1, 1);


COMMIT TRANSACTION;





