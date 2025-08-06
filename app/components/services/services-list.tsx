import { useState } from "react";
import type { Service } from "../../lib/types";
import type { Id } from "../../../convex/_generated/dataModel";
import { ServiceCard } from "./service-card";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type ServicesListProps = {
  services: (Service & { _id: Id<"services"> })[];
  onServiceSelect: (serviceId: Id<"services">) => void;
};

export function ServicesList({ services, onServiceSelect }: ServicesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const categories = Array.from(new Set(services.map(s => s.category)));

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue={categories[0]} className="w-full">
        <TabsList className="w-full flex-wrap">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="flex-1">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredServices
                .filter(service => service.category === category)
                .map((service) => (
                  <ServiceCard
                    key={service._id}
                    service={service}
                    onSelect={onServiceSelect}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
