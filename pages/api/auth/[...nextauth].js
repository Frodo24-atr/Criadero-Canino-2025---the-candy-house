import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      // Agregar información del usuario para comentarios
      session.user.canComment = true
      return session
    },
    async signIn({ user, account, profile, email, credentials }) {
      // Para comentarios públicos, permitir cualquier cuenta de Google
      if (account?.provider === 'google') {
        return true; // Permitir cualquier usuario de Google para comentar
      }
      return false;
    },
  },
  pages: {
    signIn: '/auth/signin', // Página separada para usuarios regulares
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
