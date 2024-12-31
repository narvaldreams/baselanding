import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function checkDatabaseConnection() {
  try {
    // Ejecuta una consulta simple
    await prisma.$connect();
    console.log('Database connection successful');
    return { ok: true, message: 'Database connection successful' };
  } catch (error) {
    console.error('Database connection failed', error);
    return { ok: false, message: 'Database connection failed', error };
  } finally {
    await prisma.$disconnect(); // Cierra la conexión tras la prueba
  }
}
