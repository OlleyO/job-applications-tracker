import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex min-h-svh w-full p-6 md:p-10">
      <div className="w-full max-w-sm">
        <h1>Profile</h1>
      </div>
    </div>
  );
}
