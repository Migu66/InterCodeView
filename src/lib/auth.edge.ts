import NextAuth from "next-auth";
import { authEdgeConfig } from "./auth.edge.config";

// Versión ligera de auth para Edge Runtime (middleware)
export const { auth: authEdge } = NextAuth(authEdgeConfig);
