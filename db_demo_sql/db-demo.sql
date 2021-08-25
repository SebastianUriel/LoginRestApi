-- CREATE DATABASE db_login;

USE db_login;

DROP TABLE user_role;
DROP TABLE path_role;
DROP TABLE user;
DROP TABLE role;
DROP TABLE path;

CREATE TABLE user (
	id_user integer auto_increment primary key,
    email varchar(120) not null unique,
    password varchar(250) not null,
    name varchar(40) not null,
    last_name varchar(40) not null,
    birthday date not null,
    createdAt datetime not null,
    updatedAt datetime not null,
    status boolean default true
);

INSERT INTO user (email, password, name, last_name, birthday, createdAt, updatedAt) 
VALUES ('sebastianuriel10mil@gmail.com', '$2a$10$Eksvro2GnezBY6YsSDNp6e4Qc4pM5yrgwUhW2FSyYy7Qi8OaB3cMO', 'Admin', 'Admin', '1998-07-04', NOW(), NOW());

CREATE TABLE role (
	id_role integer auto_increment primary key,
    name varchar(30) not null unique,
    status boolean default true
);

INSERT INTO role (name) VALUES ('ADMIN_ROLE');
INSERT INTO role (name) VALUES ('USER_ROLE');

CREATE TABLE path (
	id_path integer auto_increment primary key,
    name varchar(30) not null unique,
    path varchar(50) not null unique,
    menu boolean default true,
    status boolean default true
);

INSERT INTO path (name, path, menu) VALUES ("Admin the users", "/v1/api/auth/user", false);
INSERT INTO path (name, path, menu) VALUES ("Admin the paths", "/v1/api/auth/path", false);
INSERT INTO path (name, path, menu) VALUES ("Admin the role", "/v1/api/auth/role", false);
INSERT INTO path (name, path, menu) VALUES ("Admin the users roles", "/v1/api/auth/userRole", false);
INSERT INTO path (name, path, menu) VALUES ("Admin the paths roles", "/v1/api/auth/pathRole", false);

CREATE TABLE user_role (
	id_user integer not null,
    id_role integer not null,
    primary key(id_user, id_role),
    foreign key (id_user) references user(id_user),
    foreign key (id_role) references role(id_role)
);

INSERT INTO user_role (id_user, id_role) VALUES (1, 1);
	
CREATE TABLE path_role (
	id_path integer not null,
    id_role integer not null,
    primary key (id_path, id_role),
    foreign key (id_path) references path(id_path),
    foreign key (id_role) references role(id_role)
);

INSERT INTO path_role (id_path, id_role) VALUES (1, 1);
INSERT INTO path_role (id_path, id_role) VALUES (2, 1);
INSERT INTO path_role (id_path, id_role) VALUES (3, 1);
INSERT INTO path_role (id_path, id_role) VALUES (4, 1);
INSERT INTO path_role (id_path, id_role) VALUES (5, 1);
