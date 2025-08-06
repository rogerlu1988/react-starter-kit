import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import type { Service } from "../../lib/types";
import type { Id } from "../../../convex/_generated/dataModel";

type ServiceCardProps = {
  service: Service & { _id: Id<"services"> };
  onSelect: (serviceId: Id<"services">) => void;
};

export function ServiceCard({ service, onSelect }: ServiceCardProps) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{service.name}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {service.duration} mins • ${service.price}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{service.description}</p>
        <Button 
          onClick={() => onSelect(service._id)} 
          className="w-full bg-primary text-white hover:bg-primary/90 mt-4"
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
}
