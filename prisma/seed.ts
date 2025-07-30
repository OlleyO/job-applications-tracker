import { type Prisma, PrismaClient } from '../app/generated/prisma';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'test@test.com',
    name: 'Test User',
    emailVerified: true,
    JobSubmission: {
      create: [
        {
          title: 'Test Job',
          company: 'Test Company',
          location: 'Test Location',
          url: 'https://test.com',
          status: 'IN_PROGRESS',
          notes: 'Test Notes',
        },
      ],
    },
  },
];

export async function seed() {
  for (const user of userData) {
    await prisma.user.create({
      data: user,
    });
  }
}

seed();
