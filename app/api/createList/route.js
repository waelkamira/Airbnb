import mongoose from 'mongoose';
import { List } from '../models/ListModel';
export async function POST(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_Mongodb_url);
  const data = await req.json();
  console.log(data);
  const createNewList = await List.create({ ...data });

  return Response.json(createNewList);
}

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_Mongodb_url);
  const lists = await List.find();
  return Response.json(lists);
}
