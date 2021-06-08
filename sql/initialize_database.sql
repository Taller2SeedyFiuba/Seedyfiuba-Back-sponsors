SET SEARCH_PATH TO 'public';

/*
Necesito guardar info de sponsors, favoritos y preferencias de usuario
*/

CREATE TYPE PROJECT_TYPE AS ENUM ('software', 'electronics', 'art');

DROP TABLE IF EXISTS SponsorOf;

CREATE TABLE SponsorOf(
	userid VARCHAR(255) NOT NULL CHECK (userid <> ''),
	projectid INTEGER NOT NULL
);

ALTER TABLE SponsorOf ADD CONSTRAINT pk_SponsorOf PRIMARY KEY(userid, projectid);


DROP TABLE IF EXISTS FavouriteProjects;

CREATE TABLE FavouriteProjects(
	userid VARCHAR(255) NOT NULL CHECK (userid <> ''),
	projectid INTEGER NOT NULL
);

ALTER TABLE FavouriteProjects ADD CONSTRAINT pk_FavouriteProjects PRIMARY KEY(userid, projectid);

DROP TABLE IF EXISTS Preferences;

CREATE TABLE Preferences(
	userid VARCHAR(255) NOT NULL CHECK (userid <> ''),
	type PROJECT_TYPE NOT NULL
);

ALTER TABLE Preferences ADD CONSTRAINT pk_Preferences PRIMARY KEY(userid, type);



