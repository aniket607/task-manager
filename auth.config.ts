import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new AuthError("Please enter your email and password")
          }

          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email as string))

          if (!user) {
            throw new AuthError("No user found with this email")
          }

          const passwordsMatch = await bcrypt.compare(
            credentials.password as string,
            user.password as string
          )

          if (!passwordsMatch) {
            throw new AuthError("Invalid password")
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          if (error instanceof AuthError) throw error
          throw new AuthError("An error occurred. Please try again.")
        }
      }
    })
  ],
} satisfies NextAuthConfig 