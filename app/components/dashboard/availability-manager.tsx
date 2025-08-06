import { useUser } from "@clerk/react-router";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";

const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

type TimeSlot = {
  start: string;
  end: string;
};

type Availability = {
  [K in typeof DAYS_OF_WEEK[number]]?: TimeSlot;
};

export function AvailabilityManager() {
  const { user } = useUser();
  const provider = useQuery(api.providers.getProviderByUserId, {
    userId: user?.id as Id<"users">,
  });
  const updateAvailability = useMutation(api.providers.updateAvailability);

  const [availability, setAvailability] = useState<Availability>(
    provider?.availability || {}
  );

  const handleTimeChange = (
    day: typeof DAYS_OF_WEEK[number],
    field: keyof TimeSlot,
    value: string
  ) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      await updateAvailability({
        providerId: user.id as Id<"users">,
        availability,
      });
      alert("Availability updated successfully!");
    } catch (error) {
      alert(
        `Error updating availability: ${
          error instanceof Error ? error.message : "Unknown error"
        }\`
      );
    }
  };

  return (
    <div className="space-y-6">
      {DAYS_OF_WEEK.map((day) => (
        <Card key={day}>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="w-32">
                <h3 className="font-semibold capitalize">{day}</h3>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <Label htmlFor={\`\${day}-start\`}>Start Time</Label>
                  <Input
                    id={\`\${day}-start\`}
                    type="time"
                    value={availability[day]?.start || ""}
                    onChange={(e) =>
                      handleTimeChange(day, "start", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={\`\${day}-end\`}>End Time</Label>
                  <Input
                    id={\`\${day}-end\`}
                    type="time"
                    value={availability[day]?.end || ""}
                    onChange={(e) => handleTimeChange(day, "end", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleSave} className="w-full">
        Save Availability
      </Button>
    </div>
  );
}
