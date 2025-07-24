import { SignUp, useAuth } from "@clerk/react-router";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { useNavigate } from "react-router";
import { api } from "../../convex/_generated/api";

export default function SignUpPage() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const upsertUser = useMutation(api.users.upsertUser);

  useEffect(() => {
    if (isSignedIn) {
      upsertUser()
        .then(() => {
          // Redirect to success page after successful signup and DB sync
          navigate("/waitlist-success");
        })
        .catch(console.error);
    }
  }, [isSignedIn, upsertUser, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <SignUp 
        forceRedirectUrl="/waitlist-success"
        signInUrl="/sign-in"
      />
    </div>
  );
}
