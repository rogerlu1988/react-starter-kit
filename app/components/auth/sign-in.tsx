import { SignIn as ClerkSignIn } from "@clerk/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function SignIn() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In to Book Your Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        <ClerkSignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "shadow-none p-0",
              footer: "hidden"
            }
          }}
        />
      </CardContent>
    </Card>
  );
}
