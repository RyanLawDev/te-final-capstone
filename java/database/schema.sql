BEGIN TRANSACTION;

DROP TABLE IF EXISTS users;
DROP TABLE if EXISTS bands;
DROP TABLE IF EXISTS people;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS socials;

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
	band_id int NOT NULL,
	CONSTRAINT PK_genre PRIMARY KEY (genre_id),
	CONSTRAINT FK_band_id FOREIGN KEY (band_id) REFERENCES bands (band_id)
);
CREATE TABLE socials (
	social_id SERIAL,
	social_url varchar(200) NOT NULL UNIQUE,
	band_id int NOT NULL,
	CONSTRAINT PK_social PRIMARY KEY (social_id),
	CONSTRAINT FK_band_id FOREIGN KEY (band_id) REFERENCES bands (band_id)
);


COMMIT TRANSACTION;
