import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return !!token;
    },
  },
  pages: {
    signIn: "/login",
  },
});

// Protect these routes
export const config = {
  matcher: ["/dashboard/:path*", "/my-blogs/:path*"],
};
