import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import { ResponsiveSidebar } from "../../components/ResponsiveSidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return <ResponsiveSidebar>{children}</ResponsiveSidebar>;
}
