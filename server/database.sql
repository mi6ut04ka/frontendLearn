create TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    imageUrl VARCHAR(255),
    role VARCHAR[2]
);

create TABLE roles(
    role VARCHAR(255) PRIMARY KEY
);


create TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

create TABLE statistics(
    id_user INTEGER,
    right_arr INTEGER[],
    wrong_arr INTEGER[],
    id_category INTEGER,
    FOREIGN KEY (id_user) REFERENCES users (id),
    FOREIGN KEY (id_category) REFERENCES category (id)
);

create TABLE questions(
    id SERIAL PRIMARY KEY,
    id_category INTEGER,
    question VARCHAR(1000),
    FOREIGN KEY (id) REFERENCES category (id)
);

create TABLE answers(
    id SERIAL PRIMARY KEY,
    answer VARCHAR(1000),
    bool BOOLEAN,
    id_question INTEGER,
    FOREIGN KEY (id_question) REFERENCES questions (id)
);

create TABLE token(
    id_user INTEGER,
    refreshToken VARCHAR(255),
    FOREIGN KEY (id_user) REFERENCES users (id)
);

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  mimetype VARCHAR(100),
  size INTEGER,
  id_user INTEGER,
  FOREIGN KEY (id_user) REFERENCES users (id)
);

ALTER TABLE users
DROP COLUMN imageUrl;