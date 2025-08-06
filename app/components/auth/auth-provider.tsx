import { ClerkProvider } from "@clerk/react-router";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
}
