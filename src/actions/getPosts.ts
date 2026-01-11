import { getUserSession } from "../helpers/getUserSession";

export async function getMyPosts() {
  const session = await getUserSession();

  console.log("session from getPOSTS", session);

  if (!session?.accessToken) throw new Error("No access token found");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/my-posts`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch posts");

  return res.json();
}
