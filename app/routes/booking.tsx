import { useState } from "react";
import { ServicesList } from "../components/services/services-list";
import { DateTimePicker } from "../components/booking/date-time-picker";
import { SignIn } from "../components/auth/sign-in";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useUser } from "@clerk/react-router";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import type { Service } from "../lib/types";
import { useAppToast } from "../lib/toast";
import { PaymentForm } from "../components/payment/payment-form";
import { useNavigate } from "react-router-dom";
import { StripeProvider } from "../components/providers/stripe-provider";

type BookingStep = 'service' | 'datetime' | 'auth' | 'payment' | 'confirmation';

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState<BookingStep>('service');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentId, setAppointmentId] = useState<Id<"appointments"> | null>(null);

  const { isSignedIn, user } = useUser();
  const services = useQuery(api.services.list) ?? [];
  const createAppointment = useMutation(api.appointments.create);
  const { showSuccess, showError } = useAppToast();

  // Type assertion for services
  const typedServices = services as Array<Service & { _id: Id<"services"> }>;
  const navigate = useNavigate();

  const handleServiceSelect = (serviceId: Id<"services">) => {
    const service = services.find((s: Service & { _id: Id<"services"> }) => s._id === serviceId);
    if (service) {
      setSelectedService(service);
      setCurrentStep('datetime');
    }
  };

  const handleDateTimeSelect = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    if (isSignedIn) {
      handleConfirm();
    } else {
      setCurrentStep('auth');
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'datetime':
        setCurrentStep('service');
        break;
      case 'confirmation':
        setCurrentStep('datetime');
        break;
      case 'payment':
        setCurrentStep('datetime');
        break;
    }
  };

  const handleConfirm = async () => {
    if (!user?.id || !selectedService || !selectedDate || !selectedTime) return;

    try {
      const appointmentId = await createAppointment({
        serviceId: selectedService._id,
        providerId: selectedService.providerId as Id<"users">,
        customerId: user.id as Id<"users">,
        date: selectedDate?.toISOString().split('T')[0] ?? '',
        time: selectedTime,
        status: "pending",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      setAppointmentId(appointmentId);
      setCurrentStep("payment");
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert(
        `Error creating appointment: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {currentStep !== 'service' && (
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}

        <h1 className="text-3xl font-bold text-center mb-8">Book Your Service</h1>

        {currentStep === 'service' && (
          <ServicesList 
            services={typedServices}
            onServiceSelect={handleServiceSelect} 
          />
        )}

        {currentStep === 'datetime' && selectedService && (
          <DateTimePicker
            onSelect={handleDateTimeSelect}
            serviceDuration={selectedService.duration}
          />
        )}

        {currentStep === 'auth' && (
          <SignIn />
        )}

        {currentStep === 'payment' && appointmentId && selectedService && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Payment</h2>
            <div className="space-y-4">
              <p>
                <strong>Date:</strong> {selectedDate?.toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {selectedTime ?? ''}
              </p>
              <p>
                <strong>Service:</strong> {selectedService.name}
              </p>
              <p>
                <strong>Price:</strong> ${selectedService.price.toFixed(2)}
              </p>
            </div>
            <StripeProvider>
              <PaymentForm
                appointmentId={appointmentId}
                serviceId={selectedService._id}
                amount={selectedService.price}
                onSuccess={() => setCurrentStep("confirmation")}
                onError={(error) => alert(error)}
              />
            </StripeProvider>
          </div>
        )}
      </div>
    </div>
  );
}
