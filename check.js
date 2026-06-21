const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const products = await prisma.product.findMany({ select: { name: true, youtubeUrl: true } });
  console.log(products);
}

check().finally(() => prisma.$disconnect());
