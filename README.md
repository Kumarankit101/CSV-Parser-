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

create the .env file and similar to .env.example

run the project using the command below
npm install
npm run start

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sideproject
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with:

```
DATABASE_URL=your_database_url
```

4. Push database schema:

```bash
npm run db:push
```

### Development

Start the development server:

```bash
npm run dev
```
