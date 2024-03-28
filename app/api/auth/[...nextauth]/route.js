import NextAuth from 'next-auth';
import clientPromise from '../../../../lib/mongodb';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import mongoose from 'mongoose';
import { User } from '../../models/UsersModel';
import bcrypt from 'bcrypt';
const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: { label: 'your name', type: 'text', placeholder: 'Your Name' },
        email: { label: 'your email', type: 'text', placeholder: 'Your Email' },
        password: {
          label: 'your password',
          type: 'text',
          placeholder: 'Your password',
        },
      },
      async authorize(credentials) {
        await mongoose.connect(process.env.NEXT_PUBLIC_Mongodb_url);
        const { email, password } = credentials;
        console.log(email, password);

        // first search for an email if it is exist in database or not
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('this email does not exist');
        }

        // two match the password with the one that exist in database
        const isPasswordMatch = await bcrypt.compare(password, user?.password);
        if (!isPasswordMatch) {
          throw new Error('the password is not correct');
        }

        if (user && isPasswordMatch) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  debug: process.env.NODE_ENV,
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
