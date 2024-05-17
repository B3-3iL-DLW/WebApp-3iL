import { PrismaClient, user_role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt();

  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      password: await bcrypt.hash('alicepassword', salt),
      firstname: 'Alice',
      lastname: 'Doe',
      role: user_role.STUDENT,
      classGroupId: 1,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      password: await bcrypt.hash('bobpassword', salt),
      firstname: 'Bob',
      lastname: 'Smith',
      role: user_role.ADMIN,
      classGroupId: 1,
    },
  });

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
