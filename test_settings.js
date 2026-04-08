const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testSubmit() {
  try {
    const dataToSave = {
      heroTitle: 'Test Title Here',
      heroDescription: 'Test Description',
      welcomeTitle: 'Test Welcome',
      welcomeText: 'Hello World testing',
      welcomeImage: '/uploads/none.png',
      aboutHistory: 'Test',
      aboutMission: 'Test',
      aboutVision: 'Test',
      statsNumbers: JSON.stringify({members: 5, events: 5, years: 5})
    };
    
    const result = await prisma.siteSetting.upsert({
      where: { id: 'singleton' },
      update: dataToSave,
      create: { id: 'singleton', ...dataToSave }
    });
    console.log('Success:', result);
  } catch(e) {
    console.error('Error:', e);
  }
}

testSubmit();
