DROP DATABASE IF EXISTS voting;
CREATE DATABASE voting;

\connect voting;

CREATE TABLE vote (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    vote_number INT NOT NULL CHECK (vote_number >= 0),
    last_vote TIMESTAMP
);

INSERT INTO vote (name, vote_number, last_vote)
VALUES
    ('cats', 0, NULL),
    ('dogs', 0, NULL);