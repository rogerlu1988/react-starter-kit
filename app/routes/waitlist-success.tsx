import { CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export default function WaitlistSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            You're on the list!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thanks for joining our waitlist. We'll send you an update when BetOnYou goes live.
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-orange-800">
              <strong>What's next?</strong> We're putting the finishing touches on BetOnYou. 
              You'll be among the first to know when we launch!
            </p>
          </div>
        </div>
        
        <Button asChild variant="outline" className="gap-2">
          <Link to="/">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}