# Library Management System

A NestJS + Prisma + PostgreSQL backend for a library's book catalogue.

## Schema Decisions

I made Book point to Genre with a `genreId` instead of putting the genre details inside every book. Lots of books share the same genre, so if I copied the genre into each one, I would be storing the same thing over and over. If I wanted to rename "Fiction" later, I would have to change it in every single fiction book, and one typo would create a duplicate genre by accident.

With a foreign key, the genre is saved once in its own table and each book just points to it. Change it in one place and every book is updated. PostgreSQL also checks the link, so a book can't point to a genre that doesn't exist. It works like a school register: it doesn't copy the whole Grade 5 class into every learner's file, it just writes the class number.

## Setup

1. `cd api && npm install`
2. Copy `.env.example` to `.env` and put your own `DATABASE_URL` in it
3. `npx prisma migrate dev`
4. `npx prisma db seed`
