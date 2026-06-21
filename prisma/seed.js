const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Seed AboutContent
  await prisma.aboutContent.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      mainDescription: 'Izhan Engineering Works is a trusted name in industrial and residential fabrication. With years of experience, we deliver high-quality, durable, and precisely engineered metal solutions.',
      stats: JSON.stringify([
        { icon: 'Building2', number: '500+', label: 'Projects Completed', description: 'Across various industrial sectors' },
        { icon: 'Users2', number: '50+', label: 'Cities Served', description: 'Expanding our reach nationwide' },
        { icon: 'Award', number: '15+', label: 'Years Experience', description: 'In precision metal fabrication' }
      ]),
      features: JSON.stringify([
        { title: 'Quality Assurance', description: 'Rigorous testing and inspection at every stage of fabrication.' },
        { title: 'Custom Solutions', description: 'Tailored designs to meet your specific architectural requirements.' }
      ])
    }
  })

  // Seed ContactSettings
  await prisma.contactSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      email: 'sales@izhanengineering.com',
      phone1: '+91-9887260947',
      phone2: '',
      address: 'Jaipur, Rajasthan, India',
      whatsapp: '919887260947',
      instagram: 'https://instagram.com/',
      facebook: 'https://facebook.com/'
    }
  })

  // Seed Projects
  const projectsCount = await prisma.project.count();
  if (projectsCount === 0) {
    console.log('Seeding mock projects...');
    const mockProjects = [
      {
        title: "Industrial Metal Gates",
        location: "Jaipur, Rajasthan",
        type: "Commercial",
        description: "Heavy-duty industrial gates with automated systems for manufacturing facility",
        media: JSON.stringify(["/8a1b9ac5f5376d5a1e35f02c654a6763.png", "/13b67d5697f4c9226924058eae6f24e6.jpg", "/31d7b7fc9e18661ad31be10bb17126db.jpg"])
      },
      {
        title: "Residential Rolling Shutters",
        location: "Delhi, India",
        type: "Residential",
        description: "Custom rolling shutters with premium finishing for luxury homes",
        media: JSON.stringify(["/IMG-20250509-WA0017.jpg", "/97178d9a2cb9c30866cdd1f5c63a80ac.jpg", "/941005d759413b19ae7a434278ce2f01.jpg"])
      },
      {
        title: "Commercial Railings",
        location: "Mumbai, Maharashtra", 
        type: "Commercial",
        description: "Decorative and functional railings for corporate office complex",
        media: JSON.stringify(["/994733ef131b9cc1f0d4255bed83a8e8.jpg", "/IMG-20250509-WA0017.jpg", "/20171116_162231.jpg", "/IMG-20250509-WA0017.jpg"])
      },
      {
        title: "Factory Fabrication",
        location: "Ahmedabad, Gujarat",
        type: "Industrial", 
        description: "Large-scale structural fabrication for automotive manufacturing unit",
        media: JSON.stringify(["/6186731d8ac59e67da59f78184af9289.jpg", "/97178d9a2cb9c30866cdd1f5c63a80ac.jpg", "/IMG-20250509-WA0017.jpg"])
      },
      {
        title: "Custom Grills & Gates",
        location: "Surat, Gujarat",
        type: "Residential",
        description: "Artistic grills and entrance gates with intricate designs",
        media: JSON.stringify(["/8a1b9ac5f5376d5a1e35f02c654a6763.png", "/13b67d5697f4c9226924058eae6f24e6.jpg", "/31d7b7fc9e18661ad31be10bb17126db.jpg"])
      },
      {
        title: "Warehouse Structures", 
        location: "Pune, Maharashtra",
        type: "Industrial",
        description: "Complete warehouse structural work with loading bay solutions",
        media: JSON.stringify(["/994733ef131b9cc1f0d4255bed83a8e8.jpg", "/6186731d8ac59e67da59f78184af9289.jpg", "/20171116_162231.jpg", "/IMG-20250509-WA0017.jpg"])
      }
    ];

    for (const proj of mockProjects) {
      await prisma.project.create({
        data: proj
      });
    }
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
