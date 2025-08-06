import { useUser } from "@clerk/react-router";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Navigate } from "react-router-dom";

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();

  // Redirect if not signed in
  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  // TODO: Add provider role check and redirect if not a provider

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Provider Dashboard</h1>

      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Add appointments list */}
              <p>No appointments found.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>My Services</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Add services management */}
              <p>No services found.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>Manage Availability</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Add availability management */}
              <p>Set your working hours for each day.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
