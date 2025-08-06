import { ConvexReactClient } from "convex/react";

export const convex = new ConvexReactClient(process.env.CONVEX_URL || "http://localhost:8000");
