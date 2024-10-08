BEGIN TRANSACTION;

DROP TABLE IF EXISTS follows;
DROP TABLE if EXISTS adminuser_band;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS band_people;
DROP TABLE IF EXISTS people;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS band_genre;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS socials;
DROP TABLE if EXISTS bands;
DROP TABLE if EXISTS notifications;
DROP TABLE if EXISTS featured_bands;
DROP TABLE if EXISTS read_notifications;

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
	MBID varchar(50) NOT NULL,
	CONSTRAINT PK_band PRIMARY KEY (band_id)
);

CREATE TABLE adminuser_band (
    band_id varchar(50) NOT NULL,
    user_id int NOT NULL,
    CONSTRAINT PK_band_id PRIMARY KEY (band_id),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) references users (user_id)
);

CREATE TABLE read_notifications (
    notification_id int NOT NULL,
    user_id int NOT NULL,
    spotify_band_id varchar(50) NOT NULL,
    message varchar(100000),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) references users (user_id)
);

CREATE TABLE notifications (
	notification_id SERIAL,
	spotify_band_id varchar(50) NOT NULL,
	message varchar(100000),
	CONSTRAINT PK_notification PRIMARY KEY (notification_id)
);

CREATE TABLE featured_bands (
	spotify_band_id varchar(50) NOT NULL UNIQUE
);

CREATE TABLE follows (
	follow_id SERIAL,
	user_id int NOT NULL,
	spotify_band_id varchar(100) NOT NULL,
	CONSTRAINT PK_follow_id PRIMARY KEY (follow_id),
	CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE people (
	person_id SERIAL,
	person_name varchar(50) NOT NULL,
	CONSTRAINT PK_person PRIMARY KEY (person_id)
);

CREATE TABLE band_people (
    person_id int NOT NULL,
    band_id int NOT NULL
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

INSERT INTO bands (name, description, mbid)
VALUES ('Team Echo', 'Coolest band.', 'NOT LINKED');

INSERT INTO people (person_name)
VALUES ('Ryan');
INSERT INTO people (person_name)
VALUES ('Eric');
INSERT INTO people (person_name)
VALUES ('Madeline');
INSERT INTO people (person_name)
VALUES ('Josh');
INSERT INTO people (person_name)
VALUES ('Kari');

INSERT INTO images (image_url, band_id)
VALUES ('https://i.ytimg.com/vi/dUhSvDNAXGc/maxresdefault.jpg', 1);

INSERT INTO genres (genre_name)
VALUES ('coding');

INSERT INTO band_genre (genre_id, band_id)
VALUES (1, 1);

INSERT INTO band_people (person_id, band_id)
VALUES (1, 1);
INSERT INTO band_people (person_id, band_id)
VALUES (2, 1);
INSERT INTO band_people (person_id, band_id)
VALUES (3, 1);
INSERT INTO band_people (person_id, band_id)
VALUES (4, 1);
INSERT INTO band_people (person_id, band_id)
VALUES (5, 1);


COMMIT TRANSACTION;