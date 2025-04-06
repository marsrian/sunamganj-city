import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { loginUser } from "@/app/actions/auth/loginUser";
import { signIn, jwt } from "next-auth/react";
import dbConnect, { collectionNameObj } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("credentials", credentials);
        // Add logic here to look up the user from the credentials supplied
        const user = await loginUser(credentials);
        console.log("user", user);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account) {
        const { providerAccountId, provider } = account;
        const { email: user_email, image, name } = user;

        const userCollection = dbConnect(collectionNameObj.usersCollection);

        const isExist = await userCollection.findOne({ email: user_email });

        if (!isExist) {
          const payload = {
            providerAccountId,
            provider,
            email: user_email,
            image,
            name,
            role: "user",
          };
          await userCollection.insertOne(payload);
        } else {
          // If user exists, update their role in the token/session
          user.role = isExist.role;
          user.name = isExist.name;
          user.image = isExist.image;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      const userCollection = await dbConnect(collectionNameObj.usersCollection);
      const dbUser = await userCollection.findOne({ email: token.email });
      if (user) {
        token.role = user.role;
      }
      if (dbUser) {
        token.name = dbUser.name;
        token.image = dbUser.image;
        token.role = dbUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.name = token.name; // ✅ add this
      session.user.image = token.image; // ✅ add this
      session.user.email = token.email; // optional
      return session;
    },
  },
};
