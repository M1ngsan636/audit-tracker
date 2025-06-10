// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"; // Ganti sesuai kebutuhan

const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  // Optional: kamu bisa pakai adapter, callbacks, dll
});

export { handler as GET, handler as POST };
