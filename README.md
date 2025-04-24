# Kelp CSV User Importer

## PostgreSQL Table Setup

Before running the project, create the required `users` table in your PostgreSQL database:

CREATE TABLE public.users (
  id SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  age INT NOT NULL,
  address JSONB,
  additional_info JSONB
);


create the .env file and similar to .env.example

run the project using the command below
npm install
npm run start