import mongoose from 'mongoose';
import { List } from '../models/ListModel';
export async function POST(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_Mongodb_url);
  const data = await req.json();
  const createNewList = await List.create({ ...data });

  return Response.json(createNewList);
}

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_Mongodb_url);
  const lists = await List.find();
  return Response.json(lists);
}

export async function PUT(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_Mongodb_url);
  const { _id, ...data } = await req.json();
  const updateList = await List.findByIdAndUpdate({ _id }, { ...data });
  return Response.json(updateList);
}
