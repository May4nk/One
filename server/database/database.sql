CREATE DATABASE one;

--user table 
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

--space table
CREATE TABLE spaces(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL,
    seen BOOL DEFAULT TRUE NOT NULL,
    room text[] NOT NULL,
    owner INTEGER REFERENCES users(id),
    auths text[] NOT NULL DEFAULT 'JWT'
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    pic VARCHAR(255) NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0,
    owner INTEGER REFERENCES users(id)
);


