import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    Providers.Google({
      clientId:
        "818079525310-cn3jl2f3a5t4b5sh9hgbom4lo6ie6sl9.apps.googleusercontent.com",
      clientSecret: "qxuh2vYHNKgzlpMWnqqPMPQm",
    }),
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
  ],

  callbacks: {
    async signIn(user, account, profile) {
      console.log({ user });
      console.log({ account });
      console.log({ profile });
      return true;
    },
    async redirect(url, baseUrl) {
      return baseUrl;
    },
    async session(session, user) {
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      return token;
    },
  },
});
