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
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken
      return session
    },
    async signIn({ user, account, profile, email, credentials }) {
      // Solo permitir emails específicos del criadero
      const allowedEmails = [
        'admin@thecandyhouse.com',
        'info@thecandyhouse.com',
        // Agregar emails autorizados aquí
      ];
      
      // Para desarrollo, permitir cualquier email de Gmail
      if (process.env.NODE_ENV === 'development') {
        return true;
      }
      
      return allowedEmails.includes(user.email);
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/auth-error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
