# Library Management System

A NestJS + Prisma + PostgreSQL backend for a library's book catalogue.

## Schema Decisions

**Why Book references Genre instead of embedding it:**
A genre is shared by many books. If every Book stored its own copy of the
genre's details, renaming "Fiction" to "Literary Fiction" would mean editing
every fiction book, and a typo would quietly create a duplicate genre.
Instead, Book stores only a `genreId` foreign key pointing to one Genre row.
The genre lives in a single place, and PostgreSQL enforces the link, so a
book can never point to a genre that does not exist.

## Setup

1. `cd api && npm install`
2. Copy `.env.example` to `.env` and put your own `DATABASE_URL` in it
3. `npx prisma migrate dev`
4. `npx prisma db seed`
