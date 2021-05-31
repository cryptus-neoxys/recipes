import User from "models/User";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
  ],

  database: process.env.MONGODB_URI,

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
      const fetcheduser = await User.findOne({ email: user.email });
      session["user"]["_id"] = fetcheduser["_id"];
      session["user"]["bookmarks"] = fetcheduser["bookmarks"];
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      return token;
    },
  },
});
