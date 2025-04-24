# Kelp CSV User Importer

## PostgreSQL Table Setup

Before running the project, create the required `users` table in your PostgreSQL database:
```
CREATE TABLE public.users (
  id SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  age INT NOT NULL,
  address JSONB,
  additional_info JSONB
);
```


### Installation

1. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with:

```
DATABASE_URL=your_database_url
CSV_PATH = "data/sample_users.csv"
```


3. Run the program:
   Create a `.env` file in the root directory with:

```
npm run start
```


