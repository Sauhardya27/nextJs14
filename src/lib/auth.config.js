import { connectToDb } from '@/lib/utils';
import { User } from '@/lib/models';
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";

const login = async (credentials) => {
  try {
    await connectToDb();
    const user = await User.findOne({ username: credentials.username });
    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new Error("Invalid username or password");
    }
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to login");
  }
};

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          return await login(credentials);
        } catch (error) {
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.username = user.username;
        token.isAdmin = user.isAdmin || false;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'github') {
        await connectToDb();
        try {
          let dbUser = await User.findOne({ email: profile.email });
          if (!dbUser) {
            dbUser = new User({
              username: profile.login,
              email: profile.email,
              img: profile.avatar_url,
              isAdmin: false,
            });
            await dbUser.save();
          }
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
};