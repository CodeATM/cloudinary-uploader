import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider  from "next-auth/providers/credentials";
import { SignInUsingCredentials, getUserbyEmail, signInwithOauth } from "@/utils/helpers/authHelpers";


export const nextAuthOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: 'email', required: true},
                password: {label: "Password", type: 'password', required: true},
            },
            async authorize(credentials){
                if (!credentials?.email || !credentials.password) {
                    return null
                }

                const user = await SignInUsingCredentials({email: credentials?.email, password: credentials?.password})

                console.log(user)
                return user 
            }
        })
    ],
    callbacks: {
        async signIn({account, profile}) {
            console.log({account, profile})

            if (account?.type === 'oauth' && profile) {
                return await signInwithOauth({account, profile})
            }

            return true
        },
        async jwt({token, trigger, session}) {
            console.log({token})
            console.log({trigger, session})
            if(trigger === 'update') {
                token.name = session.name
            } else {
                if(token.email) {
                    const user = await getUserbyEmail({email: token.email})
                    console.log({user})

                    token.name = user.name
                    token._id = user._id
                    token.provider = user.provider
                }
            }
            return token
        },
        async session({session, token}){
            console.log({session, token})

            return {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                    _id: token._id,
                    provider: token.provider
                }
            }
        }
    }
}