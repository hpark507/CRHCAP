import { User, type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUsers, getUserData } from "@/utils/api";

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

        // console.log("==== Credentials ====")
        // console.log(credentials)

        // Find in users json:
        // const user = users.find((u: { name: string | undefined; }) => u.name === credentials?.username.toLocaleLowerCase());
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const userData = await getUserData(credentials.password);
        if (!userData) {
          return null;
        }
        if (userData.surname !== credentials.username) {
          return null;
        }
        // return userData
        return {
          id: userData.id, // Add the required 'id' property
          name: userData.surname,
          email: userData.emplid,
          image: userData.image,
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
