import { useUser } from "@clerk/react-router";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import type { Appointment } from "../../lib/types";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { CancelAppointment } from "../appointments/cancel-appointment";
import { useAppToast } from '../../lib/toast';

export function AppointmentsList() {
  const { user } = useUser();
  const { showSuccess, showError } = useAppToast();
  const appointments = useQuery(api.providers.getProviderAppointments, {
    providerId: user?.id as Id<"users">,
  }) as Array<Appointment & { service: any; customer: any }> ?? [];

  if (!appointments || appointments.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">No appointments found</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
      case "pending_payment":
        return "bg-yellow-100 text-yellow-800";
      case "payment_failed":
        return "bg-red-100 text-red-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {appointments.map((appointment: any) => (
        <Card key={appointment._id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">
                  {appointment.service?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {appointment.customer?.name || appointment.customer?.email}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(appointment.date), "PPP")} at{" "}
                  {appointment.time}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className={getStatusColor(appointment.status)}>
                  {appointment.status}
                </Badge>
                {appointment.status === "confirmed" && (
                  <CancelAppointment
                    appointmentId={appointment._id}
                    serviceName={appointment.service?.name || "Unknown Service"}
                    date={format(new Date(appointment.date), "PPP")}
                    time={appointment.time}
                    onSuccess={() => {
                      showSuccess("Your appointment has been cancelled and a refund has been initiated.");
                    }}
                    onError={(error) => {
                      showError(error);
                    }}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
