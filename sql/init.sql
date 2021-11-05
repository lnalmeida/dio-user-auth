
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypt";

CREATE TABLE IF NOT EXISTS "application_user" (
  "uuid" uuid DEFAULT uuid_generate_v4() NOT NULL, 
  "name" varchar(100) NOT NULL,
  "username" varchar(50) NOT NULL,
  "email" varchar(100) NOT NULL,
  "password" varchar(100) NOT NULL,
  "avatar" varchar(255),
  "created_at" timestamp DEFAULT NOW() NOT NULL,
  PRIMARY KEY ("uuid")
);

INSERT INTO application_user 
    (name, username, email, password)
VALUES
    ('admin',
     'admin',
     'admin@email.com',
     crypt('admin', 'f6d24d14d351f6bb5651998b678006a13d1adc3d96c1a4bc60f8afad00ea20f3')
    );

    INSERT INTO application_user 
    (name, username, email, password)
VALUES
    ('Luiz Nunes',
     'lnalmeida',
     'lnalmeida@email.com',
     crypt('admin', 'f6d24d14d351f6bb5651998b678006a13d1adc3d96c1a4bc60f8afad00ea20f3')
    );