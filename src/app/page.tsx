import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  if (!session) redirect("/login");

  switch (session.user.rol) {
    case "JOVEN":
      redirect("/joven");
    case "ASESOR":
      redirect("/asesor");
    case "NACIONAL":
      redirect("/nacional");
    default:
      redirect("/login");
  }
}
