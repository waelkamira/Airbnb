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
  console.log('email', email);
  console.log('reservations', reservations);
  return Response.json(reservations);
}
