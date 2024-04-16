import mongoose from 'mongoose';
import { List } from '../models/ListModel';
import { authOptions } from '../authOptions/route';
import { getServerSession } from 'next-auth';

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_Mongodb_url);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const lists = await List.find({ email });
  return Response.json(lists);
}
export async function PUT(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_Mongodb_url);
  const { _id, ...otherProps } = await req.json();
  const updateList = await List.findByIdAndUpdate(_id, otherProps);
  return Response.json(updateList);
}
export async function DELETE(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_Mongodb_url);
  const { _id } = await req.json();
  const updateList = await List.findByIdAndDelete({ _id });

  return Response.json('Deleted');
}
