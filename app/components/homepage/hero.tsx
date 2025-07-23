import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Navbar } from "./navbar";

export default function Hero({
  loaderData,
}: {
  loaderData?: { isSignedIn: boolean };
}) {
  const [email, setEmail] = useState("");

  return (
    <section id="hero" className="bg-gradient-to-b from-orange-50 to-white">
      <Navbar loaderData={loaderData} />
      <div className="container mx-auto px-6 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Put your money where your{" "}
            <span className="text-orange-500">goals are</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join the waitlist for the app that rewards your discipline—or donates 
            your money if you don't.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4 max-w-md mx-auto">
            <Button 
              asChild
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 h-12 rounded-md font-semibold"
            >
              <Link to="/sign-up">
                Join Waitlist
              </Link>
            </Button>
          </div>

          <p className="text-sm text-gray-500 mb-16">
            Be the first to know when we launch. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  );
}