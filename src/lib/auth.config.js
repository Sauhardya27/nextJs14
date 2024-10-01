import { connectToDb } from '@/lib/utils';
import { User } from '@/lib/models';
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";

const login = async (credentials) => {
  try {
    await connectToDb();
    const user = await User.findOne({ $or: [{ username: credentials.username }, { email: credentials.username }] });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid password");
    }
    return user;
  } catch (error) {
    console.error("Login error:", error.message);
    throw new Error("Authentication failed");
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
        username: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          console.error("Authorization error:", error.message);
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
        token.email = user.email;
        token.isAdmin = user.isAdmin || false;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'github') {
        try {
          await connectToDb();
          let dbUser = await User.findOne({ email: profile.email });
          if (!dbUser) {
            dbUser = new User({
              username: profile.login,
              email: profile.email,
              img: profile.avatar_url,
              isAdmin: false,
              password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10), // Generate a random password
            });
            await dbUser.save();
          }
          return true;
        } catch (error) {
          console.error("GitHub sign-in error:", error.message);
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