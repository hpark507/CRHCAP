const backendUrl = 'https://crvmb5tnnr.us-east-1.awsapprunner.com/crhcap';
import { User, type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserData } from "@/utils/api";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter username",
        },
        emplid: { label: "EMPLID", type: "text", placeholder: "Enter EMPLID" },
        surname: { label: "Surname", type: "text", placeholder: "Enter Surname" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {

        // Validate credentials with your database here

        // Find in users json:
        if (!credentials?.username || !credentials?.password) {
          console.log("==== No Credentials ====")
          return null;
        }

        return {
          id: '72f56ca7-03fc-40db-adfc-b5d22b35ab71',
          name: credentials.username,
          email: credentials.password,
          image: ''
        };

      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.AUTH_SECRET!,
};
