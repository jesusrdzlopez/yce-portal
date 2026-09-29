import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    rol?: "JOVEN" | "ASESOR" | "NACIONAL";
    distritoId?: string | null;
  }

  interface Session {
    user: {
      id: string;
      rol: "JOVEN" | "ASESOR" | "NACIONAL";
      distritoId: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    rol: "JOVEN" | "ASESOR" | "NACIONAL";
    distritoId: string | null;
  }
}
