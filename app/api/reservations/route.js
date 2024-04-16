import { mongoose } from 'mongoose';
import { Reservation } from '../models/Reservations';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_Mongodb_url);
  const data = await req.json();
  const reservation = await Reservation.create({ ...data });
  return Response.json(reservation);
}
export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_Mongodb_url);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const reservations = await Reservation.find({ email });

  return Response.json(reservations);
}

export async function DELETE(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_Mongodb_url);
  const { _id } = await req.json();
  const updateList = await Reservation.findByIdAndDelete({ _id });

  return Response.json('Deleted');
}
