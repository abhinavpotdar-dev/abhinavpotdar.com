import prisma from "./prisma.js";

try {
  await prisma.$connect();

  console.log("Database connected successfully!");

  const result = await prisma.project.count();

  console.log("Total projects in database:", result);
} catch (error) {
  console.error("Database connection failed:", error);
} finally {
  await prisma.$disconnect();
}
