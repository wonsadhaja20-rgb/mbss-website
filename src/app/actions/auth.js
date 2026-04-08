'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function registerUser(formData) {
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!name || !email || !password) {
      return { success: false, error: 'All fields are required.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user with MEMBER role
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // Role defaults to MEMBER as per the Prisma schema
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Registration Error:', error);
    return { success: false, error: 'Internal server error during registration.' };
  }
}
