import mongoose from 'mongoose';
import { User } from '../models/UsersModel';
import bcrypt from 'bcrypt';

export async function POST(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_Mongodb_url);
  const { name, email, password } = await req.json();
  const findUser = await User.findOne({ email });

  if (findUser) {
    throw new Error();
  }
  // console.log(name, email, password);
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashPassword });
  return Response.json(user);
}
