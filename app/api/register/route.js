import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    
    return NextResponse.json({ message: 'User registered successfully', userId: newUser._id }, { status: 201 });
  } catch (error) {
    console.error('Registration Error Details:', error); // <--- This will print the exact issue in VS Code terminal
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}