import { connectToDb } from '@/lib/utils'
import { User } from '@/lib/models';
import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";

const login = async (credentials) => {
  try {
    connectToDb();
    const user = await User.findOne({ username: credentials.username });
    if(!user){
      throw new Error("Wrong credentials!")
    }

    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

    if(!isPasswordCorrect){
      throw new Error("Wrong credentials!")
    }

    return user

  } catch (error) {
    console.log(error)
    throw new Error("Failed to login!")
  }
}


const handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          connectToDb();
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user, account, profile, email, credentials)
      if (account?.provider === 'github') {
        connectToDb();
        try {
          const user = await User.findOne({ email: profile.email });
          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              img: profile.avatar_url,
            });
            await newUser.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
  }
})

export { handler as GET, handler as POST }