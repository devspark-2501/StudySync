import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db';
import Task from '@/models/Task';
import User from '@/models/User';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    const tasks = await Task.find({ userId: user._id }).sort({ createdAt: 1 });

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { title, timeSlot, category } = await req.json();
    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    const newTask = await Task.create({
      userId: user._id,
      title,
      timeSlot: timeSlot || 'Anytime',
      category: category || 'General',
    });

    return NextResponse.json({ task: newTask }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { taskId, date, status } = await req.json();
    await connectDB();

    const task = await Task.findById(taskId);
    if (!task) return NextResponse.json({ message: 'Task not found' }, { status: 404 });

    const existingLogIndex = task.logs.findIndex((l) => l.date === date);
    if (existingLogIndex > -1) {
      task.logs[existingLogIndex].status = status;
    } else {
      task.logs.push({ date, status });
    }

    await task.save();
    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}