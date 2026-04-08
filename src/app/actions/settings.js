'use server';

import { prisma } from '@/lib/prisma';
import { checkAuth } from './articles';
import { revalidatePath } from 'next/cache';

// Singleton approach for site settings
const SETTINGS_ID = 'singleton';

export async function getSiteSettings() {
  try {
    let settings = await prisma.siteSetting.findUnique({
      where: { id: SETTINGS_ID }
    });

    if (!settings) {
      settings = await prisma.siteSetting.create({
        data: { id: SETTINGS_ID }
      });
    }

    // Parse JSON strings to objects safely
    let parsedStats = { members: 250, events: 45, years: 9 };
    if (settings.statsNumbers) {
      try {
        parsedStats = typeof settings.statsNumbers === 'string' && settings.statsNumbers !== '[object Object]' 
          ? JSON.parse(settings.statsNumbers) 
          : settings.statsNumbers;
      } catch (e) {
        console.warn('Failed to parse statsNumbers, using defaults');
      }
    }

    return {
      ...settings,
      statsNumbers: parsedStats,
    };
  } catch (error) {
    console.error('Get settings error:', error);
    return { 
      heroTitle: 'Mon Buddhist Students Society',
      heroDescription: 'Academic student organization at Mahachulalongkornrajavidyalaya University.',
      statsNumbers: { members: 250, events: 45, years: 9 }
    };
  }
}

export async function updateSiteSettings(data) {
  try {
    const user = await checkAuth(['ADMIN']); // Only ADMIN can change site settings

    const heroTitle = data.heroTitle;
    const heroDescription = data.heroDescription;
    const heroImage = data.heroImage;
    
    let statsNumbersVal = data.statsNumbers;
    if (typeof statsNumbersVal === 'object') {
       statsNumbersVal = JSON.stringify(statsNumbersVal);
    }
    
    // Fallbacks if not provided
    if (!statsNumbersVal) {
      statsNumbersVal = JSON.stringify({ members: 250, events: 45, years: 9 });
    }

    const { aboutHistory, aboutMission, aboutVision, aboutAdvisors, aboutCommittee, welcomeTitle, welcomeText, welcomeImage } = data;

    await prisma.siteSetting.upsert({
      where: { id: SETTINGS_ID },
      update: {
        heroTitle,
        heroDescription,
        heroImage,
        statsNumbers: statsNumbersVal,
        aboutHistory,
        aboutMission,
        aboutVision,
        aboutAdvisors,
        aboutCommittee,
        welcomeTitle,
        welcomeText,
        welcomeImage,
      },
      create: {
        id: SETTINGS_ID,
        heroTitle: heroTitle || 'Mon Buddhist Students Society',
        heroDescription: heroDescription || 'Welcome to MBSS',
        heroImage,
        statsNumbers: statsNumbersVal,
        aboutHistory,
        aboutMission,
        aboutVision,
        aboutAdvisors,
        aboutCommittee,
        welcomeTitle,
        welcomeText,
        welcomeImage,
      }
    });

    revalidatePath('/');
    revalidatePath('/about');
    return { success: true };
  } catch (error) {
    console.error('CRITICAL SETTINGS ERROR:', error.message);
    console.error('FULL TRACE:', error);
    return { success: false, error: error.message };
  }
}
