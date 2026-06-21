import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany(); // Clear existing

  await prisma.product.create({
    data: {
      name: "Industrial Security Shutter",
      price: "₹2500 / sq.ft",
      category: "Shutters",
      description: "Heavy-duty industrial security shutter made of premium galvanized steel. Designed for maximum protection and durability.",
      features: JSON.stringify(["Galvanized Steel", "Automated Motor", "Rust Proof"]),
      media: JSON.stringify(["/projects/project1/1.webp", "/projects/project1/2.webp"]),
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  });

  await prisma.product.create({
    data: {
      name: "Modern Home Steel Gate",
      price: "₹1800 / sq.ft",
      category: "Gates",
      description: "Elegant, modern steel main gate for residential homes. Features laser-cut designs and a premium powder-coated finish.",
      features: JSON.stringify(["Laser Cut Design", "Powder Coated", "Custom Dimensions"]),
      media: JSON.stringify(["/projects/project1/3.webp", "/projects/project1/4.webp"])
    }
  });

  await prisma.product.create({
    data: {
      name: "Stainless Steel Railing",
      price: "₹950 / sq.ft",
      category: "Railings",
      description: "High-grade 304 stainless steel balcony and staircase railing with toughened glass panels.",
      features: JSON.stringify(["304 Grade SS", "Toughened Glass", "Mirror Finish"]),
      media: JSON.stringify(["/projects/project1/5.webp", "/projects/project1/6.webp"])
    }
  });

  console.log("Database seeded successfully with dummy products!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
