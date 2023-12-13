CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL
)

CREATE TABLE post(
    id SERIAL PRIMARY KEY,
    title VARCHAR(250),
    content VARCHAR(1000),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)
)