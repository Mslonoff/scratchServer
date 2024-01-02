DROP TABLE IF EXISTS owners CASCADE;
DROP TABLE IF EXISTS dogs CASCADE;

create table owners (
	id serial PRIMARY KEY,
	firstName VARCHAR(50),
	lastName VARCHAR(50),
	address VARCHAR(50)
);

create table dogs (
	id serial PRIMARY KEY,
	name VARCHAR(50),
	gender VARCHAR(50),
	ownerId integer NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES owners (id) ON DELETE CASCADE
);