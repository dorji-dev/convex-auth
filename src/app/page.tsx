"use client";

import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
  const { signIn } = useAuthActions();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-[10px]">
      <p>Reset password</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await signIn("password", {
            flow: "reset",
            email: formData.get("email") as string,
          });
        }}
        className="flex flex-col space-y-[10px]"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="p-[5px]"
        />
        <button type="submit">Send reset link</button>
      </form>
    </main>
  );
}
