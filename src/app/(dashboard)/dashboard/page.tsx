import DashboardClient from "@/components/custom/dashboard/DashboardClient";
import { getProfiles } from "@/lib/getPosts";

export default async function DashboardPage() {

  const profiles = await getProfiles();

  return (
    <>
      <DashboardClient initialProfiles={profiles} />
    </>
  )
}