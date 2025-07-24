import { SignIn, useAuth } from "@clerk/react-router";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function SignInPage() {
  const { isSignedIn } = useAuth();
  const upsertUser = useMutation(api.users.upsertUser);

  useEffect(() => {
    if (isSignedIn) {
      upsertUser().catch(console.error);
    }
  }, [isSignedIn, upsertUser]);

  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
}
