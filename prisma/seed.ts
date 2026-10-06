import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  console.log("Cleaning existing data...");
  await prisma.user.deleteMany();
  console.log("Users deleted");
  await prisma.tenant.deleteMany();
  console.log("Tenants deleted");

  console.log("Creating tenants...");
  const tenant1 = await prisma.tenant.create({
    data: { name: "Tech Solutions Inc." },
  });

  const tenant2 = await prisma.tenant.create({
    data: { name: "Marketing Pro LLC" },
  });

  const tenant3 = await prisma.tenant.create({
    data: { name: "Consulting Experts Group" },
  });

  const hashedPassword = await bcrypt.hash("123456", 10);
  await prisma.user.create({
    data: {
      email: "admin@techsolutions.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
      tenantId: tenant1.id,
    },
  });

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

