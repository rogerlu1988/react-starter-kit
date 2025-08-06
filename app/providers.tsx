import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Toaster } from "./components/ui/toaster";
import { convex } from "../convex/client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.CLERK_PUBLISHABLE_KEY || ""}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
        <Toaster />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
