import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const catalogue: Record<string, [string, string][]> = {
  Fiction: [
    ['Things Fall Apart', 'Chinua Achebe'],
    ['Half of a Yellow Sun', 'Chimamanda Ngozi Adichie'],
    ['Nervous Conditions', 'Tsitsi Dangarembga'],
    ['So Long a Letter', 'Mariama Bâ'],
  ],
  History: [
    ['How Europe Underdeveloped Africa', 'Walter Rodney'],
    ['Africa: A Biography of the Continent', 'John Reader'],
    ['The Scramble for Africa', 'Thomas Pakenham'],
    ['A History of South Africa', 'Leonard Thompson'],
  ],
  Science: [
    ['A Brief History of Time', 'Stephen Hawking'],
    ['Cosmos', 'Carl Sagan'],
    ['The Selfish Gene', 'Richard Dawkins'],
    ['The Gene', 'Siddhartha Mukherjee'],
  ],
  Biography: [
    ['Long Walk to Freedom', 'Nelson Mandela'],
    ['Born a Crime', 'Trevor Noah'],
    ['Unbowed', 'Wangari Maathai'],
    ['Becoming', 'Michelle Obama'],
  ],
};

async function main() {
  let counter = 1;

  for (const [genreName, books] of Object.entries(catalogue)) {
    const genre = await prisma.genre.upsert({
      where: { slug: genreName.toLowerCase() },
      update: {},
      create: { name: genreName, slug: genreName.toLowerCase() },
    });

    for (const [title, author] of books) {
      const isbn = `978-1-000-${String(counter++).padStart(4, '0')}`;
      await prisma.book.upsert({
        where: { isbn },
        update: {},
        create: {
          title,
          author,
          isbn,
          totalCopies: 3,
          availableCopies: 3,
          genreId: genre.id,
        },
      });
    }
  }

  await prisma.user.upsert({
    where: { email: 'librarian@example.com' },
    update: {},
    create: {
      email: 'librarian@example.com',
      name: 'Head Librarian',
      role: 'LIBRARIAN',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
