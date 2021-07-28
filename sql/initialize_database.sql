SET SEARCH_PATH TO 'public';

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

DROP TABLE IF EXISTS Viewers;

CREATE TABLE Viewers(
	userid VARCHAR(255) NOT NULL CHECK (userid <> ''),
	promotedate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE Viewers ADD CONSTRAINT pk_Viewers PRIMARY KEY(userid);

DROP TABLE IF EXISTS ViewerOf;

CREATE TABLE ViewerOf(
	userid VARCHAR(255) NOT NULL CHECK (userid <> ''),
	projectid INTEGER NOT NULL
);

ALTER TABLE ViewerOf ADD CONSTRAINT pk_ViewerOf PRIMARY KEY(userid, projectid);
ALTER TABLE ViewerOf ADD CONSTRAINT fk_ViewerOf FOREIGN KEY(userid) REFERENCES Viewers ON DELETE CASCADE;

DROP TABLE IF EXISTS VotedFor;

CREATE TABLE VotedFor(
	userid VARCHAR(255) NOT NULL CHECK (userid <> ''),
  projectid INTEGER NOT NULL,
  stage INTEGER NOT NULL CHECK (stage >= 0),
	votingdate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE VotedFor ADD CONSTRAINT pk_VotedFor PRIMARY KEY(userid, projectid, stage);
ALTER TABLE VotedFor ADD CONSTRAINT fk_VotedFor FOREIGN KEY(userid, projectid) REFERENCES ViewerOf ON DELETE CASCADE;

INSERT INTO Viewers (userid)
	VALUES ('C5Jeg8M5HKaIKOqXt5bZX7IdWFk2');

INSERT INTO Viewers (userid)
	VALUES ('pvs2jwbOFiZN4WOtQBYmr5LzLU53');

INSERT INTO Viewers (userid)
	VALUES ('sSbHAjsWp8X3mNJ6rd1JtQB4vtU2');


