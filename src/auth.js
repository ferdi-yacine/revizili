import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth(
    {
        providers: [
            Credentials({
                name: "Credentials",
                credentials: {
                    email: { label: "Email", type: "email" },
                    password: { label: "Password", type: "password" },
                },

                authorize: async (credentials) => {
                    const email = credentials.email;
                    const password = credentials.password;

                    console.log(credentials)

                    if (!email || !password) {
                        throw new Error("Please provide both email & password!");
                    }

                    await connectDB();

                    const user = await User.findOne({ email }).select("+password +role");

                    if (!user || !user.password) {
                        throw new Error("Invalid email or password!");
                    }

                    const isMatched = await compare(password, user.password);

                    if (!isMatched) {
                        throw new Error("Wrong credentials!");
                    }

                    const userData = {
                        id: user._id.toString(),
                        email: user.email,
                        role: user.role,
                    };
                    return userData;
                },
            }),
        ],

        pages: {
            signIn: "/login",
        },
        session: {
            strategy: "jwt",
            maxAge: 24 * 60 * 60,
            updateAge: 60 * 60,
        },
        jwt: {
            secret: process.env.AUTH_SECRET,
            maxAge: 24 * 60 * 60,
        },
        callbacks: {
            async session({ session, token }) {

                if (token?.sub) {
                    session.user.id = token.sub;
                    session.user.email = token.emai;;
                    session.user.role = token.role;
                }
                return session;
            },

            async jwt({ token, user }) {
                if (user) {
                    token.sub = user.id;
                    token.email = user.email;
                    token.role = user.role;
                }
                return token;
            },
        },
    }
)