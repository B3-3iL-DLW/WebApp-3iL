import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      password: 'alicepassword',
      firstname: 'Alice',
      lastname: 'Doe',
      role: Role.STUDENT,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      password: 'bobpassword',
      firstname: 'Bob',
      lastname: 'Smith',
      role: Role.ADMIN,
    },
  });

  const classGroups = [
    {
      id: 1,
      file: 'B1 Groupe 1.xml',
      name: 'B1 Groupe 1',
    },
    {
      id: 2,
      file: 'I2 Groupe 3.xml',
      name: 'I2 Groupe 3',
    },
    {
      id: 3,
      file: 'I2 Groupe 5 FA.xml',
      name: 'I2 Groupe 5 FA',
    },
    {
      id: 4,
      file: 'I2 Temporaire.xml',
      name: 'I2 Temporaire',
    },
    {
      id: 5,
      file: 'ERIS1 Groupe 1 FE.xml',
      name: 'ERIS1 Groupe 1 FE',
    },
    {
      id: 6,
      file: 'ERIS2 Groupe 1 FE.xml',
      name: 'ERIS2 Groupe 1 FE',
    },
    {
      id: 7,
      file: 'B3 Groupe 1 IRC-FA.xml',
      name: 'B3 Groupe 1 IRC-FA',
    },
  ];

  for (const classGroup of classGroups) {
    await prisma.classGroup.create({
      data: classGroup,
    });
  }

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
