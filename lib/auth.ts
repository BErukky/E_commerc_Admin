import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const providers: NextAuthOptions["providers"] = [];

// Only add Google provider when credentials are configured
if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
  );
}

// Admin Credentials provider
providers.push(
  CredentialsProvider({
    name: "Admin Login",
    credentials: {
      username: { label: "Username", type: "text", placeholder: "Enter username" },
      password: { label: "Password", type: "password", placeholder: "Enter password" },
    },
    async authorize(credentials) {
      // Use environment variables for secure login, fallback to admin/admin ONLY in development
      const isDev = process.env.NODE_ENV === "development";
      const validUsername = process.env.ADMIN_USERNAME || (isDev ? "admin" : null);
      const validPassword = process.env.ADMIN_PASSWORD || (isDev ? "admin" : null);

      if (
        validUsername && validPassword &&
        credentials?.username === validUsername &&
        credentials?.password === validPassword
      ) {
        return { id: "1", name: "Administrator", email: "admin@store.com" };
      }
      return null;
    },
  })
);

export const authOptions: NextAuthOptions = {
  providers,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
