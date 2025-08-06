import { useUser } from "@clerk/clerk-react";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "@radix-ui/react-switch";
import { useState } from "react";
import type { Service } from "../../lib/types";
import { Id } from "../../convex/_generated/dataModel";

type ServiceFormData = Omit<Service, "_id" | "providerId">;

const defaultService: ServiceFormData = {
  name: "",
  description: "",
  duration: 60,
  price: 0,
  category: "",
  active: true,
};

export function ServicesManager() {
  const { user } = useUser();
  const services = useQuery(api.providers.getProviderServices, {
    providerId: user?.id as Id<"users">,
  }) ?? [];
  const createService = useMutation(api.services.create);
  const updateService = useMutation(api.services.update);
  const toggleService = useMutation(api.services.toggleActive);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ServiceFormData>(defaultService);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      active: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      await createService({
        ...formData,
        providerId: user.id as Id<"users">,
      });
      setFormData(defaultService);
      setIsEditing(false);
    } catch (error) {
      alert(
        `Error saving service: ${
          error instanceof Error ? error.message : "Unknown error"
        }\`
      );
    }
  };



  return (
    <div className="space-y-6">
      {/* Service List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <Card key={service._id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{service.name}</h3>
                  <p className="text-sm text-gray-500">{service.description}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm">
                      Duration: {service.duration} minutes
                    </p>
                    <p className="text-sm">Price: ${service.price}</p>
                    <p className="text-sm">Category: {service.category}</p>
                  </div>
                </div>
                <Switch
                  checked={service.active}
                  onCheckedChange={(checked) =>
                    toggleService({
                      serviceId: service._id,
                      active: checked,
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Service Form */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="15"
                  step="15"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="active">Active</Label>
            </div>

            <Button type="submit" className="w-full">
              {isEditing ? "Update Service" : "Add Service"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
